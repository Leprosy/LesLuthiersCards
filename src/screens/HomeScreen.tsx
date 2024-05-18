import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Alert, Button, SafeAreaView, Text, View } from "react-native";
import { GameStateActionType, RootTabParamList } from "../types";
import { colors } from "../const/styles";
import { Section } from "../components/Section";
import { Player } from "../lib/Player";
import { useContext, useState } from "react";
import { Card } from "../lib/Card";
import { MiniCard } from "../components/MiniCard";
import { GameContext } from "../context/GameState";

export function HomeScreen({ navigation }: BottomTabScreenProps<RootTabParamList, "Home">): React.JSX.Element {
  const [canDraw, setCanDraw] = useState(false);
  const { state, dispatch } = useContext(GameContext);


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
    dispatch({ type: GameStateActionType.DrawCard, call: (data) => {
      console.log("drawCard: dispatch returned this", data);
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
          <Text key={i}>{p.name}: {p.cards.length} cartas, {p.claps} aplausos. {i == state.turn ? "<<" : ""}</Text>)}
        <Button title={`Comenzar con ${state.getNextPlayers()} jugadores`} onPress={resetGame}></Button>

        {state.isGameActive() ? (canDraw
          ? <Button title="Sacar carta" onPress={drawCard}></Button>
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
                elevated={false}
                selected={state.selection.indexOf(card) >= 0}
                onPress={() => state.selection.length > 0 ? editSelection(card) : navigation.navigate("Card", { card })}
                onLongPress={() => editSelection(card)}
              />
            )}
          </View>

        </Section>
        : null }
    </SafeAreaView>
  );
}
