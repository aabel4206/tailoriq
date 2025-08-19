from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class ResumeAnalysis(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    match_score: float
    matched: str
    missing: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
