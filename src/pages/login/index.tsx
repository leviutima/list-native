import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { style } from "./styles";
import Input from "../../components/input/input";
import ButtonSis from "../../components/button/button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser } from "../../context/user-context";
import { useKeyboard } from "../../hooks/useKeyboard";
import { MainContainer } from "../../styles/mainContainer";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setEmail: setEmailContext } = useUser();

  const keyboardVisible = useKeyboard();

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    setError("");
    console.log("Entrou no sistema:", email, password);
    setEmailContext(email);
    navigation.navigate("Home");
  }

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
          <MainContainer
            style={[
              style.mainContainer,
              { paddingBottom: keyboardVisible ? 100 : 0 },
            ]}
          >
            <View style={style.firtsBox}>
              <Text style={style.title}>AGENDA EDU</Text>
              <Text style={style.messageTitle}>Bem vindo de volta!</Text>
            </View>

            <View style={style.containerForm}>
              <View>
                <Text style={style.titleInput}>Email:</Text>
                <Input
                  placeholder="Digite seu email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View>
                <Text style={style.titleInput}>Senha:</Text>
                <Input
                  placeholder="Digite sua senha"
                  value={password}
                  onChangeText={setPassword}
                />
                <Text style={style.forgotPasswordText}>
                  Esqueceu a senha? Clique AQUI para recuperar
                </Text>
              </View>

              {error ? (
                <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
              ) : null}
            </View>

            <ButtonSis onPress={handleLogin}>Entrar</ButtonSis>
          </MainContainer>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
