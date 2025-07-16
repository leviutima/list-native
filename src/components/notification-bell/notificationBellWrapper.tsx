import React from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NotificationBell } from "./notificationBell";
import { useUrgentTasks } from "../../hooks/useUrgentTask";

export function NotificationBellWrapper() {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const { data: urgentTasks } = useUrgentTasks(userId);

  const urgentCount = urgentTasks?.length ?? 0;

  const handleNotificationPress = () => {
    if (urgentCount > 0) {
      Alert.alert("Tarefas Urgentes", `Você tem ${urgentCount} tarefa(s) urgentes.`);
    } else {
      Alert.alert("Sem urgências", "Você não tem tarefas urgentes no momento.");
    }
  };

  return (
    <NotificationBell urgentCount={urgentCount} onPress={handleNotificationPress} />
  );
}
