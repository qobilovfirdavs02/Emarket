import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (!storedAdmin) {
      router.push("/admin/login"); // Agar admin login qilmagan bo‘lsa, login sahifasiga yuboramiz
      return;
    }

    setAdmin(JSON.parse(storedAdmin));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin"); // Admin ma'lumotlarini o‘chirib tashlaymiz
    router.push("/admin/login"); // Login sahifasiga yo‘naltiramiz
  };

  if (!admin) return <Container>⏳ Yuklanmoqda...</Container>;

  return (
    <Container>
      <Title>⚙️ Welcome to Admin Panel</Title>
      <Info>👤 Your Admin ID: <strong>{admin.id}</strong></Info>
      <Info>📝 Your Name: <strong>{admin.username}</strong></Info>

      <ButtonContainer>
        <Link href="/admin/product">
          <StyledButton>📦 Mahsulotlar</StyledButton>
        </Link>
        <LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton>
      </ButtonContainer>
    </Container>
  );
}

// ✅ STYLED COMPONENTS (CSS)
const Container = styled.div`
  text-align: center;
  padding: 40px;
  background: #f4f4f4;
  min-height: 100vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #222;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 18px;
  color: #444;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #218838;
  }
`;

const LogoutButton = styled(StyledButton)`
  background-color: #dc3545;

  &:hover {
    background: #c82333;
  }
`;
