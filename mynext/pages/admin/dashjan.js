import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 40px;
  background: #f4f4f4;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 18px;
  color: #555;
  margin: 10px 0;
`;

const AddProductButton = styled.button`
  padding: 12px 18px;
  font-size: 18px;
  cursor: pointer;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #218838;
  }
`;

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("http://localhost:8000/admins/dashboard");
        if (!response.ok) throw new Error("Admin ma'lumotlarini olishda xatolik!");
        
        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAdminData();
  }, []);

  if (error) return <Container>{error}</Container>;
  if (!admin) return <Container>Yuklanmoqda...</Container>;

  return (
    <Container>
      <Title>⚙️ WELCOME TO Admin Panel</Title>
      <Info>Your ID: {admin.id}</Info>
      <Info>your name: {admin.username}</Info>
      <Info>Email: {admin.email}</Info>
      <Link href="/admin/add_product">
        <AddProductButton>➕ Mahsulot qo‘shish</AddProductButton>
      </Link>
    </Container>
  );
}
