import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { Header } from "../../components/header/header";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/footer/Footer";
import { ContainerList, MainContainer, style } from "./styles";
import { TaskContext } from "../../context/task-context";
import CardTodo from "../../components/card-todo/cardTodo";

export default function Home() {
  const { tasks } = useContext(TaskContext);

  return (
    <MainContainer>
      <Header />
      <ContainerList>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <CardTodo
              title={item.title}
              description={item.description}
              urgent={item.urgent}
              pending={item.pending}
              optional={item.optional}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
              Nenhuma tarefa cadastrada
            </Text>
          )}
        />
      </ContainerList>
      <Footer />
    </MainContainer>
  );
}
