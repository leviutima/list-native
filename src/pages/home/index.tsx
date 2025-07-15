import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Header } from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { ContainerList, MainContainer } from "./styles";
import CardTodo from "../../components/card-todo/cardTodo";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getTasksByUser } from "../../service/task/get-unique-task";

export default function Home() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "PENDING" | "URGENT" | "done"
  >("all");

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["task", user?.id],
    queryFn: () => getTasksByUser(user.id),
    enabled: Boolean(user?.id),
  });

  const filteredTasks = tasks
    .filter((task: any) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task: any) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "PENDING") return task.status === "PENDING";
      if (statusFilter === "URGENT") return task.status === "URGENT";
      if (statusFilter === "done") return task.finished === true;
      return true;
    });

  return (
    <MainContainer>
      <Header onSearch={setSearch} />

      <ContainerList>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 12,
          }}
        >
          <TextFilterButton
            label="Todos"
            active={statusFilter === "all"}
            onPress={() => setStatusFilter("all")}
          />
          <TextFilterButton
            label="Pendente"
            active={statusFilter === "PENDING"}
            onPress={() => setStatusFilter("PENDING")}
          />
          <TextFilterButton
            label="Urgente"
            active={statusFilter === "URGENT"}
            onPress={() => setStatusFilter("URGENT")}
          />
          <TextFilterButton
            label="Concluídas"
            active={statusFilter === "done"}
            onPress={() => setStatusFilter("done")}
          />
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
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
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                color: "#888",
                fontSize: 16,
              }}
            >
              Nenhuma tarefa encontrada
            </Text>
          )}
        />
      </ContainerList>

      <Footer />
    </MainContainer>
  );
}

const TextFilterButton = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Text
    onPress={onPress}
    style={{
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: active ? "#000" : "#eee",
      color: active ? "#fff" : "#000",
      fontWeight: "500",
      fontSize: 13,
      overflow: "hidden",
    }}
  >
    {label}
  </Text>
);
