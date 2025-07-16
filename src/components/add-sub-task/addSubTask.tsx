import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";

type Subtask = {
  title: string;
  finished: boolean;
};

type Props = {
  onAddSubtask: (subtask: Subtask) => void;
};

export function AddSubtaskInput({ onAddSubtask }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    const newSubtask: Subtask = {
      title: title.trim(),
      finished: false,
    };

    onAddSubtask(newSubtask);
    setTitle(""); 
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
      <TextInput
        placeholder="Nova subtarefa"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          padding: 8,
          flex: 1,
          marginRight: 8,
        }}
      />
      <TouchableOpacity
        onPress={handleAdd}
        style={{
          backgroundColor: "#4CAF50",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
