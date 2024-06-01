import React, { PropsWithChildren, createContext, useReducer } from "react";
import { GameContextState, GameState, GameStateAction, GameStateActionType } from "./types";
import { Player } from "../../lib/Player";
import { Card, cardType } from "../../lib/Card/Card";
import { SoundPlayer } from "../../lib/Sound";
import { getRndString } from "../../lib/utils";

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
    // TODO: Is this complex enough to have modules for each action type?
    switch (action.type) {
      case GameStateActionType.NextTurn:
        if (state.turn == state.players.length - 1) {
          return { ...state, turn: 0, currentPlayer: state.players[0], selection: [] };
        } else {
          return { ...state, turn: state.turn + 1, currentPlayer: state.players[state.turn + 1], selection: [] };
        }

      case GameStateActionType.ApplyEffect: {
        const card = action.data.card;
        const [tag, area, value] = card.tags;
        let affectedPlayers: Player[] = [];

        // Compute affected players
        if (area == "all") {
          affectedPlayers = state.players;
        } else if (area == "own") {
          affectedPlayers = [state.currentPlayer!];
        } else { // TODO: implement "other"
          state.players.forEach((player: Player) => {
            if (player.name !== state.currentPlayer?.name) {
              affectedPlayers.push(player);
            }
          });
        }

        // Applying effect
        affectedPlayers.forEach((player: Player) => {
          // Effect on card
          if (tag !== "") {
            player.cards.forEach((card: Card) => {
              if (card.hasTag(tag)) {
                card.claps += parseInt(value);
              }
            });

            player.cards = player.cards.filter( (card: Card) => card.claps >= 0 );
          } else {
            // Effect on player
            affectedPlayers.forEach((player: Player) => {
              player.claps = player.claps + parseInt(value);
            });
          }
        });

        if (parseInt(value) > 0) {
          SoundPlayer.playSfx(getRndString("claps", 6));
        } else {
          SoundPlayer.playSfx(getRndString("boo", 6));
        }

        return { ...state };
      }

      case GameStateActionType.DrawCard: { // TODO not pure?
        const card = action.data.card;
        state.currentPlayer?.cards.push(card);
        return { ...state };
      }

      case GameStateActionType.AddClapsToCurrentPlayer: {
        state.currentPlayer!.claps += action.data.claps;
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
          state.selection.forEach((card: Card) => {
            // Luthiers & Instruments doesn't go away
            if ([cardType.Instrument, cardType.Luthier].indexOf(card.type) < 0) {
              state.currentPlayer?.cards.splice(state.currentPlayer?.cards.indexOf(card), 1);
            }
          });
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