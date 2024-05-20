import { ImageSourcePropType } from "react-native";
import { Card } from "./lib/Card/Card";

export type RootTabParamList = {
  Home: undefined;
  Card: { card: Card };
};

export type imageAsset = {
  path: string,
  res: ImageSourcePropType
}