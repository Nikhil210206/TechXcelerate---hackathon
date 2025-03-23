from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict
import google.generativeai as genai
import PyPDF2
import json
import re
from datetime import datetime

app = FastAPI()

# Configure Gemini API
genai.configure(api_key="AIzaSyDxF7VPex-rUHaSGRa9KdRnj0NqxWH9oCo")
model = genai.GenerativeModel('gemini-2.0-flash')

class CandidateProfile(BaseModel):
    skills: List[str]
    projects: List[str]
    education: List[str]
    experience: List[str]

class Answer(BaseModel):
    question_id: int
    answer: str
    type: str  # 'technical' or 'coding'

class Assessment(BaseModel):
    technical_questions: List[Dict]
    coding_challenges: List[Dict]
    candidate_profile: CandidateProfile

# Add this new class for the report request
class ReportRequest(BaseModel):
    answers: List[Answer]
    profile: CandidateProfile

class DetailedReport(BaseModel):
    candidate_info: Dict
    assessment_summary: Dict
    skill_analysis: Dict
    recommendations: List[str]
    certification_status: str

@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    try:
        # Read PDF content
        pdf_reader = PyPDF2.PdfReader(file.file)
        resume_text = ""
        for page in pdf_reader.pages:
            resume_text += page.extract_text()

        # Create structured prompt for Gemini
        prompt = """
        Parse the following resume and return information in this exact format:
        {
            "skills": ["skill1", "skill2", ...],
            "projects": ["project1", "project2", ...],
            "education": ["education1", "education2", ...],
            "experience": ["experience1", "experience2", ...]
        }

        Resume text:
        """ + resume_text

        # Get response from Gemini
        response = model.generate_content(prompt)
        response_text = response.text

        # Extract JSON from response
        # Find the JSON pattern using regex
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if not json_match:
            raise ValueError("No JSON found in response")
        
        json_str = json_match.group()
        
        # Parse JSON and validate structure
        parsed_data = json.loads(json_str)
        
        # Ensure all required fields are present
        required_fields = ['skills', 'projects', 'education', 'experience']
        for field in required_fields:
            if field not in parsed_data:
                parsed_data[field] = []

        # Create CandidateProfile instance
        profile = CandidateProfile(
            skills=parsed_data['skills'],
            projects=parsed_data['projects'],
            education=parsed_data['education'],
            experience=parsed_data['experience']
        )

        return profile

    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse Gemini response: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing resume: {str(e)}"
        )

@app.post("/generate-assessment")
async def generate_assessment(profile: CandidateProfile):
    try:
        # Generate technical questions
        technical_questions = []
        for i in range(5):
            prompt = f"Generate a technical question about {profile.skills[i % len(profile.skills)]}"
            response = model.generate_content(prompt)
            question = {
                "id": i + 1,
                "question": response.text,
                "skill": profile.skills[i % len(profile.skills)],
                "type": "technical"
            }
            technical_questions.append(question)

        # Generate coding challenges
        coding_challenges = []
        for i in range(3):
            prompt = f"Generate a coding challenge for {profile.skills[i % len(profile.skills)]}"
            response = model.generate_content(prompt)
            challenge = {
                "id": i + 11,
                "challenge": response.text,
                "skill": profile.skills[i % len(profile.skills)],
                "type": "coding"
            }
            coding_challenges.append(challenge)

        return Assessment(
            technical_questions=technical_questions,
            coding_challenges=coding_challenges,
            candidate_profile=profile
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluate-answer")
async def evaluate_answer(answer: Answer):
    try:
        if answer.type == "technical":
            prompt = """
            Evaluate this technical answer and provide response in exact JSON format:
            {
                "score": <number between 0-10>,
                "feedback": "<detailed feedback>"
            }
            
            Answer to evaluate: """ + answer.answer
        else:
            prompt = """
            Evaluate this code solution and provide response in exact JSON format:
            {
                "score": <number between 0-10>,
                "feedback": "<detailed feedback>"
            }
            Consider code quality, efficiency, and correctness.
            
            Code to evaluate: """ + answer.answer

        response = model.generate_content(prompt)
        response_text = response.text

        # Extract JSON from response using regex
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if not json_match:
            # Fallback response if JSON parsing fails
            return {
                "question_id": answer.question_id,
                "score": 5,  # Default score
                "feedback": response_text
            }
        
        json_str = json_match.group()
        evaluation = json.loads(json_str)

        return {
            "question_id": answer.question_id,
            "score": float(evaluation["score"]),
            "feedback": evaluation["feedback"]
        }

    except json.JSONDecodeError as e:
        # Handle JSON parsing errors gracefully
        return {
            "question_id": answer.question_id,
            "score": 5,  # Default score
            "feedback": f"Error parsing response: {response_text[:200]}..."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-report")
async def generate_report(request: ReportRequest):
    try:
        skill_scores = {}
        feedback = []
        detailed_feedback = []
        
        # Calculate scores per skill and collect detailed feedback
        for answer in request.answers:
            result = await evaluate_answer(answer)
            
            # Match skill to answer
            skill = None
            for s in request.profile.skills:
                if s.lower() in result["feedback"].lower():
                    skill = s
                    break
            
            if skill is None:
                skill = "general"
                
            if skill not in skill_scores:
                skill_scores[skill] = []
            
            skill_scores[skill].append(result["score"])
            feedback.append(result)
            
            # Add detailed feedback for each answer
            detailed_feedback.append({
                "question_id": answer.question_id,
                "type": answer.type,
                "answer": answer.answer,
                "score": result["score"],
                "feedback": result["feedback"],
                "skill": skill
            })

        # Calculate skill-wise statistics
        skill_analysis = {}
        for skill, scores in skill_scores.items():
            avg_score = sum(scores) / len(scores)
            skill_analysis[skill] = {
                "average_score": avg_score,
                "number_of_questions": len(scores),
                "highest_score": max(scores),
                "lowest_score": min(scores),
                "proficiency_level": get_proficiency_level(avg_score)
            }

        # Generate AI insights and recommendations
        insights = []
        recommendations = []
        for skill, analysis in skill_analysis.items():
            # Generate skill-specific insight
            insight_prompt = f"Generate a detailed insight for {skill} with score {analysis['average_score']}/10"
            insight_response = model.generate_content(insight_prompt)
            insights.append({
                "skill": skill,
                "insight": insight_response.text
            })
            
            # Generate recommendations
            if analysis['average_score'] < 7:
                rec_prompt = f"Suggest improvement areas for {skill} based on score {analysis['average_score']}/10"
                rec_response = model.generate_content(rec_prompt)
                recommendations.append(rec_response.text)

        # Calculate overall statistics
        all_scores = [score for scores in skill_scores.values() for score in scores]
        overall_stats = {
            "overall_score": sum(all_scores) / len(all_scores),
            "total_questions_attempted": len(request.answers),
            "technical_questions": len([a for a in request.answers if a.type == "technical"]),
            "coding_challenges": len([a for a in request.answers if a.type == "coding"])
        }

        # Generate certification status
        certification_status = get_certification_status(overall_stats["overall_score"])

        # Compile complete report
        complete_report = {
            "report_id": f"REP{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "generated_date": datetime.now().isoformat(),
            "candidate_info": {
                "profile": request.profile.dict(),
                "assessment_date": datetime.now().strftime("%Y-%m-%d")
            },
            "assessment_summary": overall_stats,
            "skill_analysis": skill_analysis,
            "detailed_feedback": detailed_feedback,
            "ai_insights": insights,
            "recommendations": recommendations,
            "certification_status": certification_status,
            "improvement_areas": get_improvement_areas(skill_analysis),
            "strengths": get_strengths(skill_analysis)
        }

        return JSONResponse(content=complete_report)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_proficiency_level(score: float) -> str:
    if score >= 9:
        return "Expert"
    elif score >= 7:
        return "Proficient"
    elif score >= 5:
        return "Intermediate"
    else:
        return "Beginner"

def get_certification_status(overall_score: float) -> str:
    if overall_score >= 8:
        return "Certified - Advanced Level"
    elif overall_score >= 6:
        return "Certified - Intermediate Level"
    elif overall_score >= 4:
        return "Certified - Basic Level"
    else:
        return "Not Certified - Needs Improvement"

def get_improvement_areas(skill_analysis: Dict) -> List[Dict]:
    return [
        {
            "skill": skill,
            "current_score": analysis["average_score"],
            "target_score": min(analysis["average_score"] + 2, 10),
            "proficiency_gap": "High" if analysis["average_score"] < 5 else "Medium"
        }
        for skill, analysis in skill_analysis.items()
        if analysis["average_score"] < 7
    ]

def get_strengths(skill_analysis: Dict) -> List[Dict]:
    return [
        {
            "skill": skill,
            "score": analysis["average_score"],
            "proficiency_level": analysis["proficiency_level"]
        }
        for skill, analysis in skill_analysis.items()
        if analysis["average_score"] >= 7
    ] 