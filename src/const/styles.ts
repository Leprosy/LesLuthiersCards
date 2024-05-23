import { StyleSheet } from "react-native";

export const Colors = {
  generalBg: "#ccc",
  textColor: "#000",
  titleColor: "#333",
  buttonTextColor: "#fff"
};

export const gameStyles = StyleSheet.create({
  textCenter: {
    textAlign: "center"
  },

  textBold: {
    fontWeight: "700"
  },

  normalText: {
    color: Colors.textColor,
    fontSize: 14
  },

  title: {
    color: Colors.titleColor,
    fontWeight: "500",
    fontSize: 20
  },

  subtitle: {
    color: Colors.titleColor,
    fontWeight: "500",
    fontSize: 18
  }
});