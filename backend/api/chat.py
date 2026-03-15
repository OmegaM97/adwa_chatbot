from fastapi import APIRouter
from pydantic import BaseModel
from rag.qa_chain import ask_question

router = APIRouter()

class Question(BaseModel):
    question: str

@router.post("/chat")
def chat(q: Question):
    """
    Returns:
    - {"text": "..."} for normal questions
    - {"text": "...", "image": "<cloudinary_url>"} if AI wants image
    """
    return ask_question(q.question)