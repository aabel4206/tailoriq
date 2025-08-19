import json

def analyze_resume_keywords(resume_text: str, job_keywords: list) -> dict:
    """
    Returns match score, matched, missing keywords.
    """
    matched = [k for k in job_keywords if k.lower() in resume_text.lower()]
    missing = [k for k in job_keywords if k.lower() not in resume_text.lower()]
    score = len(matched) / len(job_keywords) if job_keywords else 0.0
    return {
        "match_score": round(score, 2),
        "matched": matched,
        "missing": missing
    }

def serialize_list(lst: list) -> str:
    return json.dumps(lst)

def deserialize_list(s: str) -> list:
    return json.loads(s)
