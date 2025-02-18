import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  font-size: 16px;
  color: red;
  text-align: center;
  padding: 20px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
`;

const ErrorMessage = ({ children }) => {
  return <ErrorMessageContainer>{children || "❌ Xatolik yuz berdi!"}</ErrorMessageContainer>;
};

export default ErrorMessage;
