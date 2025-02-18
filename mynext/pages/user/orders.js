// pages/user/orders.js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Buyurtmalarni olish
  useEffect(() => {
    const fetchOrders = async () => {
      // Frontendda cookiesni tekshirish
      const response = await fetch("http://localhost:8000/orders/", {
        method: "GET",
        credentials: "same-origin", // Cookie bilan so'rov yuborish
      });

      if (!response.ok) {
        router.push("/user/login"); // Agar foydalanuvchi login bo'lmagan bo'lsa, login sahifasiga yo'naltirish
        return;
      }

      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, [router]);

  const cancelOrder = async (orderId) => {
    const response = await fetch(`http://localhost:8000/orders/orders/${orderId}`, {
      method: "DELETE",
      credentials: "same-origin", // Cookie bilan so'rov yuborish
    });

    if (response.ok) {
      setOrders(orders.filter(order => order.id !== orderId)); // O'chirilgan buyurtmani ro'yxatdan olib tashlash
      alert("Buyurtma bekor qilindi!");
    } else {
      alert("Buyurtma bekor qilishda xatolik yuz berdi!");
    }
  };

  if (error) return <div>{error}</div>;
  if (orders.length === 0) return <div>Sizda buyurtmalar yo'q.</div>;

  return (
    <div>
      <h1>Buyurtmalarim</h1>
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>Buyurtma ID: {order.id}</h3>
          <p><strong>Umumiy summa:</strong> {order.total_amount} so‘m</p>
          <p><strong>Manzil:</strong> {order.address}</p>
          <p><strong>Holat:</strong> {order.status}</p>
          <button
            onClick={() => cancelOrder(order.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Buyurtmani bekor qilish
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
