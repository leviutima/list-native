import React, { useState } from "react";
import {
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../service/task/create-task";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  AddButton,
  Background,
  ButtonText,
  CancelButton,
  Container,
  ErrorText,
  Input,
  PickerWrapper,
  Row,
  SubmitButton,
  SubtaskItem,
  SubtaskLabel,
  SubtaskTitle,
  TextArea,
  Title,
} from "./styles";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.enum(["URGENT", "PENDING", "OPTIONAL"]),
  subtasks: z.array(z.object({ title: z.string().min(1) })).optional(),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({
  visible,
  onClose,
}: CreateTaskModalProps) {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const [subtaskInput, setSubtaskInput] = useState("");

  const addSubtask = () => {
    if (subtaskInput.trim()) {
      append({ title: subtaskInput.trim() });
      setSubtaskInput("");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    mutationKey: ["task"],
  });

  const submitTask = async (data: TaskFormSchema) => {
    const payload = {
      ...data,
      userId: user.id,
      finished: false,
    };

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["task"] });
        reset();
        remove([...Array(fields.length).keys()]);
        onClose();
      },
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Background>
        <Container>
          <Title>Nova Tarefa</Title>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Título"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
              </>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <>
                <TextArea
                  placeholder="Descrição"
                  value={value}
                  onChangeText={onChange}
                  multiline
                />
                {errors.description && (
                  <ErrorText>{errors.description.message}</ErrorText>
                )}
              </>
            )}
          />

          <Text style={{ marginBottom: 8 }}>Status</Text>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <>
                <PickerWrapper>
                  <Picker selectedValue={value} onValueChange={onChange}>
                    <Picker.Item label="Selecione o status" value="" />
                    <Picker.Item label="Urgente" value="URGENT" />
                    <Picker.Item label="Pendente" value="PENDING" />
                    <Picker.Item label="Opcional" value="OPTIONAL" />
                  </Picker>
                </PickerWrapper>
                {errors.status && (
                  <ErrorText>{errors.status.message}</ErrorText>
                )}
              </>
            )}
          />

          <SubtaskLabel>Subtarefas</SubtaskLabel>
          <Row>
            <Input
              placeholder="Nova subtarefa"
              value={subtaskInput}
              onChangeText={setSubtaskInput}
              style={{ flex: 1, marginRight: 8 }}
            />
            <AddButton onPress={addSubtask}>
              <ButtonText>+</ButtonText>
            </AddButton>
          </Row>

          <FlatList
            data={fields}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <SubtaskItem>
                <SubtaskTitle>{item.title}</SubtaskTitle>
                <TouchableOpacity onPress={() => remove(index)}>
                  <Text style={{ color: "red" }}>Remover</Text>
                </TouchableOpacity>
              </SubtaskItem>
            )}
          />

          <Row style={{ justifyContent: "space-around", marginTop: 16 }}>
            <CancelButton onPress={onClose}>
              <ButtonText>Cancelar</ButtonText>
            </CancelButton>
            <SubmitButton onPress={handleSubmit(submitTask)}>
              <ButtonText>{isPending ? "Salvando..." : "Salvar"}</ButtonText>
            </SubmitButton>
          </Row>
        </Container>
      </Background>
    </Modal>
  );
}
