/**
 * Les Luthiers Cards App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "./src/types";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CardScreen } from "./src/screens/CardScreen";
import { GameStateProvider } from "./src/context/GameState/GameState";
import { ModalProvider } from "./src/context/Modal";
import { GameScreen } from "./src/screens/GameScreen";
import { SoundPlayer } from "./src/lib/Sound";
import { gameStyles } from "./src/const/styles";

function LogoTitle(): React.JSX.Element {
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 50 }}>
      <Image
        style={{ width: 30, height: 30 }}
        source={require("./res/img/ui/corbata.png")} />
      <Text style={gameStyles.title}>Les Luthiers</Text>
      <Image
        style={{ width: 30, height: 30 }}
        source={require("./res/img/ui/corbata.png")} />
    </View>
  );
}


function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  useEffect(() => {
    SoundPlayer.playMusic(["start"], 0.5);
  }, []);

  return (
    <ModalProvider>
      <GameStateProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Inicio" screenOptions={{ headerTitle: () => <LogoTitle /> }}>
            <Tab.Screen name="Inicio" component={HomeScreen} options={{ tabBarIcon: () => <Text>@</Text> }} />
            <Tab.Screen name="Juego" component={GameScreen} options={{ tabBarIcon: () => <Text>$</Text> }} />
            <Tab.Screen name="Cartas" component={CardScreen} options={{ tabBarIcon: (props) => <Text style={{ color: props.color }}>%</Text> }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </GameStateProvider>
    </ModalProvider>

  );
}

export default App;
