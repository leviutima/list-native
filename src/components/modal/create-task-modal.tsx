import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
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

export default function CreateTaskModal({ visible, onClose }: CreateTaskModalProps) {


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
        finished: false
    }

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
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nova Tarefa</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Título"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
              </>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Descrição"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                />
                {errors.description && (
                  <Text style={styles.error}>{errors.description.message}</Text>
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
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione o status" value="" />
                    <Picker.Item label="Urgente" value="URGENT" />
                    <Picker.Item label="Pendente" value="PENDING" />
                    <Picker.Item label="Opcional" value="OPTIONAL" />
                  </Picker>
                </View>
                {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}
              </>
            )}
          />
          <Text style={styles.subtaskLabel}>Subtarefas</Text>
          <View style={styles.subtaskRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Nova subtarefa"
              value={subtaskInput}
              onChangeText={setSubtaskInput}
            />
            <TouchableOpacity onPress={addSubtask} style={styles.addButton}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={fields}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.subtaskItem}>
                <Text>{item.title}</Text>
                <TouchableOpacity onPress={() => remove(index)}>
                  <Text style={{ color: "red" }}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit(submitTask)} style={styles.submitButton}>
              <Text style={styles.buttonText}>{isPending ? "Salvando..." : "Salvar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    maxHeight: "90%",
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
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
  error: {
    color: "red",
    marginBottom: 8,
  },
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  subtaskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    marginBottom: 8,
  },
  subtaskLabel: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  addButton: {
    backgroundColor: "#878AF6",
    padding: 10,
    borderRadius: 6,
  },
});
