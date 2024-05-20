import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "../lib/Card/Card";
import { imageStore } from "../lib/images";

type BigCardProps = {
  card: Card;
};


export function BigCard({ card }: BigCardProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{card.name}</Text>
      <Image style={styles.image} source={imageStore[card.id].res}/>
      <Text>{card.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    padding: 5,
    backgroundColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 2,
    margin: "auto"
  },
  selected: {
    borderColor: "#f00",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 300
  }
});