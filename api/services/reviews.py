from models import reviews, ocarinas
from schemas.reviews import *
from sqlalchemy.orm import Session


class ReviewsService:
    def get_reviews(self, db: Session, user_id: str):
        return db.query(ocarinas.Ocarina).join(reviews.Review, reviews.Review.ocarina_id == ocarinas.Ocarina.id).filter(reviews.Review.user_id == user_id)

    def add_review(self, db: Session, review: ReviewBase):
        db_item = reviews.Review(**review.model_dump())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    
    def update_review(self, db: Session, review: Review):
        db.query(reviews.Review).filter(reviews.Review.id == review.id).update(review.model_dump())
        db.commit()
        return review
    
    def delete_review(self, db: Session, id: str):
        try:
            db.query(reviews.Review).filter(reviews.Review.id == review.id).delete()
            db.commit()
            return True
        except:
            return False
