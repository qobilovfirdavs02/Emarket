from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.category import Category  # Modelni import qilish
from schemas.category import CategoryCreate, CategoryResponse
from database import get_db

router = APIRouter(prefix="/categories", tags=["Categories"])


# ✅ Kategoriya qo‘shish
# routes/category.py
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from models.category import Category
from database import get_db

router = APIRouter(prefix="/categories", tags=["Categories"])



# Kategoriya qo'shish
@router.post("/", response_model=CategoryCreate)
def add_category(category: CategoryCreate, db: Session = Depends(get_db)):
    new_category = Category(name=category.name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category




# Kategoriyalar ro'yxatini olish
@router.get("/", response_model=list[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories




# ✅ Bitta kategoriya olish
@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Kategoriya topilmadi")
    return category


# ✅ Kategoriya o‘chirish
@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Kategoriya topilmadi")

    db.delete(category)
    db.commit()
    return {"message": "Kategoriya muvaffaqiyatli o'chirildi"}
