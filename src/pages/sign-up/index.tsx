import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { FormContainer, InputFormContainer, SubContainer } from "./styles";
import { MainContainer } from "../../styles/mainContainer";
import { useKeyboard } from "../../hooks/useKeyboard";
import { InputForm } from "../../styles/inputForm";
import ButtonSis from "../../components/button/button";
import { Container } from "../../styles/container";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function SingUp() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const keyboardVisible = useKeyboard();

  const handleSingUp = async () => {
    navigation.navigate("Login");
  };

  const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <MainContainer style={{ paddingBottom: keyboardVisible ? 100 : 0 }}>
            <SubContainer>
              <Text
                style={{
                  color: "#878AF6",
                  fontSize: 60,
                  fontWeight: "700",
                }}
              >
                AGENDA EDU
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "300" }}>
                Seja Bem vindo! Crie sua conta
              </Text>
            </SubContainer>

            <FormContainer>
              <InputFormContainer>
                <Text>Nome</Text>
                <InputForm placeholder="Digite seu nome" />
              </InputFormContainer>
              <InputFormContainer>
                <Text>Sobrenome</Text>
                <InputForm placeholder="Digite seu nome" />
              </InputFormContainer>
              <InputFormContainer>
                <Text>Email</Text>
                <InputForm placeholder="Digite seu nome" />
              </InputFormContainer>
              <InputFormContainer>
                <Text>Senha</Text>
                <InputForm placeholder="Digite seu nome" />
              </InputFormContainer>
            </FormContainer>
            <Container>
              <ButtonSis onPress={handleSingUp}>Criar conta</ButtonSis>
              <Text style={{ fontSize: 10, color: "#9f9f9f" }}>OU</Text>
              <ButtonSis onPress={() => navigation.navigate("Login")}>
                Entrar
              </ButtonSis>
              <Text style={{ fontSize: 10, color: "#9f9f9f" }}>
                Já tem uma conta?
              </Text>
            </Container>
          </MainContainer>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
