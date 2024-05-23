import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { RegularButton } from "./RegularButton";
import { GameContext } from "../context/GameState/GameState";
import { GameStateActionType } from "../context/GameState/types";
import { cardType } from "../lib/Card/Card";
import { TriviaDialog } from "./TriviaDialog";
import { ModalContext } from "../context/Modal";
import { SoundPlayer } from "../lib/Sound";
import { BigCard } from "./BigCard";

export function PlayButtons(): React.JSX.Element {
  const [canDraw, setCanDraw] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const modal = useContext(ModalContext);



  // Functions
  const resetGame = () => {
    setCanDraw(true);
    dispatch({ type: GameStateActionType.ResetGame, data: {} });
  };

  const drawCard = () => {
    setCanDraw(false);
    dispatch({ type: GameStateActionType.DrawCard, call: (card) => {
      if (card.type === cardType.Trivia) {
        modal.setContent(<TriviaDialog card={card} onAnswer={(value: boolean) => { // TODO: Can we refactor this in a function?
          if (value) {
            SoundPlayer.playSfx("clap");
            Alert.alert("¡Correcto!", `¡Has ganado ${card.claps} aplausos!`); // TODO: Replace Alerts for Modals
            dispatch({ type: GameStateActionType.AddClapsToCurrentPlayer, data: { claps: card.claps } });
          } else {
            SoundPlayer.playSfx("boo");
            Alert.alert("Cuec", "Respuesta incorrecta");
          }
        }} />);
      } else {
        modal.setContent(<BigCard card={card} />);
      }

      modal.setModalVisible(true);
    } });
  };

  const nextTurn = () => {
    setCanDraw(true);
    dispatch({ type: GameStateActionType.NextTurn });
  };

  const playSelection = () => {
    dispatch({ type: GameStateActionType.PlaySelection, call: (total: number) => {
      Alert.alert(total > 0 ? `¡Ganaste ${total} aplausos!` : "Jugada invalida");
    } });
  };


  // Element
  return (
    <View style={styles.container}>
      <RegularButton
        style={{ flex: 1 }}
        title={`Comenzar con ${state.getNextPlayers()} jugadores`}
        onPress={resetGame} />

      {state.isGameActive()
        ? (canDraw
          ? <RegularButton style={{ flex: 1, fontSize: 22 }} title="Sacar Carta" onPress={drawCard} />
          : <RegularButton style={{ flex: 1 }} title="Pasar Turno" onPress={nextTurn} />)

        : <RegularButton style={{ flex: 1 }} title="Sacar Carta" disabled={true} />
      }

      <RegularButton
        disabled={state.selection.length < 2} // TODO: A method to check selection is playable?
        style={{ flex: 1 }}
        title="Jugar Selección"
        onPress={playSelection} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#000",
    backgroundColor: "#fff",
  },
});