from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.product import Product
from schemas.product import ProductCreate, ProductResponse, ProductUpdate
from database import get_db

router = APIRouter(prefix="/products", tags=["Products"])

# ✅ Mahsulot qo‘shish (faqat admin uchun)
@router.post("/", response_model=ProductResponse)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        image_url=product.image_url
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# ✅ Mahsulotlar ro‘yxatini olish (Userlar ko‘radi)
@router.get("/", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products






@router.put("/{product_id}", response_model=ProductUpdate)
def update_product(product_id: int, product_data: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

    product.name = product_data.name
    product.description = product_data.description
    product.price = product_data.price
    product.stock = product_data.stock
    product.image_url = product_data.image_url

    db.commit()
    db.refresh(product)
    return product





@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

    db.delete(product)
    db.commit()
    return {"message": "Mahsulot o‘chirildi"}
