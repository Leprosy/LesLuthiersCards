import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Alert, Button, SafeAreaView, Text, TextInput, View } from "react-native";
import { RootTabParamList } from "../types";
import { colors } from "../const/styles";
import { Section } from "../components/Section";
import { Player } from "../lib/Player";
import { useContext, useState } from "react";
import { Card } from "../lib/Card/Card";
import { MiniCard } from "../components/MiniCard";
import { GameContext } from "../context/GameState/GameState";
import { ModalContext } from "../context/Modal";
import { BigCard } from "../components/BigCard";
import { GameStateActionType } from "../context/GameState/types";

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
      console.log("drawCard: dispatch returned this", card);
      modal.setContent(<BigCard card={card} />);
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

  return (
    <SafeAreaView style={[{ flex: 1 }, colors["light"].app]}>
      <Section
        title="Juego"
        text={""}
      >
        {state.players.map((p: Player, i: number) =>
          <Text
            onPress={() => modal.setModalVisible(true)}
            key={i}>{p.name}: {p.cards.length} cartas, {p.claps} aplausos. {i == state.turn ? "<<" : ""}</Text>)}
        <Button title={`Comenzar con ${state.getNextPlayers()} jugadores`} onPress={resetGame}></Button>

        {state.isGameActive() ? (canDraw
          ? <><Button title="Sacar carta" onPress={drawCard}></Button>
            <TextInput value={`${cardId}`} keyboardType={"decimal-pad"} style={{ fontSize: 10 }} onChange={(data) => setCardId(data.nativeEvent.text)} /></>
          : <Button title="Pasar turno" onPress={nextTurn}></Button>) : null}

        {state.isGameActive() ? <Button disabled={state.selection.length < 2} title="Jugar seleccion" onPress={playSelection}></Button> : null}
      </Section>

      {state.players.length > 1 ?
        <Section
          title={`Turno de ${state.currentPlayer?.name}`}
          text={"..."}>

          <View>
            {state.currentPlayer?.cards.map((card: Card, i: number) =>
              <MiniCard
                key={i}
                card={card}
                index={i}
                selected={state.selection.indexOf(card) >= 0}
                onPress={() => state.selection.length > 0 ? editSelection(card) : navigation.navigate("Card", { card }) }
                onLongPress={() => editSelection(card)}
              />
            )}
          </View>

        </Section>
        : null }
    </SafeAreaView>
  );
}
