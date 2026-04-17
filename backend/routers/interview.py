from fastapi import APIRouter
from services.ai_service import generate_interview_questions

router = APIRouter()

@router.post("/questions")
def get_questions(role: str, experience: str):
    content = generate_interview_questions(role, experience)
    return {"questions_markdown": content}
