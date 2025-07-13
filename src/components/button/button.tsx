import { Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
    onPress: () => void
    disabled: boolean
}

export default function ButtonSis({children, onPress, disabled}: Props) {
  return (
    <TouchableOpacity style={style.boxButton} onPress={onPress} disabled={disabled}>
      <Text style={style.textButton}>{children}</Text>
    </TouchableOpacity>
  );
}
