from fastapi import APIRouter
from services.ai_service import generate_resume_content

router = APIRouter()

@router.post("/generate")
def generate_resume(user_data: dict):
    # Call Gemini via service
    content = generate_resume_content(user_data)
    return {"resume_markdown": content}
