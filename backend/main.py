from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, get_db
from models.admin import Admin
from models.user import User
from routes import admin, users, product, cart, order, category
from sqlalchemy.orm import Session

# FastAPI dasturini yaratish
app = FastAPI()

# CORS middleware - frontenddan so'rovlarni qabul qilish uchun
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Buni o'zgartirishingiz mumkin
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
app.include_router(category.router)
app.mount("/static", StaticFiles(directory="uploads"), name="static")
# Hozirda admin va userlar ro'yxatdan o'tish va login qilishni amalga oshiradigan endpointlar


@app.get("/")
def read_root():
    return {"message": "Welcome to the Admin Eshop API"}