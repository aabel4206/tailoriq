from pydantic import BaseModel
from typing import List

class AnalysisCreate(BaseModel):
    job_id: int
    resume_filename: str

class AnalysisRead(BaseModel):
    id: int
    job_id: int
    resume_filename: str
    match_score: float
    matched: List[str]
    missing: List[str]

    class Config:
        orm_mode = True
