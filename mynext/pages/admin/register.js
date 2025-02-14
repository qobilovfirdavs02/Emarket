import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

// 💠 Sahifa markazida register oynasi
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 20px;
  background: linear-gradient(135deg,rgb(121, 118, 117),rgb(124, 113, 105));
`;

const RegisterBox = styled.div`
  background: skyblue;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: black;

  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 95%;
  padding: 7px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: 0.3s;

  &:focus {
    border-color: #ff7e5f;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const RegisterButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background:rgb(0, 149, 17);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background:rgb(231, 208, 203);
  }
`;


export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/admins/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Ro'yxatdan o'tishda xatolik!");
      }

      router.push("/admin/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <RegisterBox>
        <Title>📝 Admin Ro‘yxatdan O‘tish</Title>
        <Form onSubmit={handleRegister}>
          <InputGroup>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <RegisterButton type="submit">Register</RegisterButton>
        </Form>
      </RegisterBox>
    </Container>
  );
}
