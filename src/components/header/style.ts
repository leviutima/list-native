import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";
import { style } from "../button/style";

export const HeaderContainer = styled.View`
  display: flex;
  padding: 50px 15px 20px 15px;
  z-index: 10;
  gap: 10;
  background-color: white;
`;

export const TopHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MessageContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5;
  justify-content: center;
`;

export const UserProfile = styled.View`
  background-color: #878af6;
  border-radius: 100%;
  padding: 10px;
`;
export const SubContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
