import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card } from "../lib/Card";
import { imageStore } from "../lib/images";

type MiniCardProps = {
  card: Card;
  index: number,
  selected?: boolean,
  elevated?: boolean,
  onPress?: () => void,
  onLongPress?: () => void,
};

const rowItems = 6;
const horSpace = 50;
const rowSpace = 50;

const getRot = () => Math.round(Math.random() * 10) - 5;

const getPos = (i: number) => {
  const left = (i % rowItems) * horSpace;
  const top = Math.floor(i / rowItems) * rowSpace;
  return { left, top };
};

export function MiniCard({ card, index, selected, elevated, onPress, onLongPress }: MiniCardProps): React.JSX.Element {
  return (
    <TouchableOpacity style={[
      styles.container,
      selected ? styles.selected : null,
      { transform: [{ rotate: `${getRot()}deg` }] },
      elevated ? { elevation: 50, transform: [{ scale: 1.2 }] } : null,
      getPos(index)
    ]}
    activeOpacity={0.8}
    onPress={() => (onPress || (() => {})) ()}
    onLongPress={() => (onLongPress || (() => {})) ()}>
      <Text style={styles.title}>{card.slug}</Text>
      <Image style={styles.image} source={imageStore[card.id].res}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "25%",
    padding: 5,
    left: 10,
    backgroundColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 2,
  },
  selected: {
    borderColor: "#f00",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: 80
  }
});