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
import {
  FormContainer,
  InputFormContainer,
  SubContainer,
} from "./styles";
import { MainContainer } from "../../styles/mainContainer";
import { useKeyboard } from "../../hooks/useKeyboard";

export default function SingUp() {
  const keyboardVisible = useKeyboard();

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
                <TextInput placeholder="Digite seu nome" />
              </InputFormContainer>

              {/* Adicione mais inputs aqui se necessário */}
            </FormContainer>
          </MainContainer>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
