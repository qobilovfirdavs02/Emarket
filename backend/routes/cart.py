from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from models.cart import Cart
from models.product import Product
from schemas.cart import CartItem, CartResponse
from database import get_db

router = APIRouter(prefix="/cart", tags=["Cart"])

# Mahsulotni savatchaga qo‘shish
@router.post("/", response_model=CartResponse)
def add_to_cart(cart_item: CartItem, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Mahsulot topilmadi")

    cart = Cart(product_id=cart_item.product_id, quantity=cart_item.quantity, user_id=1)  # TODO: User ID sessiondan olish
    db.add(cart)
    db.commit()
    db.refresh(cart)
    return cart



# Foydalanuvchining savatchasini ko‘rish
@router.get("/", response_model=list[CartResponse])
def get_cart(db: Session = Depends(get_db)):
    cart_items = db.query(Cart).options(joinedload(Cart.product)).all()
    return db.query(Cart).all()



# Savatchadan mahsulotni o‘chirish
@router.delete("/{cart_id}")
def remove_from_cart(cart_id: int, db: Session = Depends(get_db)):
    cart_item = db.query(Cart).filter(Cart.id == cart_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Savatchada bunday mahsulot yo‘q")

    db.delete(cart_item)
    db.commit()
    return {"message": "Mahsulot savatchadan o‘chirildi"}
