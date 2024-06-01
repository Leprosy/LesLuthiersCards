import { Card } from "../../lib/Card/Card";
import { Player } from "../../lib/Player";

export type GameState = {
  players: Player[],
  turn: number,
  selection: Card[],
  currentPlayer?: Player,
  currentElevated: number,
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
  PlaySelection,
  SetElevated,
  AddClapsToCurrentPlayer,
  ApplyEffect,
}

export type GameStateAction = {
  type: GameStateActionType,
  data?: any,
  call?: (data: any) => void
}