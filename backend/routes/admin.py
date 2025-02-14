from fastapi import APIRouter, Depends ,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.admin import Admin
from schemas.admin import AdminCreate, AdminResponse, AdminLogin
from utils import get_password_hash, verify_password

router = APIRouter()

@router.post("/register", response_model=AdminResponse)
def create_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(admin.password)
    db_admin = Admin(username=admin.username, password=hashed_password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin




@router.post("/login")
def login_admin(admin: AdminLogin, db: Session = Depends(get_db)):
    print("Kiritilgan username:", admin.username)  # Debug uchun
    db_admin = db.query(Admin).filter(Admin.username == admin.username).first()

    if not db_admin:
        print("Admin topilmadi!")  # Admin username bazada yo‘q bo‘lsa
        raise HTTPException(status_code=400, detail="Noto‘g‘ri username yoki parol")

    print("Admin topildi:", db_admin.username)  # Debug uchun

    if not verify_password(admin.password, db_admin.password):
        print("Noto‘g‘ri parol!")  # Agar parol noto‘g‘ri bo‘lsa
        raise HTTPException(status_code=400, detail="Noto‘g‘ri username yoki parol")

    return {"message": "Muvaffaqiyatli login", "admin_id": db_admin.id}





# @router.get("/{admin_id}", response_model=AdminResponse)
# def get_admin(admin_id: int, db: Session = Depends(get_db)):
#     admin = db.query(Admin).filter(Admin.id == admin_id).first()
#     if not admin:
#         raise HTTPException(status_code=404, detail="Admin topilmadi")
#     return admin





@router.get("/dashboard", response_model=AdminResponse)
def admin_dashboard(db: Session = Depends(get_db)):
    admin = db.query(Admin).first()  # Birinchi adminni olish
    if not admin:
        raise HTTPException(status_code=404, detail="Admin topilmadi")
    
    return admin