import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import { Card } from "../lib/Card/Card";
import { imageStore } from "../lib/images";
import { Colors } from "../const/styles";

type MiniCardProps = {
  card: Card;
  index: number,
  selected?: boolean,
  onPress?: () => void,
  onLongPress?: () => void,
};

const rowItems = 5;

const getRot = () => Math.round(Math.random() * 10) - 5;

const getSize = (str: string) => {
  return { fontSize: str.length > 10 ? 13 : 15 };
};

export function MiniCard({ card, index, selected, onPress, onLongPress }: MiniCardProps): React.JSX.Element {
  const [elevated, setElevated] = useState(false);
  const { height, width } = useWindowDimensions();

  const getPos = (i: number) => {
    const horSpace = width / 6;
    const rowSpace = height / 10;
    const left = (i % rowItems) * horSpace;
    const top = Math.floor(i / rowItems) * rowSpace;
    return { left, top, transform: [{ rotate: `${getRot()}deg` }], width: width / 3, height: height / 4 };
  };

  return (
    <Pressable style={[
      styles.container,
      selected ? styles.selected : null,
      { transform: [{ rotate: `${getRot()}deg` }] },
      elevated ? { elevation: 50, transform: [{ scale: 1.2 }] } : null,
      getPos(index),
    ]}
    onPressIn={() => setElevated(true)}
    onPressOut={() => setElevated(false)}
    onPress={() => (onPress || (() => {})) ()}
    onLongPress={() => (onLongPress || (() => {})) ()}>
      <Text style={[styles.title, getSize(card.slug)]}>{card.slug}</Text>
      <Image style={[styles.image]} source={imageStore[card.id].res}/>
      <Text style={[styles.title, { fontSize: 13 }]}>{card.claps}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
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
    color: Colors.textColor,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: "75%"
  }
});