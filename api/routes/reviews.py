from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.orm import Session

from models import accounts, reviews
from schemas.accounts import User
from schemas.reviews import *
from utils.token_auth import get_current_user
from services.reviews import ReviewsService
from utils.database import SessionLocal, engine

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
reviews.Base.metadata.create_all(bind=engine)
accounts.Base.metadata.create_all(bind=engine)

# TODO: pull out into a utils file
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", tags=["reviews"])
async def get_reviews(
    current_user: Annotated[User, Depends(get_current_user)],
    queries: ReviewsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.get_reviews(db)

@router.get("/{id}", tags=["reviews"])
async def get_review(
    id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: ReviewsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.get_review_by_id(db, id)

@router.post("/", tags=["reviews"])
async def create_review(
    review: ReviewBase,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: ReviewsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.add_review(db, review)

@router.put("/", tags=["reviews"])
async def update_review(
    review: Review,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: ReviewsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.update_review(db, review)

@router.delete("/{id}", tags=["reviews"])
async def delete_review(
    id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: ReviewsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.delete_review(db, id)