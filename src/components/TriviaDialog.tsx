import { useContext } from "react";
import { ModalContext } from "../context/Modal";
import { StyleSheet, Text, View } from "react-native";
import { shuffleArray } from "../lib/utils";
import { Card } from "../lib/Card/Card";
import { gameStyles } from "../const/styles";
import { RegularButton } from "./RegularButton";

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

  const optsElement = options.map((item: string, i: number) => <RegularButton key={i} title={item} onPress={() => { onAnswer(false); setModalVisible(false); }} />);
  optsElement.push(<RegularButton key={666} title={answer} onPress={() => { onAnswer(true); setModalVisible(false); }} />);
  shuffleArray(optsElement);

  return (
    <View style={styles.container}>
      <Text style={[gameStyles.title, gameStyles.textCenter]}>Hora de Trivia</Text>
      <Text style={[gameStyles.normalText, gameStyles.textCenter]}>{card.text}</Text>
      {optsElement}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300
  },
});
