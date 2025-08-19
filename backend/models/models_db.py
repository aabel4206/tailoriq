# backend/models/models_db.py
from __future__ import annotations
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, Text
try:
    # Nice to have on Postgres; falls back to Text if not available
    from sqlalchemy.dialects.postgresql import JSONB
    JSONLike = JSONB
except Exception:
    JSONLike = Text  # fallback

# ---------- User ----------
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str

    resumes: List["ResumeAnalysis"] = Relationship(back_populates="user")

# ---------- Job ----------
class JobDescription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str

    analyses: List["ResumeAnalysis"] = Relationship(back_populates="job")

# ---------- Analysis ----------
class ResumeAnalysis(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    match_score: float = 0.0
    matched: Optional[list[str]] = Field(
        default_factory=list,
        sa_column=Column(JSONLike)  # JSONB on Postgres; Text fallback
    )
    missing: Optional[list[str]] = Field(
        default_factory=list,
        sa_column=Column(JSONLike)
    )

    user_id: int = Field(foreign_key="user.id")
    job_id: int = Field(foreign_key="jobdescription.id")

    user: Optional[User] = Relationship(back_populates="resumes")
    job: Optional[JobDescription] = Relationship(back_populates="analyses")
