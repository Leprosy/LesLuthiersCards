import { useContext } from "react";
import { ModalContext } from "../context/Modal";
import { Button, StyleSheet, Text, View } from "react-native";
import { shuffleArray } from "../lib/utils";
import { Card } from "../lib/Card/Card";

type TriviaDialogProps = {
  card: Card;
  onAnswer: (value: boolean) => void;
}

export function TriviaDialog({ card, onAnswer }: TriviaDialogProps): React.JSX.Element {
  const { setModalVisible } = useContext(ModalContext);
  const options: string[] = [];
  let answer = "";

  card.tags.forEach((item: string, i: number) => {
    if (i > 0) {
      options.push(item);
    } else {
      answer = item;
    }
  });

  console.log("REady", { tags: card.tags, options, answer });

  const optsElement = options.map((item: string, i: number) => <Button key={i} title={item} onPress={() => { onAnswer(false); setModalVisible(false); }} />);
  optsElement.push(<Button key={666} title={answer} onPress={() => { onAnswer(true); setModalVisible(false); }} />);
  shuffleArray(optsElement);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trivia</Text>
      <Text style={styles.text}>{card.text}</Text>
      {optsElement}
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
