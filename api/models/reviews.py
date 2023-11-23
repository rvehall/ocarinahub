from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from utils.database import Base
    
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, index=True)
    description = Column(String, nullable=True)
    ocarina_id = Column(Integer, ForeignKey("ocarinas.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="reviews")
    ocarina = relationship("Ocarina", back_populates="reviews")
    
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
