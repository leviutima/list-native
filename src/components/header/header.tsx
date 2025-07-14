import { Text, View } from "react-native";
import {
  HeaderContainer,
  MessageContainer,
  SubContainer,
  TopHeader,
  UserProfile,
} from "./style";
import { Ionicons } from "@expo/vector-icons";
import { InputSearch } from "../input-search/InputSearch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export function Header() {  

const user = useSelector((state: RootState) => state.auth.user);

  return (
    <HeaderContainer>
      <TopHeader>
        <UserProfile>
          <Ionicons name="person" size={24} color="black" />
        </UserProfile>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TopHeader>
      <SubContainer>
        <MessageContainer>
          <Text style={{ color: "", fontSize: 21, fontWeight: "300" }}>
            Olá,
          </Text>
          <Text style={{ fontSize: 21, fontWeight: "700" }}>{user?.name} {user?.surname}!</Text>
        </MessageContainer>
        <InputSearch />
      </SubContainer>
    </HeaderContainer>
  );
}
