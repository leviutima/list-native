import { Text, View } from "react-native";
import {
  HeaderContainer,
  MessageContainer,
  SubContainer,
  TopHeader,
  UserProfile,
} from "./style";
import { useUser } from "../../context/user-context";
import { Ionicons } from "@expo/vector-icons";
import { InputSearch } from "../input-search/InputSearch";
import { useEffect, useState } from "react";

export function Header() {
  const { user } = useUser();

  

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
          <Text style={{ fontSize: 21, fontWeight: "700" }}>{user?.name}!</Text>
        </MessageContainer>
        <InputSearch />
      </SubContainer>
    </HeaderContainer>
  );
}
