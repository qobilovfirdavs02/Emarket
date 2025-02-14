import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  height: 80px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
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
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image_url: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:8000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Mahsulot qo‘shishda xatolik yuz berdi!");
      }

      router.push("/products");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FormContainer>
      <Title>🛒 Yangi mahsulot qo‘shish</Title>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput type="text" placeholder="Mahsulot nomi" value={name} onChange={(e) => setName(e.target.value)} required />
        <StyledTextArea placeholder="Tavsif" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <StyledInput type="number" placeholder="Narx ($)" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <StyledInput type="number" placeholder="Ombordagi miqdor" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <StyledInput type="text" placeholder="Rasm URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">✅ Mahsulot qo‘shish</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
}
