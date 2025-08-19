from fastapi import FastAPI, UploadFile, File, Form, Depends
import os, uuid
from sqlmodel import Session
from db import create_db_and_tables, get_session
from models.models_db import ResumeAnalysis

app = FastAPI(title="TailorIQ Backend (Postgres)")

TMP_DIR = "tmp"
os.makedirs(TMP_DIR, exist_ok=True)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/analyze/")
async def analyze_resume(job_description: str = Form(...), file: UploadFile = File(...), session: Session = Depends(get_session)):
    tmp_path = os.path.join(TMP_DIR, f"{uuid.uuid4().hex}_{file.filename}")
    with open(tmp_path, "wb") as f:
        f.write(await file.read())

    analysis = ResumeAnalysis(filename=file.filename, match_score=0.0, matched="[]", missing="[]")
    session.add(analysis)
    session.commit()
    session.refresh(analysis)

    os.remove(tmp_path)
    return {"message": "Uploaded", "id": analysis.id}
