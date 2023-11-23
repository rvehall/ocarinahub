from pydantic import BaseModel

class OcarinaBase(BaseModel):
    maker: str
    img_link: str
    product_link: str
    chamber_count: int
    hole_count: int
    type: str
    custom: bool = False

class Ocarina(OcarinaBase):
    id: int | None = None
    class Config:
        from_attributes = True

class Ocarinas(BaseModel):
    ocarinas: list[Ocarina]

class CollectionBase(BaseModel):
    currently_have: bool
    owner_id: int
    ocarina_id: int

class Collection(CollectionBase):
    id: int
    class Config:
        from_attributes = True

class Collections(BaseModel):
    collection: list[Ocarina]