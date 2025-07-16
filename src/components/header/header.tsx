import { Text, TouchableOpacity, View } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { NotificationBell } from "../notification-bell/notificationBell";

type HeaderProps = {
  onSearch: (query: string) => void;
};

export function Header({ onSearch }: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <HeaderContainer>
      <TopHeader>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <UserProfile>
            <Ionicons name="person" size={24} color="black" />
          </UserProfile>
        </TouchableOpacity>
        <NotificationBell />
      </TopHeader>
      <SubContainer>
        <MessageContainer>
          <Text style={{ color: "", fontSize: 21, fontWeight: "300" }}>
            Olá,
          </Text>
          <Text style={{ fontSize: 21, fontWeight: "700" }}>
            {user?.name} {user?.surname}!
          </Text>
        </MessageContainer>
        <InputSearch onSearch={onSearch}/>
      </SubContainer>
    </HeaderContainer>
  );
}
