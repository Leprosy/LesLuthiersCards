/**
 * Les Luthiers Cards App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { Image, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "./src/types";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CardScreen } from "./src/screens/CardScreen";
import { GameStateProvider } from "./src/context/GameState";
import { ModalProvider } from "./src/context/Modal";

function LogoTitle(): React.JSX.Element {
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 50 }}>
      <Image
        style={{ width: 30, height: 30 }}
        source={require("./res/img/ui/corbata.png")} />
      <Text style={{ fontSize: 20, fontWeight: 600, paddingHorizontal: 10 }}>Les Luthiers</Text>
      <Image
        style={{ width: 30, height: 30 }}
        source={require("./res/img/ui/corbata.png")} />
    </View>
  );
}


function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <GameStateProvider>
      <ModalProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home" screenOptions={{ headerTitle: () => <LogoTitle /> }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Text>@</Text> }} />
            <Tab.Screen name="Card" component={CardScreen} options={{ tabBarIcon: (props) => <Text style={{ color: props.color }}>%</Text> }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </GameStateProvider>
  );
}

export default App;
