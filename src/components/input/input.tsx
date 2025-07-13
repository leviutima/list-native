import { TextInput } from "react-native";
import { style } from "./style";

interface InputProps {
  placeholder: string;
  value: string;
  // onChangeText: (text: string) => void;
}

export default function Input({ placeholder, value }: InputProps) {
  return (
    <TextInput
      style={style.inputStyle}
      placeholder={placeholder}
      value={value}
      // onChangeText={onChangeText}
    />
  );
}
