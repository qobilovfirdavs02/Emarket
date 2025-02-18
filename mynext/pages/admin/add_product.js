import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

// 📌 Styled Components yaratamiz
const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 80px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // imageUrl o'zgaruvchisini aniqladik
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Kategoriya olishda xatolik:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image_url: imageUrl, // imageUrl endi aniqlangan
      category_id: parseInt(category),
    };

    if (!productData.name || !productData.description || !productData.price || !productData.stock || !productData.category_id) {
      setError("Barcha maydonlarni to'ldirganingizga ishonch hosil qiling!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Mahsulot qo‘shishda xatolik yuz berdi!");
        return;
      }

      router.push("/admin/product");
    } catch (error) {
      setError("Serverga ulanishda xatolik yuz berdi!");
    }
  };

  return (
    <Container>
      <Title>🛍️ Yangi Mahsulot Qo‘shish</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Mahsulot nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextArea
          placeholder="Tavsif"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Narx"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Ombordagi miqdor"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))} // Rasmni tanlaganda URLni olish
        />
        {/* Kategoriya tanlash */}
        <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">🔽 Kategoriya tanlang</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">✅ Qo‘shish</Button>
      </Form>
    </Container>
  );
}
