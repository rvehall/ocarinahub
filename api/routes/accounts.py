from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from sqlalchemy.orm import Session

from models import accounts
from schemas.accounts import Token, User, UserCreate
from services.accounts import AccountsService
from utils.token_auth import get_current_user
from utils.authenticator import Authenticator
from utils.database import SessionLocal, engine

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
accounts.Base.metadata.create_all(bind=engine)

# TODO: pull out into a utils file
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/user/create", tags=["users"], response_model=User)
async def create_account(
    user: UserCreate,
    queries: AccountsService = Depends(), 
    db: Session = Depends(get_db)
):
    return queries.create_user(db, user)

@router.post("/token", tags=["users"], response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    queries: AccountsService = Depends(),
    utilities: Authenticator = Depends(), 
    db: Session = Depends(get_db)
):
    user = queries.authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    account = user.as_dict()
    del account["hashed_password"]

    return utilities.create_access_token(data={"sub": user.username, "account": account})


@router.get("/users/me/", tags=["users"], response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)]
):
    return current_user
