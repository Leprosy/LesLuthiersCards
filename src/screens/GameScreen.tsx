import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView, Text, View } from "react-native";
import { RootTabParamList } from "../types";
import { Colors, gameStyles } from "../const/styles";
import { Player } from "../lib/Player";
import { useContext, useEffect } from "react";
import { Card } from "../lib/Card/Card";
import { MiniCard } from "../components/MiniCard";
import { GameContext } from "../context/GameState/GameState";
import { ModalContext } from "../context/Modal";
import { GameStateActionType } from "../context/GameState/types";
import { SoundPlayer } from "../lib/Sound";
import { PlayButtons } from "../components/PlayButtons";

export function GameScreen({ navigation }: BottomTabScreenProps<RootTabParamList, "Juego">): React.JSX.Element {
  const { state, dispatch } = useContext(GameContext);
  const modal = useContext(ModalContext);



  // Functions
  const editSelection = (card: Card) => {
    dispatch({ type: GameStateActionType.EditSelection, data: { card } });
  };

  useEffect(() => {
    SoundPlayer.playMusic(["bg0", "bg1", "bg2"], 0.2);
  }, []);



  // Element
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.generalBg }}>
      {/* Player scores */}
      <View style={{ flex: 1, backgroundColor: Colors.middleBg }}>
        <Text style={[gameStyles.normalText, gameStyles.invertedText, gameStyles.textBold, gameStyles.textCenter, { marginBottom: 1 }]}>Marcador</Text>
        {state.players.map((p: Player, i: number) =>
          <Text
            style={[gameStyles.normalText, gameStyles.invertedText, gameStyles.textCenter, { marginBottom: 1 }]}
            onPress={() => { modal.setModalVisible(true); }}
            key={i}>
            {i == state.turn ? "*" : ""} {p.name}: {p.cards.length} cartas, {p.claps} aplausos. {i == state.turn ? "*" : ""}
          </Text>)}
      </View>


      {/* Play area */}
      <View style={{ flex: 4, backgroundColor: "#030" }}>
        {state.players.length > 1
          ? <Text style={[gameStyles.title, gameStyles.invertedText, gameStyles.textCenter]}>Turno de {state.currentPlayer?.name}</Text>
          : null}

        {state.players.length > 1 ?
          <View style={{ marginTop: 20 }}>
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
      </View>


      {/* Buttons */}
      <View style={{ flex: 1, backgroundColor: "#fee" }}>
        <PlayButtons />
      </View>

    </SafeAreaView>
  );
}
