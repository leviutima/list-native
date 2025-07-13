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
import ButtonSis from "../../components/button/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser } from "../../context/user-context";
import { useKeyboard } from "../../hooks/useKeyboard";
import { MainContainer } from "../../styles/mainContainer";
import { RootStackParamList } from "../../utils/types";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "../../styles/inputForm";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../service/auth/login";

const loginFormSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().nonempty("Senha é obrigatória"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { setUser } = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const keyboardVisible = useKeyboard();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      navigation.navigate("Home");
    },
    onError: (error: any) => {
      console.error("Erro ao logar:", error.message);
    },
  });

  const handleLogin = (data: LoginFormSchema) => {
    mutate(data);
  };

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
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputForm
                      placeholder="Digite seu email"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      hasError={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <Text style={{ color: "red", marginTop: 4 }}>
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 16 }}>
                <Text style={style.titleInput}>Senha:</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputForm
                      placeholder="Digite sua senha"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      hasError={!!errors.password}
                      secureTextEntry
                    />
                  )}
                />
                {errors.password && (
                  <Text style={{ color: "red", marginTop: 4 }}>
                    {errors.password.message}
                  </Text>
                )}
                <Text style={style.forgotPasswordText}>
                  Esqueceu a senha? Clique AQUI para recuperar
                </Text>
              </View>
            </View>

            <ButtonSis onPress={handleSubmit(handleLogin)} disabled={isPending}>
              {isPending ? "Carregando..." : "Entrar"}
            </ButtonSis>
          </MainContainer>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
