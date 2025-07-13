import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  CardContainer,
  Description,
  Flag,
  FlagsContainer,
  Title,
  Checkmark,
  HeaderCard,
  CheckButton,
  TitleWrapper,
} from "./styles";

type CardTodoProps = {
  title: string;
  description: string;
  urgent?: boolean;
  pending?: boolean;
  optional?: boolean;
};

export default function CardTodo({
  title,
  description,
  urgent,
  pending,
  optional,
}: CardTodoProps) {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => setChecked((prev) => !prev);

  return (
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
          <Title style={{ textDecorationLine: checked ? "line-through" : "none" }}>
            {title}
          </Title>
        </TitleWrapper>
      </HeaderCard>

      <Description style={{ textDecorationLine: checked ? "line-through" : "none" }}>
        {description}
      </Description>

      <FlagsContainer>
        {urgent && <Flag style={{ backgroundColor: "#f44336" }}>Urgente</Flag>}
        {pending && <Flag style={{ backgroundColor: "#ff9800" }}>Pendente</Flag>}
        {optional && <Flag style={{ backgroundColor: "#2196f3" }}>Opcional</Flag>}
      </FlagsContainer>
    </CardContainer>
  );
}
