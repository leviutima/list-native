import { Text, View } from "react-native";
import { HeaderContainer, MessageContainer, SubContainer, UserProfile } from "./style";
import { useUser } from "../../context/user-context";
import { Ionicons } from "@expo/vector-icons";

export function Header() {
  const { email } = useUser();

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
      <SubContainer>
        <UserProfile>
          <Ionicons name="person" size={54} color="black" />
        </UserProfile>
        <MessageContainer>
          <Text style={{ color: "", fontSize: 25, fontWeight: "600" }}>
            {getGreeting()} {email}
          </Text>
          <Text style={{color: '#767676'}}>
            Tarefas pendentes: 13
          </Text>
        </MessageContainer>
      </SubContainer>
    </HeaderContainer>
  );
}
