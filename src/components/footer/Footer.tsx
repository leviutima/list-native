import React, { useContext, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { FooterContainer, style } from "./style";
import { TaskContext } from "../../context/task-context";
import CreateTaskModal from "../modal/create-task-modal";

export default function Footer() {
  const { addTask } = useContext(TaskContext);
  const [modalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function handleSubmit(task: {
    title: string;
    description: string;
    urgent: boolean;
    pending: boolean;
    optional: boolean;
  }) {
    addTask(task);
    console.log("Tarefa adicionada:", task);
  }

  return (
    <FooterContainer>
      <TouchableOpacity style={style.buttonCreateTask} onPress={toggleModal}>
        <Text style={style.plusText}>+</Text>
      </TouchableOpacity>

      <CreateTaskModal
        visible={modalVisible}
        onClose={toggleModal}
      />
    </FooterContainer>
  );
}
