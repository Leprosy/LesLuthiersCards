import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView, Text } from "react-native";
import { RootTabParamList } from "../types";
import { colors } from "../const/styles";
import { Section } from "../components/Section";
import { useContext } from "react";
// import { GameContext } from "../context/GameState/GameState";
import { ModalContext } from "../context/Modal";

export function HomeScreen({ navigation }: BottomTabScreenProps<RootTabParamList, "Inicio">): React.JSX.Element {
  // const { state, dispatch } = useContext(GameContext);
  const modal = useContext(ModalContext);

  const showCredits = () => {
    modal.setContent(<Text>-- Colocar créditos del juego acá --</Text>);
    modal.setModalVisible(true);
  };

  const startGame = () => {
    navigation.navigate("Juego");
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, colors["light"].app]}>
      <Section
        title="Juego de cartas de Les Luthiers"
        text="creado por MR"
      >
        <Text style={{ marginBottom: 20 }}>-- Colocar imagen y música acá --</Text>
        <Text style={{ fontSize: 20, fontWeight: 500 }} onPress={startGame}>Empezar juego</Text>
        <Text style={{ fontSize: 20, fontWeight: 500 }} onPress={showCredits}>Créditos</Text>
      </Section>
    </SafeAreaView>
  );
}
