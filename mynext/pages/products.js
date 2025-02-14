import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        if (!response.ok) {
          throw new Error("Mahsulotlarni yuklashda xatolik!");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Mahsulotlar</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>💲 {product.price}</strong></p>
            <p>📦 {product.stock} ta mavjud</p>
          </div>
        ))}
      </div>
    </div>
  );
}
