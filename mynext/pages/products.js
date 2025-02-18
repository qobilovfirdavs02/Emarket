import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Kategoriyalarni olish
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/categories/");
      if (!response.ok) throw new Error("Kategoriyalarni yuklashda xatolik!");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // ✅ Mahsulotlarni kategoriya bo‘yicha olish
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    let url = "http://localhost:8000/products/";
    if (selectedCategory) {
      url += `?category_id=${selectedCategory}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Mahsulotlarni yuklashda xatolik!");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>⏳ Yuklanmoqda...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍 Mahsulotlar</h1>

      {/* ✅ Kategoriya tanlash menyusi */}
      <select
  onChange={(e) => setSelectedCategory(e.target.value)}
  style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
>
  <option value="">🔄 Barcha kategoriyalar</option>
  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}  {/* ID emas, Name chiqadi */}
    </option>
  ))}
</select>


      {/* ✅ Mahsulotlar ro‘yxati */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>💲 {product.price}</strong>
            </p>
            <p>📦 {product.stock} ta mavjud</p>
          </div>
        ))}
      </div>
    </div>
  );
}
