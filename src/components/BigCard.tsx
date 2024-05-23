import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "../lib/Card/Card";
import { imageStore } from "../lib/images";
import { Colors, gameStyles } from "../const/styles";

type BigCardProps = {
  card: Card;
};


export function BigCard({ card }: BigCardProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={[gameStyles.title, gameStyles.textCenter]}>{card.name}</Text>
      <Image style={styles.image} source={imageStore[card.id].res}/>
      <Text style={[gameStyles.normalText, gameStyles.textCenter]}>{card.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    padding: 5,
    backgroundColor: Colors.generalBg,
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 2,
    margin: "auto"
  },

  image: {
    alignSelf: "center",
    width: 200,
    height: 300,
    marginVertical: 10
  }
});