import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

export const MainContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const ContainerList = styled.View`
  flex: 1;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px 30px 0px 0px;
  background-color: #878af6;
  position: relative;
  bottom: 0px;
  padding: 0px 25px 0px 25px;
`;

export const style = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
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
    gap: 8,
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
});