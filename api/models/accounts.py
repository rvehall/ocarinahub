from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from utils.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    full_name =  Column(String, index=True)
    role = Column(String, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    collections = relationship("Collection", back_populates="owner")
    reviews = relationship("Review", back_populates="owner")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
