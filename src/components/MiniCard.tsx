import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Card } from "../lib/Card";
import { imageStore } from "../lib/images";

type MiniCardProps = {
  card: Card;
  index: number,
  selected?: boolean,
  onPress?: () => void,
  onLongPress?: () => void,
};

const rowItems = 5;
const horSpace = 55;
const rowSpace = 50;

const getRot = () => Math.round(Math.random() * 10) - 5;

const getPos = (i: number) => {
  const left = (i % rowItems) * horSpace;
  const top = Math.floor(i / rowItems) * rowSpace;
  return { left, top };
};

const getSize = (str: string) => {
  return { fontSize: str.length > 10 ? 13 : 15 };
};

export function MiniCard({ card, index, selected, onPress, onLongPress }: MiniCardProps): React.JSX.Element {
  const [elevated, setElevated] = useState(false);

  return (
    <Pressable style={[
      styles.container,
      selected ? styles.selected : null,
      { transform: [{ rotate: `${getRot()}deg` }] },
      elevated ? { elevation: 50, transform: [{ scale: 1.2 }] } : null,
      getPos(index)
    ]}
    onPressIn={() => setElevated(true)}
    onPressOut={() => setElevated(false)}
    onPress={() => (onPress || (() => {})) ()}
    onLongPress={() => (onLongPress || (() => {})) ()}>
      <Text style={[styles.title, getSize(card.slug)]}>{card.slug}</Text>
      <Image style={styles.image} source={imageStore[card.id].res}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "35%",
    padding: 5,
    backgroundColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 2,
  },
  selected: {
    borderColor: "#f00",
  },
  title: {
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: 120
  }
});