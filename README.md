# Adwa ChatBot 🤖🇪🇹

**Adwa ChatBot** is a **RAG-based (Retrieval-Augmented Generation) AI assistant** designed to provide accurate and interactive information about the historic **Battle of Adwa**. It leverages **over 400 pages of textual content** and data from **3+ websites** to ensure well-informed responses, while minimizing hallucinations common in AI chatbots.

---

## Features

- **Interactive Chatting**: Ask questions about the Battle of Adwa and receive detailed answers.
- **Typing Effect**: Messages from the bot appear with a natural typewriter animation.
- **Minimized Hallucination**: Uses a RAG system to retrieve accurate information from your dataset.
- **Copy Messages**: Easily copy any message (user or bot) with a single click, complete with feedback icons.
- **Command-Line Style History Navigation**: Navigate previous questions using the **up/down arrow keys**, like a terminal.
- **Responsive & Modern UI**: Built with **Next.js** and **Tailwind CSS**, optimized for desktop and mobile.
- **Dark Mode & Smooth Animations**: Includes typing animations, spinners, and professional UI elements.

---

## Tech Stack

### Backend
- **FastAPI** – Web framework for API endpoints
- **ChromaDB** – Vector database for RAG
- **Playwright** – Web scraping automation
- **Google Gemini Flash 2.5** – Generative AI model
- **Python Libraries**:  
  - `uvicorn`  
  - `python-dotenv`  
  - `langchain`, `langchain-community`, `langchain-chroma`  
  - `pypdf`, `requests`, `python-multipart`  
  - `google-generativeai`  

### Frontend
- **Next.js** – React-based framework with TypeScript  
- **Tailwind CSS** – Utility-first CSS framework  
- **React + TypeScript** – Modern, strongly-typed frontend  
- **Animations**: Custom typewriter, smooth message transitions  

---

## Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
pipenv install

Note: Inside rag and other folders, some .py files are commented out. Remove comment markers to enable them.

Update any frontend URLs in backend config files to point to your local frontend (http://localhost:3000).

Run the FastAPI server:

pipenv run uvicorn app:app --reload

The backend will now be available at http://127.0.0.1:8000

### 2️⃣ Frontend Setup

cd frontend
npm install

Update any backend URLs in frontend code to point to your local FastAPI (http://127.0.0.1:8000).

Run the Next.js frontend:

npm run dev

The frontend will be available at http://localhost:3000

---

## Project Structure

├─ backend/        
│  ├─ app/
│  ├─ rag/        
│  └─ ...
├─ frontend/       
│  ├─ components/
│  ├─ pages/
│  └─ ...
└─ README.md

---

## Connect With me

[LinkedIn](https://www.linkedin.com/in/omegam-elese/) | 
[GitHub](https://github.com/omegam97) | 
[Twitter](https://twitter.com/om3ga_m)

---

- The RAG system ensures that responses are grounded in the collected Adwa data.
- Keep `.env` variables updated for API keys (Gemini, etc.).
- Use the command-line style history feature to recall previous questions.