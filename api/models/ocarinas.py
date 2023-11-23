from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from utils.database import Base
    
class Ocarina(Base):
    __tablename__ = "ocarinas"

    id = Column(Integer, primary_key=True, index=True)
    maker = Column(String, index=True)
    img_link = Column(String, index=True)
    product_link = Column(String, index=True)
    chamber_count = Column(Integer, index=True)
    hole_count = Column(Integer, index=True)
    type = Column(String, index=True)
    custom = Column(Boolean, index=True)

    reviews = relationship("Review", back_populates="ocarina")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    

class Collection(Base):
    __tablename__ = "collections"
    
    id = Column(Integer, primary_key=True, index=True)
    currently_have = Column(String, index=True) 
    ocarina_id = Column(Integer, ForeignKey("ocarinas.id"))
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="collections")
    
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}