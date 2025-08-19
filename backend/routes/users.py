from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models.models_db import User
from utils.security import hash_password, verify_password
from db import get_session

router = APIRouter(prefix="/users", tags=["users"])

class UserCreatePayload(dict):  # simple typed hinting; could use Pydantic but keeping quick
    pass

@router.post("/", response_model=dict)
def create_user(email: str, password: str, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=email, hashed_password=hash_password(password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"id": user.id, "email": user.email}

@router.post("/login", response_model=dict)
def login(email: str, password: str, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # For speed, we’ll just return a “fake token” (JWT is optional for MVP)
    return {"user_id": user.id, "email": user.email, "token": "dev-token"}
