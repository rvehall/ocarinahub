from pydantic import BaseModel

class ReviewBase(BaseModel):
    ocarina_id: int
    user_id: int
    rating: int
    description: str

class Review(ReviewBase):
    id: int