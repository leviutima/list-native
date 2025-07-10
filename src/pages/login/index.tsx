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
import Input from "../../components/input/input";

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
          <Input placeholder="Digite seu email"/>
        </View>
        <View>
          <Text style={style.titleInput}>Senha:</Text>
          <Input placeholder="Digite sua senha"/>
        </View>
      </View>
      <TouchableOpacity style={style.boxButton}>
        <Text style={style.textButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
