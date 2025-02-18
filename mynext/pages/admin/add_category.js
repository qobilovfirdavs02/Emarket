import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

// ✨ Styled Components (chiroyli dizayn uchun)
const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Xatolikni tozalash

    try {
      const response = await fetch("http://localhost:8000/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Kategoriya qo‘shishda xatolik yuz berdi!");
      }

      router.push("/admin/categories"); // ✅ Qo‘shilgandan keyin kategoriya ro‘yxatiga qaytish
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Title>📂 Yangi Kategoriya Qo‘shish</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Kategoriya nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">✅ Qo‘shish</Button>
      </form>
    </Container>
  );
}
