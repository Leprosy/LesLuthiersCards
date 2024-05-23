import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Alert, Button, SafeAreaView, Text, TextInput, View } from "react-native";
import { RootTabParamList } from "../types";
import { Colors } from "../const/styles";
import { Player } from "../lib/Player";
import { useContext, useEffect, useState } from "react";
import { Card, cardType } from "../lib/Card/Card";
import { MiniCard } from "../components/MiniCard";
import { GameContext } from "../context/GameState/GameState";
import { ModalContext } from "../context/Modal";
import { BigCard } from "../components/BigCard";
import { GameStateActionType } from "../context/GameState/types";
import { TriviaDialog } from "../components/TriviaDialog";
import { SoundPlayer } from "../lib/Sound";
import { PlayButtons } from "../components/PlayButtons";

export function GameScreen({ navigation }: BottomTabScreenProps<RootTabParamList, "Juego">): React.JSX.Element {
  const [canDraw, setCanDraw] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const [cardId, setCardId] = useState(-1);
  const modal = useContext(ModalContext);


  const playSelection = () => {
    dispatch({ type: GameStateActionType.PlaySelection, call: (total: number) => {
      Alert.alert(total > 0 ? `¡Ganaste ${total} aplausos!` : "Jugada invalida");
    } });
  };

  const editSelection = (card: Card) => {
    dispatch({ type: GameStateActionType.EditSelection, data: { card } });
  };

  const drawCard = () => {
    setCanDraw(false);
    dispatch({ type: GameStateActionType.DrawCard, data: { cardId }, call: (card) => {
      if (card.type === cardType.Trivia) {
        modal.setContent(<TriviaDialog card={card} onAnswer={(value: boolean) => {
          if (value) {
            SoundPlayer.playSfx("clap");
            Alert.alert("¡Correcto!", `¡Has ganado ${card.claps} aplausos!`);
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

  const resetGame = () => {
    setCanDraw(true);
    dispatch({ type: GameStateActionType.ResetGame, data: {} });
  };

  useEffect(() => {
    SoundPlayer.playMusic(["bg0", "bg1", "bg2"], 0.1);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.generalBg }}>
      {/* Player scores */}
      {state.players.map((p: Player, i: number) =>
        <Text
          onPress={() => { modal.setModalVisible(true); }}
          key={i}>{p.name}: {p.cards.length} cartas, {p.claps} aplausos. {i == state.turn ? "<<" : ""}</Text>)}


      {/* Buttons */}
      <PlayButtons />

      <Button title={`Comenzar con ${state.getNextPlayers()} jugadores`} onPress={resetGame}></Button>

      {state.isGameActive() ? (canDraw
        ? <><Button title="Sacar carta" onPress={drawCard}></Button>
          <TextInput value={`${cardId}`} keyboardType={"decimal-pad"} style={{ fontSize: 10, display: "flex" }} onChange={(data) => setCardId(data.nativeEvent.text)} /></>
        : <Button title="Pasar turno" onPress={nextTurn}></Button>) : null}
      {state.isGameActive() ? <Button disabled={state.selection.length < 2} title="Jugar seleccion" onPress={playSelection}></Button> : null}


      {/* Play area */}
      {state.players.length > 1 ?
        <View>
          <Text>Turno de {state.currentPlayer?.name}</Text>
          {state.currentPlayer?.cards.map((card: Card, i: number) =>
            <MiniCard
              key={i}
              card={card}
              index={i}
              selected={state.selection.indexOf(card) >= 0}
              onPress={() => state.selection.length > 0 ? editSelection(card) : navigation.navigate("Cartas", { card }) }
              onLongPress={() => editSelection(card)}
            />
          )}
        </View>

        : null }
    </SafeAreaView>
  );
}
