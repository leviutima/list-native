import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CardContainer,
  Description,
  Flag,
  FlagsContainer,
  Title,
  HeaderCard,
  CheckButton,
  TitleWrapper,
} from "./styles";

type Subtask = {
  title: string;
  done: boolean;
};

type CardTodoProps = {
  title: string;
  description: string;
  status?: "URGENT" | "PENDING" | "OPTIONAL";
  subtasks?: Subtask[];
};

export default function CardTodo({
  title,
  description,
  status,
  subtasks = [],
}: CardTodoProps) {
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subtaskList, setSubtaskList] = useState<Subtask[]>(subtasks);

  const toggleChecked = () => setChecked((prev) => !prev);
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const toggleSubtask = (index: number) => {
    setSubtaskList((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
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
    <>
      <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
        <CardContainer style={{ opacity: checked ? 0.5 : 1 }}>
          <HeaderCard>
            <TitleWrapper>
              <CheckButton onPress={toggleChecked}>
                <Ionicons
                  name={checked ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={checked ? "#4caf50" : "#aaa"}
                />
              </CheckButton>
              <Title style={{ textDecorationLine: checked ? "line-through" : "none" }}>
                {title}
              </Title>
            </TitleWrapper>
          </HeaderCard>

          <Description style={{ textDecorationLine: checked ? "line-through" : "none" }}>
            {description}
          </Description>

          <FlagsContainer>
            {status && <Flag style={{ backgroundColor: getStatusColor() }}>{status}</Flag>}
          </FlagsContainer>
        </CardContainer>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 12,
              width: "90%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>{title}</Text>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>{description}</Text>

            {status && (
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
            )}

            {/* Subtasks list */}
            {subtaskList.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Subtarefas:</Text>
                {subtaskList.map((sub, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleSubtask(index)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons
                      name={sub.done ? "checkbox" : "square-outline"}
                      size={20}
                      color={sub.done ? "#4caf50" : "#aaa"}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        textDecorationLine: sub.done ? "line-through" : "none",
                        color: sub.done ? "#888" : "#000",
                      }}
                    >
                      {sub.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={toggleModal}
              style={{
                marginTop: 10,
                backgroundColor: "#878AF6",
                paddingVertical: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
