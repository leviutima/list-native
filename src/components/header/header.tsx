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
import { useUsers } from "../../hooks/useUser";
import { InputSearch } from "../input-search/InputSearch";

export function Header() {
  const { email } = useUser();
  const { data, isLoading, error } = useUsers();

  console.log("teste", data);

  const getGreeting = () => {
    const now = new Date();

    const horaBrasil = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );
    const horas = horaBrasil.getHours();

    if (horas < 12) return "Bom dia";
    if (horas < 18) return "Boa tarde";
    return "Boa noite";
  };

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
              {getGreeting()},
            </Text>
            <Text style={{fontSize: 21, fontWeight: "700"}}>{email}!</Text>
        </MessageContainer>
        <InputSearch />
      </SubContainer>
    </HeaderContainer>
  );
}
