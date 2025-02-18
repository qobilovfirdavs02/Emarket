import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser } from "../../utils/storage"; // Foydalanuvchini olish uchun yordamchi funksiya

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUser(); // LocalStorage'dan foydalanuvchini olish
    setUser(storedUser);

    if (!storedUser) {
      alert("⚠️ Savatchaga mahsulot qo‘shish yoki buyurtma berish uchun avval ro‘yxatdan o‘ting yoki tizimga kiring!");
      router.push("/user/login"); // Foydalanuvchini login sahifasiga yo‘naltirish
      return;
    }

    fetch("http://localhost:8000/cart/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Cart data:", data);
        setCart(data);
        calculateTotal(data);
      })
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
    setTotal(totalAmount);
  };

  const handleRemove = async (id) => {
    await fetch(`http://localhost:8000/cart/${id}`, { method: "DELETE" });
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("⚠️ Savatchangiz bo‘sh!");
      return;
    }

    const orderData = {
      user_id: user.id, // Haqiqiy foydalanuvchi ID'sini olish
      status: "pending",
      items: cart.map((item) => ({
        product_id: item.product?.id || 0,
        quantity: item.quantity,
      })),
    };

    console.log("Yuborilayotgan buyurtma:", orderData);

    const response = await fetch("http://localhost:8000/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert("✅ Buyurtmangiz muvaffaqiyatli yaratildi!");
      setCart([]);
      setTotal(0);
    } else {
      alert("❌ Buyurtma yaratishda xatolik yuz berdi!");
    }
  };

  return (
    <div>
      <h1>🛒 Savatcha</h1>
      {cart.length === 0 ? (
        <p>Savatcha bo‘sh.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
            <p><b>Mahsulot:</b> {item.product?.name || "Noma’lum mahsulot"}</p>
            <p><b>Narxi:</b> {item.product?.price ? `${item.product.price} so‘m` : "Noma’lum narx"}</p>
            <p><b>Miqdor:</b> {item.quantity}</p>
            <button onClick={() => handleRemove(item.id)}>❌ O‘chirish</button>
          </div>
        ))
      )}
      <h2>Umumiy summa: {total} so‘m</h2>

      {cart.length > 0 && (
        <button
          onClick={handleOrder}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          🛍 Buyurtma berish
        </button>
      )}
    </div>
  );
}
