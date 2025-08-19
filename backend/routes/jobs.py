from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models.models_db import JobDescription
from db import get_session

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.post("/", response_model=dict)
def create_job(title: str, description: str, session: Session = Depends(get_session)):
    job = JobDescription(title=title, description=description)
    session.add(job)
    session.commit()
    session.refresh(job)
    return {"id": job.id, "title": job.title}

@router.get("/", response_model=list[dict])
def list_jobs(session: Session = Depends(get_session)):
    jobs = session.exec(select(JobDescription)).all()
    return [{"id": j.id, "title": j.title} for j in jobs]

@router.get("/{job_id}", response_model=dict)
def get_job(job_id: int, session: Session = Depends(get_session)):
    job = session.get(JobDescription, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"id": job.id, "title": job.title, "description": job.description}
