from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, get_db
from models.admin import Admin
from models.user import User
from routes import admin, users, product, cart, order
from sqlalchemy.orm import Session

# FastAPI dasturini yaratish
app = FastAPI()

# CORS middleware - frontenddan so'rovlarni qabul qilish uchun
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend manzilingiz
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Databaseni yaratish (agar mavjud bo'lmasa)
Base.metadata.create_all(bind=engine)

# Admin va User API yo'nalishlarini routerga qo'shish
app.include_router(admin.router, prefix="/admins", tags=["admin"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(product.router)
app.include_router(cart.router)
app.include_router(order.router)

# Hozirda admin va userlar ro'yxatdan o'tish va login qilishni amalga oshiradigan endpointlar




@app.get("/")
def read_root():
    return {"message": "Welcome to the Admin Eshop API"}