# Assessment API

This FastAPI application provides endpoints for resume parsing, assessment generation, and evaluation using Google's Gemini AI.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your Gemini API key:
- Replace the API key in `app/assessment_api.py` with your own key
- Or set it as an environment variable:
```bash
export GEMINI_API_KEY="your-api-key"


genai.configure(api_key="AIzaSyDxF7VPex-rUHaSGRa9KdRnj0NqxWH9oCo")
model = genai.GenerativeModel('gemini-2.0-flash') 
```
using in # Configure Gemini API# Configure Gemini API
## Running the API

Start the server:
```bash
uvicorn app.assessment_api:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 1. Parse Resume
- **POST** `/parse-resume`
- Accepts PDF file upload
- Returns structured candidate profile

### 2. Generate Assessment
- **POST** `/generate-assessment`
- Accepts candidate profile
- Returns technical questions and coding challenges

### 3. Evaluate Answer
- **POST** `/evaluate-answer`
- Accepts answer with question ID and type
- Returns score and feedback

### 4. Generate Report
- **POST** `/generate-report`
- Accepts answers and profile
- Returns detailed assessment report

## Example Usage

1. Upload resume:
```bash
curl -X POST "http://localhost:8000/parse-resume" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@resume.pdf"
```

2. Generate assessment:
```bash
curl -X POST "http://localhost:8000/generate-assessment" \
  -H "Content-Type: application/json" \
  -d '{"skills": ["Python", "JavaScript"], "projects": ["Project 1"], "education": ["Degree 1"], "experience": ["Experience 1"]}'
```

3. Evaluate answer:
```bash
curl -X POST "http://localhost:8000/evaluate-answer" \
  -H "Content-Type: application/json" \
  -d '{"question_id": 1, "answer": "Your answer here", "type": "technical"}'
```

4. Generate report:
```bash
curl -X POST "http://localhost:8000/generate-report" \
  -H "Content-Type: application/json" \
  -d '{"answers": [...], "profile": {...}}'
```

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc` 