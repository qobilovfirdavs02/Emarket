import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Mahsulotni o‘chirishni tasdiqlaysizmi?")) return;

    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Mahsulotlar</h1>
      <Link href="/admin/add_product">
        <button style={{ marginBottom: "10px", padding: "10px", background: "green", color: "white", borderRadius: "5px" }}>
          ➕ Yangi mahsulot qo‘shish
        </button>
      </Link>
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Mahsulot</th>
            <th>Narx</th>
            <th>Ombordagi miqdor</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Link href={`/admin/edit_product?id=${product.id}`}>
                  <button style={{ marginRight: "10px", background: "blue", color: "white" }}>✏️ Tahrirlash</button>
                </Link>
                <button onClick={() => handleDelete(product.id)} style={{ background: "red", color: "white" }}>
                  🗑 O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
