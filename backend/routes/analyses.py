import os, uuid, re
from typing import Tuple
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from sqlmodel import Session, select
from db import get_session
from models.models_db import ResumeAnalysis, User, JobDescription
from PyPDF2 import PdfReader

router = APIRouter(prefix="/analyses", tags=["analyses"])

TMP_DIR = "tmp"
os.makedirs(TMP_DIR, exist_ok=True)

def extract_text_from_upload(file_path: str) -> str:
    # .pdf → PyPDF2, .txt → read, else treat as binary and try decode
    if file_path.lower().endswith(".pdf"):
        try:
            reader = PdfReader(file_path)
            return "\n".join([page.extract_text() or "" for page in reader.pages])
        except Exception:
            return ""
    elif file_path.lower().endswith(".txt"):
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception:
            return ""
    else:
        try:
            with open(file_path, "rb") as f:
                raw = f.read()
            return raw.decode("utf-8", errors="ignore")
        except Exception:
            return ""

def simple_match(job_text: str, resume_text: str) -> Tuple[float, list[str], list[str]]:
    # Very naive keyword match: tokenize, compare overlap
    def tokenize(s: str) -> set[str]:
        words = re.findall(r"[A-Za-z+#.\-]{2,}", s.lower())
        return set(words)

    job_tokens = tokenize(job_text)
    resume_tokens = tokenize(resume_text)

    # Consider "skills" as top 50 frequent/unique tokens from job description (super naive)
    # For speed, just use all tokens for now
    needed = job_tokens
    matched = sorted(list(needed & resume_tokens))
    missing = sorted(list(needed - resume_tokens))
    score = (len(matched) / max(len(needed), 1)) * 100.0
    return round(score, 2), matched[:100], missing[:100]  # cap lists

@router.post("/analyze", response_model=dict)
async def analyze_resume(
    user_id: int = Form(...),
    job_id: int = Form(...),
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
):
    # sanity checks
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    job = session.get(JobDescription, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # save temp
    tmp_path = os.path.join(TMP_DIR, f"{uuid.uuid4().hex}_{file.filename}")
    with open(tmp_path, "wb") as f:
        f.write(await file.read())

    # extract + score
    resume_text = extract_text_from_upload(tmp_path)
    score, matched, missing = simple_match(job.description, resume_text)

    # persist
    analysis = ResumeAnalysis(
        filename=file.filename,
        match_score=score,
        matched=matched,
        missing=missing,
        user_id=user.id,
        job_id=job.id,
    )
    session.add(analysis)
    session.commit()
    session.refresh(analysis)

    # cleanup
    try:
        os.remove(tmp_path)
    except Exception:
        pass

    return {
        "id": analysis.id,
        "user_id": user.id,
        "job_id": job.id,
        "match_score": analysis.match_score,
        "matched": analysis.matched,
        "missing": analysis.missing,
    }

@router.get("/{analysis_id}", response_model=dict)
def get_analysis(analysis_id: int, session: Session = Depends(get_session)):
    a = session.get(ResumeAnalysis, analysis_id)
    if not a:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return {
        "id": a.id,
        "filename": a.filename,
        "user_id": a.user_id,
        "job_id": a.job_id,
        "match_score": a.match_score,
        "matched": a.matched,
        "missing": a.missing,
    }

@router.get("/", response_model=list[dict])
def list_analyses(user_id: int | None = None, job_id: int | None = None, session: Session = Depends(get_session)):
    query = select(ResumeAnalysis)
    if user_id:
        query = query.where(ResumeAnalysis.user_id == user_id)
    if job_id:
        query = query.where(ResumeAnalysis.job_id == job_id)
    rows = session.exec(query).all()
    return [{
        "id": a.id,
        "filename": a.filename,
        "user_id": a.user_id,
        "job_id": a.job_id,
        "match_score": a.match_score
    } for a in rows]
