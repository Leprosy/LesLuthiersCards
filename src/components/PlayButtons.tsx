import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RegularButton } from "./RegularButton";
import { GameContext } from "../context/GameState/GameState";
import { GameStateActionType } from "../context/GameState/types";
import { Card, cardType } from "../lib/Card/Card";
import { TriviaDialog } from "./TriviaDialog";
import { ModalContext } from "../context/Modal";
import { SoundPlayer } from "../lib/Sound";
import { BigCard } from "./BigCard";
import { getRndString } from "../lib/utils";
import { PickCardDialog } from "./PickCardDialog";
import { Alert } from "./Alert";

export function PlayButtons(): React.JSX.Element {
  const [canDraw, setCanDraw] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const modal = useContext(ModalContext);



  // Functions
  const wrongAnswer = () => {
    SoundPlayer.playSfx(getRndString("boo", 6));
    modal.show(<Alert title="Cuec" text="Respuesta incorrecta" />);
  };

  const pickAndShow = (card: Card) => {
    console.log("PlayButton: card picked", card);
    dispatch({ type: GameStateActionType.DrawCard, data: { card } });
    modal.show(<BigCard card={card} />);
  };

  const triviaDialog = (card: Card) => {
    modal.show(<TriviaDialog card={card} onAnswer={(value: boolean) => {
      if (value) {
        SoundPlayer.playSfx(getRndString("claps", 6));
        modal.show(<Alert title="¡Correcto!" text={`¡Has ganado ${card.claps} aplausos!`} />);
        dispatch({ type: GameStateActionType.AddClapsToCurrentPlayer, data: { claps: card.claps } });
      } else {
        wrongAnswer();
      }
    }} />, wrongAnswer);
  };

  const resetGame = () => {
    SoundPlayer.playSfx("shuffle");
    setCanDraw(true);
    dispatch({ type: GameStateActionType.ResetGame, data: {} });
  };

  const drawCard = () => {
    setCanDraw(false);
    SoundPlayer.playSfx(getRndString("card", 3));
    const cards = Card.getRandomCards(state.currentPlayer!, state.players);
    console.log("PlayButton: cardset", cards);

    if (cards.length === 1) {
      if (cards[0].type === cardType.Trivia) {
        triviaDialog(cards[0]);
      } else {
        dispatch({ type: GameStateActionType.ApplyEffect, data: { card: cards[0] } });
        modal.show(<BigCard card={cards[0]} />);
      }
    } else {
      modal.show(<PickCardDialog cards={cards} onAnswer={(card: Card) => {
        pickAndShow(card);
      }} />, () => pickAndShow(cards[0]));
    }
  };

  const nextTurn = () => {
    setCanDraw(true);
    dispatch({ type: GameStateActionType.NextTurn });
  };

  const playSelection = () => {
    dispatch({ type: GameStateActionType.PlaySelection, call: (total: number) => {
      if (total > 0) {
        SoundPlayer.playSfx(getRndString("claps", 6));
        modal.show(<Alert title="Excelente" text={`¡Ganaste ${total} aplausos!`} />);
      } else {
        SoundPlayer.playSfx(getRndString("boo", 6));
        modal.show(<Alert title="Pésimo" text="Jugada invalida" />);
      }
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
        disabled={state.selection.length < 2}
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
