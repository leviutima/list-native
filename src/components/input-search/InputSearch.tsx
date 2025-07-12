import { Feather } from "@expo/vector-icons";
import { Container, InputSearchStyled } from "./styles";

export function InputSearch() {
  return (
    <Container>
      <Feather name="search" size={20} color="#999" />
      <InputSearchStyled placeholder="Buscar tarefas" placeholderTextColor="#999" />
    </Container>
  );
}
