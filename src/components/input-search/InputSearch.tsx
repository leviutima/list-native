// InputSearch.tsx
import { Feather } from "@expo/vector-icons";
import { Container, InputSearchStyled } from "./styles";
import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export function InputSearch({ onSearch }: Props) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (text: string) => {
    setSearchText(text);
    onSearch(text); 
  };

  return (
    <Container>
      <Feather name="search" size={20} color="#999" />
      <InputSearchStyled
        placeholder="Buscar tarefas"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={handleChange}
      />
    </Container>
  );
}
