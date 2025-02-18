import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { removeUser } from "../../utils/storage"; // Local storage'ni boshqarish uchun
import ErrorMessage from "@/components/common/LoadingMessage";
import LoadingMessage from "@/components/common/ErrorMessage"; // Yuklanayotganni ko'rsatish uchun
import Link from "next/link"; // Linkni ishlatish uchun

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const DashboardBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const OrdersButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }
`;

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // LocalStorage'dan foydalanuvchi ma'lumotlarini olish
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (!userData) {
      // Agar foydalanuvchi tizimga kirgan bo'lmasa, login sahifasiga yo'naltirish
      router.push("/user/login");
    } else {
      // Aks holda foydalanuvchi ma'lumotlarini ko'rsatish
      setUser(userData);
    }
  }, [router]);

  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("user"); // Userni localStorage'dan o‘chirib tashlaymiz
    router.push("/user/login"); // Login sahifasiga yo‘naltiramiz
  };

  // Agar xatolik bo'lsa yoki foydalanuvchi ma'lumotlari bo'lmasa, kerakli xabarlarni ko'rsatish
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!user) return <LoadingMessage>⏳ Yuklanmoqda...</LoadingMessage>;

  return (
    <Container>
      <DashboardBox>
        <Title>👤 User Dashboard</Title>
        <Info><strong>ID:</strong> {user.id}</Info>
        <Info><strong>Username:</strong> {user.username}</Info>
        <Info><strong>Email:</strong> {user.email}</Info>

        {/* Logout tugmasi */}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

        {/* Buyurtmalar sahifasiga yo'naltiradigan tugma */}
        <Link href="/user/orders" passHref>
          <OrdersButton>Buyurtmalarim</OrdersButton>
        </Link>
      </DashboardBox>
    </Container>
  );
}
