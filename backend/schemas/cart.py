from schemas.product import ProductResponse
from pydantic import BaseModel

class CartItem(BaseModel):
    product_id: int
    quantity: int

class CartResponse(BaseModel):
    id: int
    user_id: int
    quantity: int
    product: ProductResponse  # ✅ Mahsulot obyektini qo‘shamiz

    class Config:
        from_attributes = True  # ✅ Pydantic modeliga aylantirish
