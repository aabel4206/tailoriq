import os
import uuid

TMP_DIR = "tmp"
os.makedirs(TMP_DIR, exist_ok=True)

def save_temp_file(upload_file) -> str:
    tmp_path = os.path.join(TMP_DIR, f"{uuid.uuid4().hex}_{upload_file.filename}")
    with open(tmp_path, "wb") as f:
        f.write(upload_file.file.read())
    return tmp_path

def remove_temp_file(path: str):
    if os.path.exists(path):
        os.remove(path)
