import { StyleSheet } from "react-native";

export const Colors = {
  generalBg: "#ccc",
  textColor: "#000",
  titleColor: "#333",
  buttonTextColor: "#fff",
  middleBg: "#300",
  secondBg: "#000",
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
    fontSize: 14,
    marginBottom: 10,
  },

  invertedText: {
    color: Colors.buttonTextColor,
  },

  title: {
    color: Colors.titleColor,
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 10,
  },

  subtitle: {
    color: Colors.titleColor,
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 10,
  }
});