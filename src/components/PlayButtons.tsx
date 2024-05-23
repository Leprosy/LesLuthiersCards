import React, { PropsWithChildren } from "react";
import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Colors } from "../const/styles";

type PlayButtonsProps = PropsWithChildren<{
  title?: string
}>;

export function PlayButtons({ title }: PlayButtonsProps): React.JSX.Element {

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => console.log(1)} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Comenzar con 2 jugadores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log(1)} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Sacar una Carta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log(1)} activeOpacity={0.8} disabled={true}>
          <Text style={styles.buttonText}>Jugar Seleccion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.button}>
          <Button title="Oaw1"  />
        </View>
        <View style={styles.button}>
          <Button title="Oaw1"  />
        </View>
        <View style={styles.button}>
          <Button title="Oaw1"  />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#000",
    borderWidth: 2,
    backgroundColor: "#ccf"
  },

  button: {
    padding: 10,
    flex: 1,
    backgroundColor: "#33f"
  },

  buttonText: {
    color: Colors.buttonTextColor,
    fontWeight: "700",
    textAlign: "center",
  }

});