import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  return (
    <div>
      <h1>📂 Kategoriyalar</h1>
      <Link href="/admin/add_category">
        <button style={{ padding: "10px", marginBottom: "10px", background: "green", color: "white", borderRadius: "5px" }}>
          ➕ Yangi kategoriya qo‘shish
        </button>
      </Link>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
