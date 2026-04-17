from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import provide_interview_feedback

router = APIRouter()

class MockAnswer(BaseModel):
    question: str
    user_answer: str

@router.post("/submit")
def submit_mock_answer(data: MockAnswer):
    feedback = provide_interview_feedback(data.question, data.user_answer)
    return {"feedback_markdown": feedback}
