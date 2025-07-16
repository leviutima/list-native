import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react-native";

import { RootState } from "../../redux/store";
import { updateUser } from "../../service/user/update-user";
import { setUser } from "../../redux/actions/authAction";
import { HeaderProfile } from "../../components/header/header-profile";
import { UserProfile } from "../../components/header/style";
import { ContainerList, MainContainer } from "../home/styles";
import { Centered, EditIcon, FieldContainer, FieldInput, FieldText, Label, SaveButton, SaveButtonText, TextRow } from "./styles";


const profileFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
});

type ProfileForm = z.infer<typeof profileFormSchema>;

export default function Profile() {
  const [editingField, setEditingField] = useState<null | keyof ProfileForm>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
      Sentry.captureMessage("Tentativa de atualizar perfil sem usuário autenticado", {
        level: "warning",
        extra: { data },
      });
      return;
    }
    mutate(data);
    setEditingField(null);
  };

  return (
    <MainContainer>
      <HeaderProfile />
      <ContainerList>
        <Centered>
          <UserProfile>
            <Ionicons name="person" size={90} color="white" />
          </UserProfile>
        </Centered>
        {(["name", "surname", "email"] as (keyof ProfileForm)[]).map((fieldKey) => (
          <FieldContainer key={fieldKey}>
            <Label>
              {fieldKey === "name"
                ? "Nome"
                : fieldKey === "surname"
                ? "Sobrenome"
                : "Email"}
            </Label>
            <TextRow>
              {editingField === fieldKey ? (
                <Controller
                  control={control}
                  name={fieldKey}
                  render={({ field: { onChange, value } }) => (
                    <FieldInput
                      value={value}
                      onChangeText={onChange}
                      autoFocus
                      keyboardType={fieldKey === "email" ? "email-address" : "default"}
                    />
                  )}
                />
              ) : (
                <FieldText>{user?.[fieldKey]}</FieldText>
              )}
              <EditIcon
                onPress={() =>
                  setEditingField(editingField === fieldKey ? null : fieldKey)
                }
              >
                <Ionicons name="pencil" size={25} color="white" />
              </EditIcon>
            </TextRow>
          </FieldContainer>
        ))}

        {editingField && (
          <SaveButton disabled={isPending} onPress={handleSubmit(onSubmit)}>
            <SaveButtonText>
              {isPending ? "Carregando..." : "Salvar"}
            </SaveButtonText>
          </SaveButton>
        )}
      </ContainerList>
    </MainContainer>
  );
}
