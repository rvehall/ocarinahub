from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.orm import Session

from models import accounts, ocarinas
from schemas.accounts import User
from schemas.ocarinas import *
from utils.token_auth import get_current_user
from services.collections import CollectionsService
from utils.database import SessionLocal, engine

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
ocarinas.Base.metadata.create_all(bind=engine)
accounts.Base.metadata.create_all(bind=engine)

# TODO: pull out into a utils file
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", tags=["collections"])
async def get_collection(
    current_user: Annotated[User, Depends(get_current_user)],
    queries: CollectionsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.get_collection(db, current_user.username)

@router.get("/{id}", tags=["collections"])
async def get_item(
    id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: CollectionsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.get_ocarina_by_id(db, id)

@router.post("/", tags=["collections"])
async def add_to_collection(
    ocarina: CollectionBase,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: CollectionsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.add_to_collection(db, ocarina)

@router.put("/", tags=["collections"])
async def update_item_in_collection(
    ocarina: Collection,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: CollectionsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.update_item(db, ocarina)

@router.delete("/{id}", tags=["collections"])
async def delete_item_in_collection(
    id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: CollectionsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.delete_ocarina_from_collection(db, id)