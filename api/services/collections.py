from schemas.ocarinas import *
from models import ocarinas
from sqlalchemy.orm import Session


class CollectionsService:
    def get_ocarina_by_id(self, db: Session, id: str):
        return db.query(ocarinas.Collection).join(ocarinas.Collection, ocarinas.Collection.ocarina_id == ocarinas.Ocarina.id).filter(ocarinas.Collection.id == id).first()
   
    def get_collection(self, db: Session, owner_id: str, skip: int = 0, limit: int = 100):  
        return db.query(ocarinas.Collection).join(ocarinas.Collection, ocarinas.Collection.ocarina_id == ocarinas.Ocarina.id).filter(ocarinas.Collection.owner_id == owner_id).offset(skip).limit(limit).all()

    def delete_ocarina_from_collection(self, db: Session, id: str):
        db.query(ocarinas.Collection).filter(ocarinas.Collection.id == id).delete()
        return True

    def add_to_collection(self, db: Session, ocarina: Ocarina):
        db_item = ocarinas.Collection(**ocarina.model_dump())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item

    def update_item(self, db: Session, updated_ocarina: Collection):
        db.query(ocarinas.Collection).filter(ocarinas.Collection.id == updated_ocarina.id).update(updated_ocarina.model_dump())
        db.commit()
        return updated_ocarina