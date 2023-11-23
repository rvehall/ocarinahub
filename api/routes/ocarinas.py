from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.orm import Session

from models import accounts, ocarinas
from schemas.accounts import User
from schemas.ocarinas import *
from utils.token_auth import get_current_user
from services.ocarinas import OcarinasService
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

@router.get("/", tags=["ocarinas"])
async def get_ocarinas(
    current_user: Annotated[User, Depends(get_current_user)],
    queries: OcarinasService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.get_ocarinas(db)

@router.get("/{id}", tags=["ocarinas"])
async def get_ocarinas(
    id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: OcarinasService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.get_ocarina_by_id(db, id)

@router.post("/", tags=["ocarinas"])
async def create_ocarina(
    ocarina: OcarinaBase,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: OcarinasService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.create_ocarina(db, ocarina)

@router.put("/", tags=["ocarinas"])
async def update_ocarina(
    ocarina: Ocarina,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: OcarinasService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.update_ocarina(db, ocarina)

@router.delete("/{id}", tags=["ocarinas"])
async def delete_ocarina(
    id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    queries: OcarinasService = Depends(), 
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Incorrect permissions",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return queries.delete_ocarina(db, id)