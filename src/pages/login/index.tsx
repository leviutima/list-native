import {
  Image,
  Text,
  View,
} from "react-native";
import { style } from "./styles";
import logo from "../../assets/logo.png";
import Input from "../../components/input/input";
import ButtonSis from "../../components/button/button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    setError("")
    console.log("Entrou no sistema:", email, password);
    navigation.navigate("Home")
  }

  return (
    <View style={style.mainContainer}>
      <View>
        <Image source={logo} />
      </View>

      <View style={style.firtsBox}>
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
        </View>
        {error ? (
          <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
        ) : null}
      </View>

      <ButtonSis onPress={handleLogin}>Entrar</ButtonSis>
    </View>
  );
}
