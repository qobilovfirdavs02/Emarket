from fastapi import APIRouter, Depends, HTTPException ,UploadFile, File
from sqlalchemy.orm import Session
from models.product import Product
from models.order import OrderItem
from schemas.product import ProductCreate, ProductResponse, ProductUpdate
from database import get_db
import os
import shutil


UPLOAD_DIR = "uploads"
router = APIRouter(prefix="/products", tags=["Products"])

# ✅ Mahsulot qo‘shish (faqat admin uchun)
@router.post("/", response_model=ProductResponse)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        image_url=product.image_url,
        category_id=product.category_id  # ✅ category_id majburiy bo‘ldi
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product







# Barcha mahsulotlarni olish (kategoriya bo‘yicha filtr bilan)
@router.get("/")
def get_products(category_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)  # `category_id` orqali filtrlash
    products = query.all()
    return products







# @router.put("/{product_id}", response_model=ProductUpdate)
# def update_product(product_id: int, product_data: ProductUpdate, db: Session = Depends(get_db)):
#     product = db.query(Product).filter(Product.id == product_id).first()
#     if not product:
#         raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

#     product.name = product_data.name
#     product.description = product_data.description
#     product.price = product_data.price
#     product.stock = product_data.stock
#     product.image_url = product_data.image_url

#     db.commit()
#     db.refresh(product)
#     return product







@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

    # Avval order_items dan bog‘liq ma’lumotlarni o‘chiramiz
    db.query(OrderItem).filter(OrderItem.product_id == product_id).delete()
    db.commit()

    # Endi mahsulotni o‘chiramiz
    db.delete(product)
    db.commit()

    return {"message": "Mahsulot va unga bog‘liq ma’lumotlar o‘chirildi"}











# 📌 Mahsulotni yangilash


# Mahsulotni yangilash API
@router.put("/{product_id}")
async def update_product(
    product_id: int,
    name: str,
    description: str,
    price: float,
    stock: int,
    category_id: int,
    image: UploadFile = File(None),  # Rasm opsional
    db: Session = Depends(get_db),
):
    # Mahsulotni bazadan olish
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

    # Yangi rasm yuklanayotgan bo'lsa, eski rasmni o'chiramiz
    if image:
        # Eski rasmni o'chirish
        if product.image_url:
            old_image_path = os.path.join(UPLOAD_DIR, os.path.basename(product.image_url))
            if os.path.exists(old_image_path):
                os.remove(old_image_path)

        # Yangi rasmni saqlash
        file_path = os.path.join(UPLOAD_DIR, image.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Yangi rasm URL'ini yangilash
        product.image_url = f"/uploads/{image.filename}"

    # Mahsulotni yangilash
    product.name = name
    product.description = description
    product.price = price
    product.stock = stock
    product.category_id = category_id

    # O'zgartirishlarni bazaga saqlash
    db.commit()
    db.refresh(product)

    return product  # Yangilangan mahsulotni qaytarish





# from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
# from sqlalchemy.orm import Session
# from models.product import Product
# from models.order import OrderItem
# from schemas.product import ProductCreate, ProductResponse
# from database import get_db
# import os
# import shutil

# # Rasm yuklash uchun katalog
# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)  # 📌 Agar katalog mavjud bo‘lmasa, avtomatik yaratamiz

# router = APIRouter(prefix="/products", tags=["Products"])

# # ✅ Mahsulot qo‘shish (faqat admin uchun)

# @router.post("/", response_model=dict)
# async def add_product(
#     name: str,
#     description: str,
#     price: float,
#     stock: int,
#     category_id: int,
#     image: UploadFile = File(None),  # Rasm yuklash opsional
#     db: Session = Depends(get_db)
# ):
#     image_url = None

#     # 📌 Rasmni saqlash
#     if image:
#         file_path = os.path.join(UPLOAD_DIR, image.filename)
#         with open(file_path, "wb") as buffer:  # FAQAT BINARY MODDA OCHISH!
#             shutil.copyfileobj(image.file, buffer)
#         image_url = f"/uploads/{image.filename}"

#     # 📌 Mahsulotni yaratish
#     new_product = Product(
#         name=name,
#         description=description,
#         price=price,
#         stock=stock,
#         category_id=category_id,
#         image_url=image_url
#     )
#     db.add(new_product)
#     db.commit()
#     db.refresh(new_product)

#     return {"message": "Mahsulot muvaffaqiyatli qo‘shildi", "product": new_product}






# # ✅ Barcha mahsulotlarni olish (kategoriya bo‘yicha filtr bilan)
# @router.get("/", response_model=list[ProductResponse])
# def get_products(category_id: int = None, db: Session = Depends(get_db)):
#     query = db.query(Product)
#     if category_id:
#         query = query.filter(Product.category_id == category_id)  # `category_id` orqali filtrlash
#     return query.all()

# # ✅ ID bo‘yicha mahsulotni olish
# @router.get("/{product_id}", response_model=ProductResponse)
# def get_product(product_id: int, db: Session = Depends(get_db)):
#     product = db.query(Product).filter(Product.id == product_id).first()
#     if not product:
#         raise HTTPException(status_code=404, detail="Mahsulot topilmadi")
#     return product

# # ✅ Mahsulotni yangilash (Rasm bilan)
# @router.put("/{product_id}", response_model=ProductResponse)
# async def update_product(
#     product_id: int,
#     name: str = Form(...),
#     description: str = Form(None),
#     price: float = Form(...),
#     stock: int = Form(...),
#     category_id: int = Form(None),
#     image: UploadFile = File(None),  # Rasm opsional
#     db: Session = Depends(get_db),
# ):
    
#     # Mahsulotni bazadan olish
#     product = db.query(Product).filter(Product.id == product_id).first()
#     if not product:
#         raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

#     # Yangi rasm yuklanayotgan bo‘lsa
#     if image:
#         # Eski rasmni o‘chirish
#         if product.image_url:
#             old_image_path = os.path.join(UPLOAD_DIR, os.path.basename(product.image_url))
#             if os.path.exists(old_image_path):
#                 os.remove(old_image_path)

#         # Yangi rasmni saqlash
#         file_path = os.path.join(UPLOAD_DIR, image.filename)
#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(image.file, buffer)

#         # Yangi rasm URL
#         product.image_url = f"/uploads/{image.filename}"


#     # Mahsulot ma'lumotlarini yangilash
#     product.name = name
#     product.description = description
#     product.price = price
#     product.stock = stock
#     product.category_id = category_id

#     db.commit()
#     db.refresh(product)
#     return product






# # ✅ Mahsulotni o‘chirish
# @router.delete("/{product_id}")
# def delete_product(product_id: int, db: Session = Depends(get_db)):
#     product = db.query(Product).filter(Product.id == product_id).first()
#     if not product:
#         raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

#     # Avval order_items dan bog‘liq ma’lumotlarni o‘chiramiz
#     db.query(OrderItem).filter(OrderItem.product_id == product_id).delete()
#     db.commit()

#     # Mahsulotga bog‘langan rasmni ham o‘chiramiz
#     if product.image_url:
#         image_path = os.path.join(UPLOAD_DIR, os.path.basename(product.image_url))
#         if os.path.exists(image_path):
#             os.remove(image_path)

#     # Mahsulotni o‘chiramiz
#     db.delete(product)
#     db.commit()

#     return {"message": "Mahsulot va unga bog‘liq ma’lumotlar o‘chirildi"}
