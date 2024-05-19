import React, { PropsWithChildren, createContext, useReducer } from "react";
import { GameContextState, GameState, GameStateAction, GameStateActionType } from "../types";
import { Player } from "../lib/Player";
import { Card } from "../lib/Card";

export const GameContext = createContext<GameContextState>({} as GameContextState);

export function GameStateProvider({ children }: PropsWithChildren) {
  const MAX_PLAYERS = 4;

  const initialState: GameState = {
    players: [],
    turn: 0,
    currentElevated: -1,
    selection: [],

    // TODO: State methods - better way to implement this?
    getNextPlayers: function() {
      let total = state.players.length + 1;
      if (total > MAX_PLAYERS || total == 1) total = 2;
      return total;
    },

    isGameActive: function() {
      return this.players.length > 1; // TODO: game rules can change this in the future
    },
  };

  const reducer = (state: GameState, action: GameStateAction): GameState => {
    switch (action.type) {
      case GameStateActionType.NextTurn:
        if (state.turn == state.players.length - 1) {
          return { ...state, turn: 0, currentPlayer: state.players[0], selection: [] };
        } else {
          return { ...state, turn: state.turn + 1, currentPlayer: state.players[state.turn + 1], selection: [] };
        }

      case GameStateActionType.DrawCard: { // TODO not pure?
        const card = Card.getRandomCard();
        state.currentPlayer?.cards.push(card);

        if (action.call) {
          action.call(card);
        }

        return { ...state };
      }

      case GameStateActionType.ResetGame: {
        state.turn = 0;
        const players = [];
        const total = state.getNextPlayers();

        for (let i = 0; i < total; ++i) {
          players.push(new Player());
        }

        return { ...initialState, players, currentPlayer: players[0] };
      }

      case GameStateActionType.EditSelection: {
        const card = action.data.card as Card;
        let selection: Card[] = [];

        if (state.selection.indexOf(card) < 0) {
          selection = [...state.selection, card];
        } else {
          selection = [...state.selection];
          selection.splice(selection.indexOf(card), 1);
        }

        return { ...state, selection };
      }

      case GameStateActionType.PlaySelection: {
        const total = Card.getValidSong(state.selection);
        let selection: Card[] = [];

        if (total == 0) {
          selection = state.selection;
        } else {
          state.currentPlayer!.claps += total;
          state.selection.forEach((card: Card) => state.currentPlayer?.cards.splice(state.currentPlayer?.cards.indexOf(card), 1));
        }

        if (action.call) {
          action.call(total);
        }

        return { ...state, selection };
      }

      case GameStateActionType.SetElevated: {
        return { ...state, currentElevated: action.data.index };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}