import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { ContainerPropsTask, ModalStyle } from "./styles";
import { MainContainer } from "../../styles/mainContainer";
import { Container } from "../../styles/container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../service/task/update-task";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddSubtaskInput } from "../add-sub-task/addSubTask";

type Subtask = {
  title: string;
  finished: boolean;
};

type TaskModalProps = {
  id: string;
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  status?: "URGENT" | "PENDING" | "OPTIONAL";
  subtasks: Subtask[];
};

const subtaskSchema = z.object({
  title: z.string(),
  finished: z.boolean(),
});

const updateTaskFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["URGENT", "PENDING", "OPTIONAL"]),
  subtasks: z.array(subtaskSchema),
});

export type UpdateTaskFormData = z.infer<typeof updateTaskFormSchema>;

export function TaskModal({
  id,
  visible,
  onClose,
  title,
  description,
  status,
  subtasks,
}: TaskModalProps) {
  const [editField, setEditField] = useState<null | keyof UpdateTaskFormData>(
    null
  );
  const [editSubtaskIndex, setEditSubtaskIndex] = useState<number | null>(null);
  const [localSubtasks, setLocalSubtasks] = useState<Subtask[]>(subtasks);

  const { control, handleSubmit, reset, watch } = useForm<UpdateTaskFormData>({
    resolver: zodResolver(updateTaskFormSchema),
    defaultValues: { title, description, status, subtasks },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    reset({ title, description, status, subtasks });
    setLocalSubtasks(subtasks);
  }, [title, description, status, subtasks]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateTaskFormData) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });

  const handleUpdate = () => {
    const formValues = watch();
    mutate({ ...formValues, subtasks: localSubtasks });
    setEditField(null);
    setEditSubtaskIndex(null);
  };
  
  const handleToggleSubtask = (index: number) => {
    const updated = [...localSubtasks];
    updated[index].finished = !updated[index].finished;
    setLocalSubtasks(updated);

    const formValues = watch();
    mutate({ ...formValues, subtasks: updated });
  };

  const getStatusColor = () => {
    switch (status) {
      case "URGENT":
        return "#f44336";
      case "PENDING":
        return "#ff9800";
      case "OPTIONAL":
        return "#9e9e9e";
      default:
        return "#ccc";
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <MainContainer style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <ModalStyle>
          <ScrollView>
            <ContainerPropsTask>
              {editField === "title" ? (
                <>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={{
                          borderBottomWidth: 1,
                          borderColor: "black",
                          fontSize: 16,
                        }}
                        value={value}
                        onChangeText={onChange}
                        autoFocus
                        placeholder="Atualize o título"
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                      marginTop: 8,
                      backgroundColor: "#878AF6",
                      padding: 8,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      Atualizar
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => setEditField("title")}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 12,
                    }}
                  >
                    {title}
                  </Text>
                </TouchableOpacity>
              )}
            </ContainerPropsTask>
            <ContainerPropsTask>
              {editField === "description" ? (
                <>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        multiline
                        style={{
                          borderBottomWidth: 1,
                          borderColor: "black",
                          fontSize: 16,
                        }}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Atualize a descrição"
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                      marginTop: 8,
                      backgroundColor: "#878AF6",
                      padding: 8,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      Atualizar
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => setEditField("description")}>
                  <Text style={{ fontSize: 16, marginBottom: 16 }}>
                    {description}
                  </Text>
                </TouchableOpacity>
              )}
            </ContainerPropsTask>
            <ContainerPropsTask>
              {editField === "status" ? (
                <>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { onChange, value } }) => (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "#ccc",
                          borderRadius: 8,
                          marginBottom: 8,
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <Picker selectedValue={value} onValueChange={onChange}>
                          <Picker.Item label="Urgente" value="URGENT" />
                          <Picker.Item label="Pendente" value="PENDING" />
                          <Picker.Item label="Opcional" value="OPTIONAL" />
                        </Picker>
                      </View>
                    )}
                  />
                  <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                      backgroundColor: "#878AF6",
                      padding: 8,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      Atualizar
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => setEditField("status")}>
                  <Text
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      backgroundColor: getStatusColor(),
                      color: "#fff",
                      borderRadius: 8,
                      marginBottom: 16,
                    }}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              )}
            </ContainerPropsTask>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Subtarefas:
            </Text>
            {localSubtasks.map((sub, index) => (
              <Container key={index}>
                <TouchableOpacity
                  onPress={() => handleToggleSubtask(index)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name={sub.finished ? "checkbox" : "square-outline"}
                    size={20}
                    color={sub.finished ? "#4caf50" : "#aaa"}
                    style={{ marginRight: 8 }}
                  />
                  {editSubtaskIndex === index ? (
                    <>
                      <TextInput
                        value={sub.title}
                        onChangeText={(text) => {
                          const updated = [...localSubtasks];
                          updated[index].title = text;
                          setLocalSubtasks(updated);
                        }}
                        style={{ borderBottomWidth: 1, flex: 1, fontSize: 16 }}
                        autoFocus
                      />
                      <TouchableOpacity
                        onPress={handleUpdate}
                        style={{
                          backgroundColor: "#878AF6",
                          paddingVertical: 4,
                          paddingHorizontal: 8,
                          borderRadius: 6,
                          marginLeft: 8,
                        }}
                      >
                        <Text style={{ color: "#fff" }}>✔</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setEditSubtaskIndex(index)}
                      style={{ flex: 1 }}
                    >
                      <Text
                        style={{
                          textDecorationLine: sub.finished
                            ? "line-through"
                            : "none",
                          color: sub.finished ? "#888" : "#000",
                          fontSize: 16,
                        }}
                      >
                        {sub.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </Container>
            ))}
             {isPending && (
              <Text
                style={{ textAlign: "center", color: "blue", marginTop: 10 }}
              >
                Atualizando...
              </Text>
            )}
            <AddSubtaskInput
              onAddSubtask={(newSubtask) => {
                const updated = [...localSubtasks, newSubtask];
                setLocalSubtasks(updated); // <- exibe imediatamente no UI
                mutate({ ...watch(), subtasks: updated });
              }}
            />
            <TouchableOpacity
              onPress={onClose}
              style={{
                marginTop: 16,
                backgroundColor: "#878AF6",
                paddingVertical: 10,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </ModalStyle>
      </MainContainer>
    </Modal>
  );
}
