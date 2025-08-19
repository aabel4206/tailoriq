# schemas/user_schema.py
from pydantic import BaseModel, EmailStr

# Schema for creating a new user
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# Schema for reading user info (response)
class UserRead(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True

# Schema for login
class UserLogin(BaseModel):
    email: EmailStr
    password: str
