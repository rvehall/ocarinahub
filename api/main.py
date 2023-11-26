from fastapi import FastAPI, Request, Response
from routes import accounts, collections, recommendations, ocarinas, reviews
from utils.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


app.include_router(accounts.router)
app.include_router(ocarinas.router, prefix="/ocarinas")
app.include_router(collections.router, prefix="/collections")
app.include_router(reviews.router, prefix="/reviews")
app.include_router(recommendations.router, prefix="/recommendation")