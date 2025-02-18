from pydantic import BaseModel

# Kategoriya yaratish uchun schema
class CategoryCreate(BaseModel):
    name: str

    class Config:
        orm_mode = True

# Kategoriya javob schema
class CategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
