from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserBase(BaseModel):
    email: str
    username: str
    is_active: bool
    full_name: str | None = None
    role: str | None = 'collector'


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    
    class Config:
        from_attributes = True