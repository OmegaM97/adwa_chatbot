import os
from groq import Groq
from rag.retriever import get_retriever

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_question(question):

    retriever = get_retriever()

    docs = retriever.invoke(question)

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
You are an assistant answering questions about Addis Ababa University.

Context:
{context}

Question:
{question}

Answer:
"""

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content