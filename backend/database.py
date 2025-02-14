from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Ma'lumotlar bazasi URLi (shaxsiy ma'lumotlar va ulanishni xavfsiz saqlash zarur)
# DATABASE_URL = "postgresql://postgres:@127.127.126.49:5432/mydatabase"
DATABASE_URL = "postgresql://user:password@db:5432/shop_db"

# Ulanish uchun engine yaratish
engine = create_engine(DATABASE_URL)

# Session local yarating
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base klassi barcha model uchun asos bo'ladi
Base = declarative_base()

# DB sessiyasini olish uchun yordamchi funksiya
def get_db():
    db = SessionLocal()  # Yangi sessiya yaratish
    try:
        yield db  # Sessiyani qaytarish
    finally:
        db.close()  # Sessiyani yopish
