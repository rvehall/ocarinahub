from schemas.ocarinas import *
from models import ocarinas
from sqlalchemy.orm import Session


class OcarinasService:
    def get_ocarina_by_id(self, db: Session, id: str):
        return db.query(ocarinas.Ocarina).filter(ocarinas.Ocarina.id == id).first()
    
    def get_ocarinas(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(ocarinas.Ocarina).offset(skip).limit(limit).all()

    def delete_ocarina(self, db: Session, id: str):
        try:
            db.query(ocarinas.Ocarina).filter(ocarinas.Ocarina.id == id).delete()
            db.commit()
            return True
        except:
            return False

    def create_ocarina(self, db: Session, ocarina: Ocarina):
        existing_ocarina = self.get_ocarina_by_link(db, ocarina.product_link)
        if existing_ocarina is None:
            new_ocarina = ocarinas.Ocarina(**ocarina.model_dump())
            db_item = new_ocarina
            db.add(db_item)
            db.commit()
            db.refresh(new_ocarina)
            return new_ocarina
        else:
            return {"message": "This ocarina already exists", "ocarina": existing_ocarina}
    
    def get_ocarina_by_link(self, db: Session, link: str):
        return db.query(ocarinas.Ocarina).filter(ocarinas.Ocarina.product_link == link).first()

    def update_ocarina(self, db: Session, updated_ocarina: Ocarina):
        db.query(ocarinas.Ocarina).filter(ocarinas.Ocarina.id == updated_ocarina.id).update(updated_ocarina.model_dump())
        db.commit()
        return updated_ocarina
        