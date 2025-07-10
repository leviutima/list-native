import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./styles";
import logo from "../../assets/logo.png";

export default function Login() {
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
          <TextInput placeholder="Digite seu email" style={style.inputStyle} />
        </View>
        <View>
          <Text style={style.titleInput}>Senha:</Text>
          <TextInput
            placeholder="Digite sua senha"
            value=""
            style={style.inputStyle}
          />
        </View>
      </View>
      <TouchableOpacity style={style.boxButton}>
        <Text style={style.textButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
