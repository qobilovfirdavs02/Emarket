import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setStock(data.stock);
          setImageUrl(data.image_url);
        })
        .catch((error) => console.error("Xatolik:", error));
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image_url: imageUrl,
    };

    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div>
      <h1>✏️ Mahsulotni tahrirlash</h1>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <button type="submit">✅ Yangilash</button>
      </form>
    </div>
  );
}
