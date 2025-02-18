from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.order import Order, OrderItem
from models.user import User
from models.product import Product
from schemas.order import OrderCreate, OrderResponse
from database import get_db

router = APIRouter(prefix="/orders", tags=["Orders"])


# ✅ Yangi buyurtma yaratish
@router.post("/", status_code=201)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    # 1️⃣ User borligini tekshiramiz
    user = db.query(User).filter(User.id == order_data.user_id).first()
    if not user:
        raise HTTPException(status_code=400, detail="Bunday user mavjud emas!")

    # 2️⃣ Buyurtma yaratamiz
    new_order = Order(user_id=order_data.user_id)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # 3️⃣ Buyurtma ichiga mahsulotlarni qo‘shamiz
    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=400, detail=f"Mahsulot topilmadi (ID: {item.product_id})")
        
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity
        )
        db.add(order_item)
    
    db.commit()
    return {"message": "Buyurtma muvaffaqiyatli yaratildi!", "order_id": new_order.id}





# ✅ Foydalanuvchi buyurtmalarini olish
@router.get("/{user_id}", response_model=list[OrderResponse])
def get_user_orders(user_id: int, db: Session = Depends(get_db)):
    return db.query(Order).filter(Order.user_id == user_id).all()




# ✅ Barcha buyurtmalarni olish (Admin uchun)
@router.get("/", response_model=list[OrderResponse])
def get_all_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()




@router.get("/orders/", response_model=list[OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    return orders





@router.put("/orders/{order_id}/status/{new_status}")
def update_order_status(order_id: int, new_status: str, db: Session = Depends(get_db)):
    # Buyurtma mavjudligini tekshirish
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Buyurtma topilmadi")
    
    # Yangi holatning to‘g‘ri ekanligini tekshirish
    if new_status not in ["pending", "completed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Noto‘g‘ri holat turi")
    
    # Buyurtma holatini yangilash
    order.status = new_status
    db.commit()
    db.refresh(order)
    return {"message": "Buyurtma holati yangilandi!", "new_status": order.status}








@router.get("/orders/search/")
def search_orders(status: str = None, user_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Order)
    
    if status:
        query = query.filter(Order.status == status)
    
    if user_id:
        query = query.filter(Order.user_id == user_id)
    
    orders = query.all()
    
    return orders




@router.delete("/orders/{order_id}")
def cancel_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if order:
        db.delete(order)
        db.commit()
        return {"message": "Buyurtma bekor qilindi"}
    else:
        raise HTTPException(status_code=404, detail="Buyurtma topilmadi")
