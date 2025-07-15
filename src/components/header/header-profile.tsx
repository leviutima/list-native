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

export function HeaderProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <HeaderContainer>
      <TopHeader>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <UserProfile>
            <Ionicons name="arrow-back" size={24} color="black" />
          </UserProfile>
        </TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TopHeader>
      <SubContainer>
        <MessageContainer>
          <Text style={{ color: "", fontSize: 35, fontWeight: "300" }}>
            Olá,
          </Text>
          <Text style={{ fontSize: 35, fontWeight: "700" }}>
            {user?.name} {user?.surname}!
          </Text>
        </MessageContainer>
      </SubContainer>
    </HeaderContainer>
  );
}
