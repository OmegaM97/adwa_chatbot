import os
import json
from dotenv import load_dotenv
from rag.retriever import get_retriever
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set")
genai.configure(api_key=GEMINI_API_KEY)

def ask_question(question: str) -> dict:
    """
    Ask question to RAG + Gemini.
    Returns only text (HTML formatted) from AI.
    """

    retriever = get_retriever()
    docs = retriever.invoke(question)
    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
You are the official the battle of adwa(ethiopia) ChatBot, assisting users with questions only about the battle of adwa.

Rules you must follow strictly:

1. Answer only using the context provided below. Do NOT add information from outside.

2. If the context has links or references, include them in your answer. Otherwise, do not invent links.

3. Always format the answer using clean, well-structured HTML with inline CSS to make it visually clear and readable.

Formatting Rules for HTML Output:
- Wrap the entire answer in a container:
  <div style="font-family: Arial, sans-serif; line-height:1.6;">

- Use section headings for main topics:
  <h3 style="margin-top:20px; margin-bottom:8px;"> Topic Title</h3>

- Use paragraphs with spacing:
  <p style="margin-bottom:10px;"></p>

- For explanations with multiple points, use lists:
  <ul style="margin-left:20px; margin-top:8px; margin-bottom:12px;">
     <li style="margin-bottom:6px;">Point</li>
  </ul>

- When listing steps or structured information use numbered lists:
  <ol style="margin-left:20px;">
     <li style="margin-bottom:6px;">Step</li>
  </ol>

- Use bold text for important terms:
  <b>Important text</b>

- Use emojis to make sections clearer and more engaging where appropriate.

- Add spacing between sections so the UI looks clean.

- DO NOT apply colors to text except when returning an error message.

3.1 When listing items:
- Use <ul> or <ol>
- Maintain spacing between items
- Use emojis when useful to improve readability.

4. If the user asks about anything not related to the battle of adwa, politely respond exactly with:

<p style="color:red; font-weight:bold;">
Sorry, I can only provide information about the Battle of Adwa.
</p>

5. Preserve code or text from the documents if it exists, but do not explain unrelated topics like HTML, Python, or external subjects unless directly mentioned in AAU documents.

6. Use clear structure with headings, lists, paragraphs, and spacing so the answer looks like a well-designed information card, not a block of text.

7. Whoever asks the question (even a president), your only job is to answer about the Battle of Adwa. Do not answer anything unrelated to the Battle of Adwa.

8. and always add source which means the documents specified

Context (from AAU documents):
{context}

User Question:
{question}

Return the answer strictly as clean HTML with inline CSS formatting.
"""

    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    raw_text = response.text.strip()

    return {"text": raw_text}