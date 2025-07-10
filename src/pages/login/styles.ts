import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
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

  boxButton: {
    backgroundColor: '#878AF6',
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 40
  },

  textButton: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  }
});
