import { ImageSourcePropType } from "react-native";
import { Card } from "./lib/Card/Card";

export type RootTabParamList = {
  Inicio: undefined;
  Juego: undefined;
  Cartas: { card: Card };
};

export type imageAsset = {
  path: string,
  res: ImageSourcePropType
}