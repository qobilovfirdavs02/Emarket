from pydantic import BaseModel
from typing import List
from enum import Enum

class OrderStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    cancelled = "cancelled"

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    user_id: int
    status: OrderStatus  # 👈 ENUM qo‘shildi!

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class OrderResponse(OrderBase):
    id: int
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True


class OrderItemResponse(BaseModel):
    product_id: int
    quantity: int

class OrderResponse(BaseModel):
    id: int
    user_id: int
    status: str
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True


