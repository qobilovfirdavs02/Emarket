from pydantic import BaseModel, EmailStr ,Field
from typing import List
from schemas.order import OrderResponse

class UserBase(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserCreate(UserBase):

     username: str
     email: EmailStr
     password: str

class UserResponse(UserBase):
    """Foydalanuvchi ma'lumotlarini olish uchun schema (response uchun)."""
    id: int

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    """User login uchun schema."""
    username: str
    password: str





class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True