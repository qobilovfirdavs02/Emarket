from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.order import Order
from schemas.user import UserCreate, UserResponse, UserLogin
from utils import get_password_hash ,verify_password

router = APIRouter()

@router.post("/register", response_model=UserCreate)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username allaqachon mavjud")

    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Noto‘g‘ri username yoki parol")
    
    return {
        "message": "Muvaffaqiyatli login",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email
        }
    }


# User dashboard
@router.get("/dashboard", response_model=UserResponse)
def user_dashboard(db: Session = Depends(get_db)):
    user = db.query(User).first()  # Agar birinchi user bo'lsa, uni qaytaradi
    if not user:
        raise HTTPException(status_code=404, detail="User topilmadi")
    
    return user  # Bu yerda SQLAlchemy modelini Pydantic modeliga o'tkazib yuboradi



