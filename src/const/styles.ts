import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionContainer: {
    margin: 10,
    padding: 20,
  },

  regularContainer: {
    margin: 10,
  },

  title: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: "600",
  },

  bold: {
    fontWeight: "700",
  },

  modalContainer: {
    margin: 20,
    backgroundColor: "#ccc",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 20,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    elevation: 2,
  },
});

export const colors = {
  dark: StyleSheet.create({
    app: {
      backgroundColor: "#000",
    },
    container: {
      backgroundColor: "#222",
    },
    text: {
      color: "#fff",
    },
  }),

  light: StyleSheet.create({
    app: {
      backgroundColor: "#ddd",
    },
    container: {
      backgroundColor: "#fff",
    },
    text: {
      color: "#000",
    },
  }),
};
