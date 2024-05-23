import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { RootTabParamList } from "../types";
import { useContext } from "react";
import { ModalContext } from "../context/Modal";
import { Colors } from "../const/styles";

export function HomeScreen({ navigation }: BottomTabScreenProps<RootTabParamList, "Inicio">): React.JSX.Element {
  const modal = useContext(ModalContext);

  const showCredits = () => {
    modal.setContent(<Text>-- Colocar créditos del juego acá --</Text>);
    //modal.setContent(<SimpleDialog title="Dialog" text="Enter a value" callback={(data) => { Alert.alert("Value returned", `Value is ${data}`); }} />);
    modal.setModalVisible(true);
  };

  const startGame = () => {
    navigation.navigate("Juego");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.generalBg }}>
      <Image style={styles.image} source={require("../../res/img/splash/splash0.png")} />
      <Text style={styles.option} onPress={startGame}>Empezar juego</Text>
      <Text style={styles.option} onPress={showCredits}>Créditos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    borderWidth: 5,
    borderColor: "#000",
    marginHorizontal: "auto",
    marginVertical: 50
  },

  option: {
    color: Colors.titleColor,
    //fontFamily: "serif",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center"
  }
});
