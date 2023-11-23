from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated

from models import accounts, ocarinas
from utils.token_auth import get_current_user
from services.recommendations import RecomendationService
from utils.database import SessionLocal, engine
from sqlalchemy.orm import Session

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# TODO: pull out into a utils file
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", tags=["recommendations"])
async def get_recommendations(
    current_user: Annotated[accounts.User, Depends(get_current_user)],
    queries: RecomendationService = Depends(), 
    db: Session = Depends(get_db)
):
        # return queries.get_recommendations(current_user.username)
        return queries.recommend_ocarinas(db, current_user.username)
