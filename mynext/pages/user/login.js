import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 20px;
  background:rgb(109, 99, 99);
`;

const LoginBox = styled.div`
  background: orange;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
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
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const LoginButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background: #0056b3;
  }
`;

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/user/dashboard");
    } else {
      const data = await response.json();
      setError(data.detail || "Login xatolik!");
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>User Login</Title>
        <Form onSubmit={handleLogin}>
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

          <LoginButton type="submit">Login</LoginButton>
        </Form>
      </LoginBox>
    </Container>
  );
}
