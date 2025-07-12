import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";
import { style } from "../button/style";

export const HeaderContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 20px;
  z-index: 10;
  gap: 10;
  background-color: white;

`;

export const MessageContainer = styled.View `

`

export const UserProfile = styled.View`
background-color: #878af6;
  border-radius: 100%;
  padding: 10px;
`;
export const SubContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 15px;
`;
