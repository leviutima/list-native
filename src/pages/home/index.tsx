import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Header } from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { ContainerList, MainContainer } from "./styles";
import CardTodo from "../../components/card-todo/cardTodo";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getTasksByUser } from "../../service/task/get-unique-task";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "PENDING" | "URGENT" | true
  >("all");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: tasks = [] } = useQuery({
    queryKey: ["task", user?.id],
    queryFn: () => getTasksByUser(user.id),
    enabled: Boolean(user?.id),
  });

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task: any) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((task: any) => {
        if (statusFilter === "all") return true;
        if (statusFilter === "PENDING") return task.status === "PENDING";
        if (statusFilter === "URGENT") return task.status === "URGENT";
        if (statusFilter === true) return task.finished === true;
        return true;
      });
  }, [tasks, search, statusFilter]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <CardTodo
        title={item.title}
        description={item.description}
        status={item.status}
        subtasks={item.subtasks?.map((s: any) => ({
          title: s.title,
          done: s.finished,
        }))}
        id={item.id}
        key={item.id}
        finished={item.finished}
      />
    ),
    []
  );

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

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
            active={statusFilter === true}
            onPress={() => setStatusFilter(true)}
          />
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
          ListEmptyComponent={() => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 200,
              }}
            >
              <Ionicons name="search" size={80} color="white" />
              <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                Sem resultados para a sua pesquisa
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                Nenhuma tarefa encontrada
              </Text>
            </View>
          )}
        />
      </ContainerList>

      <Footer />
    </MainContainer>
  );
}

import ReactMemo from "react";
const TextFilterButton = ReactMemo.memo(
  ({
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
  )
);
