import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
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
import { useMutation } from "@tanstack/react-query";
import { patchFinishedTask } from "../../service/task/patch-finished-task";
import { TaskModal } from "../modal/task-modal";

type Subtask = {
  title: string;
  done: boolean;
};

type CardTodoProps = {
  title: string;
  description: string;
  status?: "URGENT" | "PENDING" | "OPTIONAL";
  subtasks?: Subtask[];
  id: string;
  finished?: boolean;
};

export default function CardTodo({
  title,
  description,
  status,
  subtasks = [],
  id,
  finished,
}: CardTodoProps) {
  const [checked, setChecked] = useState(finished ?? false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subtaskList, setSubtaskList] = useState<Subtask[]>(subtasks);

  const mutation = useMutation({
    mutationFn: (finished: boolean) => patchFinishedTask(id, finished),
  });

  const toggleChecked = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    mutation.mutate(newChecked);
  };
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
              <Title
                style={{
                  textDecorationLine: checked ? "line-through" : "none",
                }}
              >
                {title}
              </Title>
            </TitleWrapper>
          </HeaderCard>

          <Description
            style={{ textDecorationLine: checked ? "line-through" : "none" }}
          >
            {description}
          </Description>

          <FlagsContainer>
            {status && (
              <Flag style={{ backgroundColor: getStatusColor() }}>
                {status}
              </Flag>
            )}
          </FlagsContainer>
        </CardContainer>
      </TouchableOpacity>
      <TaskModal
        visible={isModalVisible}
        onClose={toggleModal}
        title={title}
        description={description}
        status={status}
        subtasks={subtaskList}
        toggleSubtask={toggleSubtask}
      />
    </>
  );
}
