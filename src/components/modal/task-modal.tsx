import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

export function TaskModal({
  visible,
  onClose,
  title,
  description,
  status,
  subtasks,
  toggleSubtask,
}: TaskModalProps) {
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
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
            {title}
          </Text>
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

          {subtasks.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
                Subtarefas:
              </Text>
              {subtasks.map((sub, index) => (
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
            onPress={onClose}
            style={{
              marginTop: 10,
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
        </View>
      </View>
    </Modal>
  );
}
