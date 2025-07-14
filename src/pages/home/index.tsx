import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { Header } from "../../components/header/header";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/footer/Footer";
import { ContainerList, MainContainer, style } from "./styles";
import { TaskContext } from "../../context/task-context";
import CardTodo from "../../components/card-todo/cardTodo";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getUser } from "../../service/user/get-user";
import { getTasksByUser } from "../../service/task/get-unique-task";

export default function Home() {
  // const { tasks } = useContext(TaskContext);

  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  
  
    const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['task', user?.id],
    queryFn: () => getTasksByUser(user.id),
    enabled: Boolean(user?.id),
  });

  console.log("tarefas:",tasks);
  

  return (
    <MainContainer>
      <Header />
      <ContainerList>
        <FlatList
          data={tasks ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <CardTodo
              title={item.title}
              description={item.description}
              status={item.status}
                subtasks={item.subtasks?.map((s: any) => ({
    title: s.title,
    done: s.finished,
  }))}
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
