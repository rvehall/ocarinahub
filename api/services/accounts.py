from schemas.accounts import Token, TokenData, User, UserCreate
from models import accounts
from sqlalchemy.orm import Session
from utils.authenticator import Authenticator

from jose import JWTError, jwt
from fastapi import HTTPException, status
from typing import Annotated
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


class AccountsService:
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
    # TODO: pull the next 2 lines out into an enviorment variable
    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"

    auth = Authenticator()

    def get_user(self, db: Session, username: str):
        return db.query(accounts.User).filter(accounts.User.username == username).first()
    
    def get_user_by_email(db: Session, email: str):
        return db.query(accounts.User).filter(accounts.User.email == email).first()

    def authenticate_user(self, db: Session, username: str, password: str):
        user = self.get_user(db, username)
        if not user:
            return False
        if not self.auth.verify_password(password, user.hashed_password):
            return False
        return user
    
    def get_users(db: Session, skip: int = 0, limit: int = 100):
        return db.query(accounts.User).offset(skip).limit(limit).all()

    def get_current_user(self, token: Annotated[str, Depends(oauth2_scheme)]):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = TokenData(username=username)
        except JWTError:
            raise credentials_exception
        user = self.get_user(username=token_data.username)
        if user is None:
            raise credentials_exception
        return user

    def create_user(self, db: Session, user: UserCreate):
        new_user = user.model_dump()
        new_user["hashed_password"] = self.auth.hash_password(user.password)
        del new_user["password"]
        model = accounts.User(**new_user)
        db.add(model)
        db.commit()
        db.refresh(model)
        return model
