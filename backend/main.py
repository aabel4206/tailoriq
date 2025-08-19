from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import create_db_and_tables
from routes.users import router as users_router
from routes.jobs import router as jobs_router
from routes.analyses import router as analyses_router

# create FastAPI app
app = FastAPI(title="TailorIQ Backend (PostgreSQL, Scalable)")

# allow frontend (React/Vite, Next.js, etc.) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
        "http://localhost:5173", "http://127.0.0.1:5173",   # Vite
        "http://localhost:3000", "http://127.0.0.1:3000"    # Next.js / CRA
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# run this at startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# health check route
@app.get("/")
def health():
    return {"status": "ok", "message": "TailorIQ backend is running 🚀"}

# mount routers
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(jobs_router, prefix="/jobs", tags=["Jobs"])
app.include_router(analyses_router, prefix="/analyses", tags=["Analyses"])
