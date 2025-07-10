import { TextInput } from "react-native";
import { style } from "./style";

interface InputProps {
  placeholder: string;
}

export default function Input({ placeholder }: InputProps) {
  return <TextInput style={style.inputStyle} placeholder={placeholder} />;
}
