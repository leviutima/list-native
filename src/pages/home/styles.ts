import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

export const MainContainer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.background,
})); 

export const style = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flex: 1
    },
    taskCard: {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 8,
  marginBottom: 12,
  elevation: 2, // sombra android
  shadowColor: "#000", // sombra ios
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
},

taskTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 6,
},

taskDescription: {
  fontSize: 14,
  color: "#444",
  marginBottom: 8,
},

flagsContainer: {
  flexDirection: "row",
  gap: 8, // no RN pode usar marginRight para espaçamento
},

flag: {
  color: "white",
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 4,
  fontSize: 12,
  fontWeight: "bold",
  marginRight: 6,
},
})