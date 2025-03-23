import requests
from fastapi import HTTPException
from tenacity import retry, stop_after_attempt, wait_exponential
from assessment_api import model

def test_resume_parser():
    url = "http://localhost:8000/assessment/parse-resume"
    
    try:
        with open("your_resume.pdf", "rb") as f:
            files = {"file": ("resume.pdf", f, "application/pdf")}
            response = requests.post(url, files=files)
        
        response.raise_for_status()
        
        if response.status_code == 200:
            print("Success:", response.json())
            return response.json()  # Return the profile for use in other tests
        else:
            print("Error:", response.text)
            return None
    except FileNotFoundError:
        print("Error: Resume file not found")
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {str(e)}")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")

def test_evaluate_answer():
    url = "http://localhost:8000/assessment/evaluate-answer"
    
    test_answer = {
        "question_id": 1,
        "answer": "Test answer content",
        "type": "technical"
    }
    
    try:
        response = requests.post(
            url, 
            json=test_answer,
            headers={"Content-Type": "application/json"}
        )
        
        response.raise_for_status()
        print("Evaluation result:", response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error testing answer evaluation: {str(e)}")

def test_generate_report():
    url = "http://localhost:8000/assessment/generate-report"
    
    # First get a profile from resume parsing
    profile = test_resume_parser()
    if not profile:
        print("Failed to get profile for report generation")
        return

    # Create some test answers
    test_answers = [
        {
            "question_id": 1,
            "answer": "Test technical answer 1",
            "type": "technical"
        },
        {
            "question_id": 2,
            "answer": "Test technical answer 2",
            "type": "technical"
        },
        {
            "question_id": 11,
            "answer": "def test(): return 'Hello World'",
            "type": "coding"
        }
    ]

    # Prepare request body
    request_body = {
        "answers": test_answers,
        "profile": profile
    }

    try:
        response = requests.post(
            url,
            json=request_body,
            headers={"Content-Type": "application/json"}
        )
        
        response.raise_for_status()
        print("Report generation result:", response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error generating report: {str(e)}")
        print(f"Response content: {e.response.text if hasattr(e, 'response') else 'No response'}")

def validate_parsed_data(data: dict) -> bool:
    required_fields = ['skills', 'projects', 'education', 'experience']
    return all(
        isinstance(data.get(field, []), list) 
        for field in required_fields
    )

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
async def get_gemini_response(prompt: str):
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    test_resume_parser()
    test_evaluate_answer()
    test_generate_report() 