import os
from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv
from models.models_db import ResumeAnalysis  

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL not set. Check .env")

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
