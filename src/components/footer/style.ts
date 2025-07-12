import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const FooterContainer = styled.View`
  height: 60px;
  background-color: #878AF6;
`

export const style = StyleSheet.create({
  footerContainer: {
    padding: 16,
    backgroundColor: "#878AF6",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
  },

  buttonCreateTask: {
    width: 65,
    height: 65,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -30,
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 20,
  },

  plusText: {
    fontSize: 30,
    color: '#878AF6'
  }
});
