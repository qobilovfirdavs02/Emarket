from pydantic import BaseModel
from typing import Optional

# Mahsulot qo‘shish uchun schema
class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    image_url: str | None = None  # Rasmlar majburiy emas

# Mahsulot ma'lumotlarini qaytarish uchun schema
class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: str | None = None

    class Config:
        from_attributes = True  # SQLAlchemy obyektlarini moslashtirish


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None