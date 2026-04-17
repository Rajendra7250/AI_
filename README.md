# AIPS – AI Interview Prep Suite

Welcome to the AI Interview Prep Suite! This is a production-ready web app powered by Next.js and FastAPI with Google Gemini integration.

## Project Structure

- `frontend/`: Next.js App Router application with Tailwind CSS, Framer Motion, Recharts, and Zustand.
- `backend/`: FastAPI application with SQLite database, JWT auth setup, and Gemini `google-genai` integration setup.

## Running the Application

### 1. Backend (FastAPI + Gemini)
You need to set your Gemini API key to make the AI endpoints work.

1. Open `backend/services/ai_service.py` 
2. Add your API key inside or create a `.env` file in `backend/.env` with `GEMINI_API_KEY=your_key_here`.
3. Open a terminal in `backend/` and run:
   ```bash
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
   The backend will be running at [http://localhost:8000](http://localhost:8000)
   View interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Frontend (Next.js + Cyber Sunset Theme)
The frontend contains beautiful glassmorphism designs and Framer Motion animations.

1. Open a terminal in `frontend/` and run:
   ```bash
   npm install
   npm run dev
   ```
   The frontend will be running at [http://localhost:3000](http://localhost:3000)

## Features Included
1. **Viral Login Page**: Split screen animated cyber sunset background.
2. **Dashboard**: Recharts graph of performance with gradient UI.
3. **Resume Builder**: Simulated API form submission.
4. **Mock Interview**: Chat interface.
5. **Interview Q&A Generator**: Accordion-based answers ui.
6. **Study Module**: Roadmap style timeline view.
