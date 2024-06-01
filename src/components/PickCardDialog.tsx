import { useContext } from "react";
import { ModalContext } from "../context/Modal";
import { Text, View, useWindowDimensions } from "react-native";
import { Card } from "../lib/Card/Card";
import { gameStyles } from "../const/styles";
import { MiniCard } from "./MiniCard";

type PickCardDialogProps = {
  cards: Card[];
  onAnswer: (card: Card) => void;
}

export function PickCardDialog({ cards, onAnswer }: PickCardDialogProps): React.JSX.Element {
  const { setModalVisible } = useContext(ModalContext);
  const { height, width } = useWindowDimensions();

  return (
    <View style={{ width: width * 0.7, height: height * 0.35 }}>
      <Text style={[gameStyles.title, gameStyles.textCenter]}>Escoja una carta</Text>
      <View style={{ marginTop: 10 }}>
        { cards.map((card: Card, i: number) => (
          <MiniCard card={card} index={i} key={i} onPress={() => {
            onAnswer(card);
            setModalVisible(false);
          }} />
        ))}

      </View>
    </View>
  );
}
