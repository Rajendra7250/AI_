from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from models.database import get_db
from models.user import User

router = APIRouter()

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup")
def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=user_data.password # In production, hash this!
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "Signup successful", "user": {"name": new_user.name, "email": new_user.email}}

@router.post("/login")
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or user.password != login_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    return {"access_token": "fake-jwt-token", "token_type": "bearer", "user": {"name": user.name, "email": user.email}}
