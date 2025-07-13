import styled from "styled-components/native";

interface InputProps {
  hasError?: boolean;
}

export const InputForm = styled.TextInput<InputProps>`
  border-width: 1px;
  background-color: #f1f7fa;
  width: 300px;
  border-radius: 30px;
  padding: 10px;
  border-color: ${({ hasError }: InputProps) => (hasError ? "red" : "#d3d0cd")};
`;
