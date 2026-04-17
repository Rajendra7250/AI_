from fastapi import APIRouter

router = APIRouter()

@router.post("/signup")
def signup():
    return {"message": "Signup successful"}

@router.post("/login")
def login():
    return {"access_token": "fake-jwt-token", "token_type": "bearer"}
