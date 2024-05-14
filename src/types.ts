import { ImageSourcePropType } from "react-native";
import { Card } from "./lib/Card";
import { Player } from "./lib/Player";

export type RootTabParamList = {
  Home: undefined;
  Card: { card: Card };
};

export type imageAsset = {
  path: string,
  res: ImageSourcePropType
}

export type GameState = {
  players: Player[],
  setPlayers: (players: Player[]) => void,
  turn: number,
  setTurn: (i: number) => void
}