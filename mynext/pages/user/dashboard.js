import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #007bff, #6610f2);
`;

const DashboardBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 26px;
  color: #333;
  margin-bottom: 15px;
`;

const Info = styled.p`
  font-size: 18px;
  color: #555;
  margin: 10px 0;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: white;
  text-align: center;
`;

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/dashboard");
        if (!response.ok) throw new Error("User ma'lumotlarini olishda xatolik!");
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!user) return <LoadingMessage>⏳ Yuklanmoqda...</LoadingMessage>;

  return (
    <Container>
      <DashboardBox>
        <Title>👤 User Dashboard</Title>
        <Info><strong>ID:</strong> {user.id}</Info>
        <Info><strong>Username:</strong> {user.username}</Info>
        <Info><strong>Email:</strong> {user.email}</Info>
      </DashboardBox>
    </Container>
  );
}
