import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ContainerList, MainContainer } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HeaderProfile } from "../../components/header/header-profile";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "../../components/header/style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../service/user/update-user";
import { setUser } from "../../redux/actions/authAction";
import * as Sentry from "@sentry/react-native";

const profileFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
});

type ProfileForm = z.infer<typeof profileFormSchema>;
export default function Profile() {
  const [editingField, setEditingField] = useState<null | keyof ProfileForm>(
    null
  );

  const user = useSelector((state: RootState) => state.auth.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<ProfileForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: ProfileForm) => updateUser(data, user.id),
    onSuccess: (updatedUser) => {
      dispatch(setUser(updatedUser));
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any, variables) => {
      Sentry.captureException(error, {
        extra: {
          context: "Erro ao atualizar perfil",
          userId: user?.id,
          email: user?.email,
          dadosEnviados: variables,
        },
      });
    },
  });

  const onSubmit = (data: ProfileForm) => {
    if (!user?.id) {
      Sentry.captureMessage(
        "Tentativa de atualizar perfil sem usuário autenticado",
        {
          level: "warning",
          extra: { data },
        }
      );
      return;
    }
    mutate(data);
    setEditingField(null);
  };
  return (
    <MainContainer>
      <HeaderProfile />
      <ContainerList>
        <View style={{ display: "flex", alignItems: "center" }}>
          <UserProfile>
            <Ionicons name="person" size={90} color="white" />
          </UserProfile>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 46, color: "white" }}>
            Nome
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {editingField === "name" ? (
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "white",
                      flex: 1,
                      paddingVertical: 4,
                      fontSize: 26,
                      color: "white",
                    }}
                    value={value}
                    onChangeText={onChange}
                    autoFocus
                  />
                )}
              />
            ) : (
              <Text style={{ flex: 1, fontSize: 26, color: "white" }}>
                {user?.name}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setEditingField(editingField === "name" ? null : "name");
              }}
            >
              <Ionicons
                name="pencil"
                size={25}
                style={{ marginLeft: 8, color: "white" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 46, color: "white" }}>
            Sobrenome
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {editingField === "surname" ? (
              <Controller
                control={control}
                name="surname"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "white",
                      flex: 1,
                      paddingVertical: 4,
                      fontSize: 26,
                      color: "white",
                    }}
                    value={value}
                    onChangeText={onChange}
                    autoFocus
                  />
                )}
              />
            ) : (
              <Text style={{ flex: 1, fontSize: 26, color: "white" }}>
                {user?.surname}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setEditingField(editingField === "surname" ? null : "surname");
              }}
            >
              <Ionicons
                name="pencil"
                size={25}
                style={{ marginLeft: 8, color: "white" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 46, color: "white" }}>
            Email
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {editingField === "email" ? (
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "white",
                      flex: 1,
                      paddingVertical: 4,
                      fontSize: 26,
                      color: "white",
                    }}
                    value={value}
                    onChangeText={onChange}
                    autoFocus
                    keyboardType="email-address"
                  />
                )}
              />
            ) : (
              <Text style={{ flex: 1, fontSize: 26, color: "white" }}>
                {user?.email}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setEditingField(editingField === "email" ? null : "email");
              }}
            >
              <Ionicons
                name="pencil"
                size={25}
                style={{ marginLeft: 8, color: "white" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {editingField && (
          <TouchableOpacity
            disabled={isPending}
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: "#878AF6",
              paddingVertical: 10,
              borderRadius: 6,
              marginTop: 20,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              {isPending ? "Carrengando..." : "Salvar"}
            </Text>
          </TouchableOpacity>
        )}
      </ContainerList>
    </MainContainer>
  );
}
