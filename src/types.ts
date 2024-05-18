import { ImageSourcePropType } from "react-native";
import { Card } from "./lib/Card";
import { Player } from "./lib/Player";

/**
 * State management
 */
export type GameState = {
  players: Player[],
  turn: number,
  selection: Card[],
  currentPlayer?: Player,
  getNextPlayers: () => number
  isGameActive: () => boolean
}

export type GameContextState = {
  state: GameState,
  dispatch: React.Dispatch<GameStateAction>
}

export enum GameStateActionType {
  NextTurn,
  ResetGame,
  DrawCard,
  EditSelection,
  PlaySelection
}

export type GameStateAction = {
  type: GameStateActionType,
  data?: any,
  call?: (data: any) => void
}



/**
 * Misc
 */
export type RootTabParamList = {
  Home: undefined;
  Card: { card: Card };
};

export type imageAsset = {
  path: string,
  res: ImageSourcePropType
}