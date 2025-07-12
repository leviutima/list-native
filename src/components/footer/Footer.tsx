import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Switch,
} from "react-native";
import { FooterContainer, style } from "./style";
import { TaskContext } from "../../context/task-context";

export default function Footer() {
  const { addTask } = useContext(TaskContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [pending, setPending] = useState(false);
  const [optional, setOptional] = useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function handleSubmit() {
    const formData = {
      title,
      description,
      flags: {
        urgent,
        pending,
        optional,
      },
    };
    addTask({
      title,
      description,
      urgent,
      pending,
      optional,
    });

    console.log("Dados do formulário:", formData);
    setTitle("");
    setDescription("");
    setUrgent(false);
    setPending(false);
    setOptional(false);
    toggleModal();
  }

  return (
    <FooterContainer >
      <TouchableOpacity style={style.buttonCreateTask} onPress={toggleModal}>
        <Text style={style.plusText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalTitle}>Nova Tarefa</Text>

            <TextInput
              style={modalStyles.input}
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[modalStyles.input, modalStyles.textArea]}
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <View style={modalStyles.flagsContainer}>
              <FlagSwitch
                label="Urgente"
                value={urgent}
                onValueChange={setUrgent}
              />
              <FlagSwitch
                label="Pendente"
                value={pending}
                onValueChange={setPending}
              />
              <FlagSwitch
                label="Opcional"
                value={optional}
                onValueChange={setOptional}
              />
            </View>

            <View style={modalStyles.buttonsRow}>
              <TouchableOpacity
                onPress={toggleModal}
                style={modalStyles.cancelButton}
              >
                <Text style={modalStyles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                style={modalStyles.submitButton}
              >
                <Text style={modalStyles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </FooterContainer>
  );
}

function FlagSwitch({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={modalStyles.flagRow}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  flagsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  flagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: "#aaa",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: "#878AF6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
