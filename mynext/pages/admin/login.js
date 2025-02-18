import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("❌ Login yoki parol noto‘g‘ri!");
      }

      const data = await response.json();
      localStorage.setItem("admin", JSON.stringify({ id: data.admin_id, username: data.username }));

      router.push("/admin/dashb"); // Dashboard sahifasiga yo‘naltiramiz
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>🔑 Admin Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleLogin}>
          <InputField>
            <label>👤 Username:</label>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </InputField>
          <InputField>
            <label>🔒 Password:</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </InputField>
          <LoginButton type="submit">🚀 Login</LoginButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}

// ✅ STYLED COMPONENTS (CSS)
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e9ecef;
`;

const LoginCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 350px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  background: #ffdddd;
  padding: 8px;
  border-radius: 6px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const LoginButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
