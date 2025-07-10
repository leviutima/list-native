import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },

  title: {
    fontSize: 60,
    fontWeight: '900',
    color: '#878AF6'
  },

  firtsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  messageTitle: {
    fontSize: 30,
    fontWeight: "700",
  },

  containerForm: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  titleInput: {
    color: "#808080",
  },


  forgotPasswordText: {
    fontSize: 10,
    color: '#808080'
  }

});
