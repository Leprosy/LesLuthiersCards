import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Alert, Button, Modal, Pressable, SafeAreaView, Text, View } from "react-native";
import { RootTabParamList } from "../types";
import { colors, styles } from "../const/styles";
import { Section } from "../components/Section";
import { Player } from "../lib/Player";
import { useContext, useEffect, useState } from "react";
import { Card } from "../lib/Card";
import { MiniCard } from "../components/MiniCard";
import { GameStateContext } from "../context/GameState";

export function HomeScreen({ navigation }: BottomTabScreenProps<RootTabParamList, "Home">): React.JSX.Element {
  const [players, setPlayers] = useState<Player[]>([]);
  const [turn, setTurn] = useState(0);
  const [canPress, setCanPress] = useState(true);
  const [selection, setSelection] = useState<Card[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const State = useContext(GameStateContext);

  const getHowManyPlayers = (num: number) => {
    const total = num + 1;
    return (total > 4 || total == 1) ? 2 : total;
  };

  const resetGame = () => {
    // Turn
    setTurn(0);

    // Players
    const total = getHowManyPlayers(players.length);
    const plays = [];

    for (let i = 0; i < total; ++i) {
      plays.push(new Player());
    }

    setPlayers(plays);
  };

  const playSelection = () => {
    const total = Card.getValidSong(selection);

    if (total == 0) {
      Alert.alert("Info", "Jugada no valida");
    } else {
      Alert.alert("Info", `Ganaste ${total} puntos`);
      setSelection([]);
    }

    console.log("playSelection", total);
  };

  const drawCard = () => {
    setCanPress(false);
    const card = Card.getRandomCard();
    players[turn].cards.push(card);

    setTimeout( () => {
      setTurn((turn + 1) % players.length);
      setSelection([]);
      setCanPress(true);
    }, 1000);
  };

  const getCardInfo = (card: Card) => {
    navigation.navigate("Card", { card });
  };

  const editSelection = (card: Card) => {
    if (selection.indexOf(card) < 0) {
      setSelection([...selection, card]);
    } else {
      const select = [...selection];
      select.splice(select.indexOf(card), 1);
      setSelection(select);
    }
  };

  const renamePlayer = (i: index) => {
    setModalVisible(true);
  };

  useEffect(() => {
    console.log("Players status", players);
  }, [players, turn]);

  return (
    <SafeAreaView style={[{ flex: 1 }, colors["light"].app]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("onRequestClose");
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.modalContainer}>
          <Text>Hello World!</Text>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>

      <Section
        title="Juego"
        text={"..."}
      >
        {players.map((p: Player, i: number) => <Text onPress={() => renamePlayer(i)} key={i}>{p.name}: {p.cards.length} cartas, {p.claps} aplausos. {i == turn ? "<<" : ""}</Text>)}
        <Button disabled={!canPress} title={`Comenzar con ${getHowManyPlayers(players.length)} jugadores`} onPress={resetGame}></Button>
        <Button disabled={!canPress || players.length < 2} title="Sacar carta" onPress={drawCard}></Button>
        <Button disabled={!canPress || players.length < 2 || selection.length < 2} title="Jugar seleccion" onPress={playSelection}></Button>
      </Section>

      {players.length > 1 ?
        <Section
          title={`Turno de ${players[turn].name}`}
          text={"..."}>

          {players[turn].cards.map((card: Card, i: number) =>
            <MiniCard
              key={i}
              card={card}
              index={i}
              elevated={false}
              total={players[turn].cards.length}
              selected={selection.indexOf(card) >= 0}
              onPress={() => selection.length > 0 ? editSelection(card) : getCardInfo(card)}
              onLongPress={() => editSelection(card)}
            />
          )}

        </Section>
        : null }
    </SafeAreaView>
  );
}
