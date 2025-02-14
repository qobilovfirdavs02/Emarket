import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
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
      alert("Savatchangiz bo‘sh!");
      return;
    }

    const orderData = {
      user_id: 1,  // TODO: Haqiqiy user ID olish kerak (masalan, token orqali)
      status: "pending",  // Buyurtma holati: "pending" (yangi buyurtma), "completed" yoki "cancelled" bo'lishi mumkin
      items: cart.map((item) => ({
        product_id: item.product?.id || 0,  // Mahsulot ID
        quantity: item.quantity,            // Miqdor
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
            <button onClick={() => handleRemove(item.id)}>❌ O‘chirish</button> {/* Moved button inside the map */}
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