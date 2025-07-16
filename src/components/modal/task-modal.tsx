import React, { useState } from "react";
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
import { ContainerPropsTask, ModalStyle } from "./style";
import { MainContainer } from "../../styles/mainContainer";
import { Container } from "../../styles/container";

type Subtask = {
  title: string;
  done: boolean;
};

type TaskModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  status?: "URGENT" | "PENDING" | "OPTIONAL";
  subtasks: Subtask[];
  toggleSubtask: (index: number) => void;
};

type EditableFields = "title" | "description" | "status";

export function TaskModal({
  visible,
  onClose,
  title,
  description,
  status,
  subtasks,
  toggleSubtask,
}: TaskModalProps) {
  const [editField, setEditField] = useState<null | EditableFields>(null);
  const [editSubtaskIndex, setEditSubtaskIndex] = useState<number | null>(null);
  const [localSubtasks, setLocalSubtasks] = useState<Subtask[]>(subtasks);

  const { control } = useForm({
    defaultValues: {
      title,
      description,
      status,
    },
  });

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
      <MainContainer
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <ModalStyle>
          <ScrollView>
            <ContainerPropsTask>
              {editField === "title" ? (
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        flex: 1,
                        paddingVertical: 4,
                        fontSize: 16,
                        color: "black",
                      }}
                      value={value}
                      onChangeText={onChange}
                      autoFocus
                      placeholder="Atualize o título"
                      onBlur={() => setEditField(null)}
                    />
                  )}
                />
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
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      multiline
                      style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        flex: 1,
                        paddingVertical: 4,
                        fontSize: 16,
                        color: "black",
                      }}
                      value={value}
                      onChangeText={onChange}
                      autoFocus
                      placeholder="Atualize a descrição"
                      onBlur={() => setEditField(null)}
                    />
                  )}
                />
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
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        marginBottom: 16,
                        width: "100%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                          setEditField(null);
                        }}
                      >
                        <Picker.Item label="Urgente" value="URGENT" />
                        <Picker.Item label="Pendente" value="PENDING" />
                        <Picker.Item label="Opcional" value="OPTIONAL" />
                      </Picker>
                    </View>
                  )}
                />
              ) : (
                status && (
                  <TouchableOpacity onPress={() => setEditField("status")}>
                    <Text
                      style={{
                        alignSelf: "flex-start",
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
                )
              )}
            </ContainerPropsTask>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Subtarefas:
            </Text>
            {localSubtasks.map((sub, index) => (
              <Container key={index}>
                <TouchableOpacity
                  onPress={() => toggleSubtask(index)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name={sub.done ? "checkbox" : "square-outline"}
                    size={20}
                    color={sub.done ? "#4caf50" : "#aaa"}
                    style={{ marginRight: 8 }}
                  />

                  {editSubtaskIndex === index ? (
                    <TextInput
                      value={sub.title}
                      onChangeText={(text) => {
                        const updated = [...localSubtasks];
                        updated[index].title = text;
                        setLocalSubtasks(updated);
                      }}
                      style={{
                        borderBottomWidth: 1,
                        borderColor: "#ccc",
                        paddingVertical: 2,
                        flex: 1,
                        fontSize: 16,
                      }}
                      autoFocus
                      onBlur={() => setEditSubtaskIndex(null)}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => setEditSubtaskIndex(index)}
                      style={{ flex: 1 }}
                    >
                      <Text
                        style={{
                          textDecorationLine: sub.done
                            ? "line-through"
                            : "none",
                          color: sub.done ? "#888" : "#000",
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
