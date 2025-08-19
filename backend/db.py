# backend/db.py
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session
from models.models_db import User, JobDescription, ResumeAnalysis

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL not set in .env")

engine = create_engine(DATABASE_URL, pool_pre_ping=True, echo=False)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
