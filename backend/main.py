from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, interview, resume, mock
from models.database import engine, Base

# Create tables (SQLite for demo)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AIPS Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be the Next.js URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(resume.router, prefix="/resume", tags=["resume"])
app.include_router(interview.router, prefix="/interview", tags=["interview"])
app.include_router(mock.router, prefix="/mock", tags=["mock"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AIPS API"}
