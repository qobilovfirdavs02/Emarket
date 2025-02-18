from pydantic import BaseModel
from typing import Optional

# Mahsulot qo‘shish uchun schema
class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    image_url: Optional[str] = None  # Rasmlar majburiy emas
    category_id: int  # ✅ To‘g‘ri nomlangan!

# Mahsulot ma'lumotlarini qaytarish uchun schema
class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: Optional[str] = None
    class Config:
        from_attributes = True  # SQLAlchemy obyektlarini moslashtirish


class ProductUpdate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int
    category_id: Optional[int] = None
    image_url: Optional[str] = None