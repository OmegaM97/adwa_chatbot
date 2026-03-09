from fastapi import APIRouter
from pydantic import BaseModel
from rag.qa_chain import ask_question

router = APIRouter()

class Question(BaseModel):
    question: str


@router.post("/chat")
def chat(q: Question):

    answer = ask_question(q.question)

    return {"answer": answer}