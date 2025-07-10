import { Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
    onPress: () => void
}

export default function ButtonSis({children, onPress}: Props) {
  return (
    <TouchableOpacity style={style.boxButton} onPress={onPress}>
      <Text style={style.textButton}>{children}</Text>
    </TouchableOpacity>
  );
}
