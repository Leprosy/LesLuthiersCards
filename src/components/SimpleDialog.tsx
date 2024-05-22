import { useContext, useState } from "react";
import { ModalContext } from "../context/Modal";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type SimpleDialogProps = {
  title: string,
  text: string;
  callback: (data: any) => void;
}

export function SimpleDialog({ title, text, callback }: SimpleDialogProps): React.JSX.Element {
  const { setModalVisible } = useContext(ModalContext);
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <TextInput style={styles.input} value={value} onChange={(data) => setValue(data.nativeEvent.text)}/>
      <Button title="Ok" onPress={() => {
        callback(value);
        setModalVisible(false);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200
  },

  title: {
    fontSize: 20,
    fontWeight: "600"
  },

  text: {
    fontSize: 16
  },

  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5
  }
});