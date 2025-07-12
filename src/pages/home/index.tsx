import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { Header } from "../../components/header/header";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/footer/Footer";
import { ContainerList, MainContainer, style } from "./styles";
import { TaskContext } from "../../context/task-context";

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
            <View style={style.taskCard}>
              <Text style={style.taskTitle}>{item.title}</Text>
              <Text style={style.taskDescription}>{item.description}</Text>
              <View style={style.flagsContainer}>
                {item.urgent && (
                  <Text style={[style.flag, { backgroundColor: "#f44336" }]}>
                    Urgente
                  </Text>
                )}
                {item.pending && (
                  <Text style={[style.flag, { backgroundColor: "#ff9800" }]}>
                    Pendente
                  </Text>
                )}
                {item.optional && (
                  <Text style={[style.flag, { backgroundColor: "#2196f3" }]}>
                    Opcional
                  </Text>
                )}
              </View>
            </View>
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
