from pydantic import BaseModel

# Admin yaratish uchun schema (ro‘yxatdan o‘tish)
class AdminCreate(BaseModel):
    username: str
    password: str

# Admin login qilish uchun schema
class AdminLogin(BaseModel):
    username: str
    password: str

# Admin ma'lumotlarini qaytarish uchun schema
class AdminResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True  # ✅ SQLAlchemy obyektlarini avtomatik moslashtirish
