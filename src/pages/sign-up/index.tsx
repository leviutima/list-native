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
import { Controller, useForm } from "react-hook-form";
import z, { email, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../service/user/create-user";

const signUpFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  passowrd: z.string(),
});

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export default function SingUp() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const keyboardVisible = useKeyboard();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignUpFormSchema) => createUser(data),
  });

  const handleSingUp = async (data: SignUpFormSchema) => {
    mutate(data);
    navigation.navigate("Login");
  };

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

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
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputForm
                      placeholder="Digite seu nome"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      hasError={!!errors.email}
                    />
                  )}
                />
              </InputFormContainer>
              <InputFormContainer>
                <Text>Sobrenome</Text>
                <Controller
                  control={control}
                  name="surname"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputForm
                      placeholder="Digite seu sobrenome"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      hasError={!!errors.email}
                    />
                  )}
                />
              </InputFormContainer>
              <InputFormContainer>
                <Text>Email</Text>
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
              </InputFormContainer>
              <InputFormContainer>
                <Text>Senha</Text>
                <Controller
                  control={control}
                  name="passowrd"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputForm
                      placeholder="Digite sua senha"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      hasError={!!errors.email}
                    />
                  )}
                />
              </InputFormContainer>
            </FormContainer>
            <Container>
              <ButtonSis onPress={handleSubmit(handleSingUp)} disabled={isPending}>
                {isPending ? "Carregando..." : "Criar conta"}
              </ButtonSis>
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
