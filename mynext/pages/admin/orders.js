import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  // Buyurtmalarni olish
  const fetchOrders = async () => {
    let url = "http://localhost:8000/orders/";
    if (statusFilter) {
      url += `search/?status=${statusFilter}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    console.log("Fetched orders:", data); // Orderlar haqida ma'lumotni konsolga chiqarish
    
    // Tekshiruv qo'shish
    if (Array.isArray(data)) {
      setOrders(data);
    } else {
      console.error("Received data is not an array", data);
      setOrders([]); // Xato bo'lsa, bo'sh massiv qilib qo'yish
    }
  };

  // Buyurtma holatini yangilash
  const updateOrderStatus = async (orderId, newStatus) => {
    console.log("Yuborilayotgan ID:", orderId);
    console.log("Yangi holat:", newStatus);
  
    // Yangi URL formatida so'rov yuborish
    const response = await fetch(`http://localhost:8000/orders/${orderId}/status/${newStatus}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Xatolik:", errorData);
      alert("❌ Buyurtma holatini o‘zgartirishda xatolik: " + (errorData.detail || "Noma'lum xatolik"));
      return;
    }
  
    const result = await response.json();
    console.log("Backend javobi:", result);
  
    alert("✅ Buyurtma holati yangilandi!");
    fetchOrders(); // Yangilangan buyurtmalarni qayta yuklash
  };

  return (
    <div>
      <h1>📋 Buyurtmalar Boshqaruvi</h1>

      {/* Filtrlash */}
      <label>
        Holat bo‘yicha filtrlash:
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">Barchasi</option>
          <option value="pending">⏳ Kutilmoqda</option>
          <option value="completed">✅ Yakunlandi</option>
          <option value="cancelled">❌ Bekor qilindi</option>
        </select>
      </label>

      {/* Buyurtmalar ro‘yxati */}
      {orders.length === 0 ? (
        <p>🚫 Buyurtmalar topilmadi</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>Foydalanuvchi</th>
              <th>Holat</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== "completed" && (
                    <button onClick={() => updateOrderStatus(order.id, "completed")}>✅ Yakunlash</button>
                  )}
                  {order.status !== "cancelled" && (
                    <button onClick={() => updateOrderStatus(order.id, "cancelled")}>❌ Bekor qilish</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
