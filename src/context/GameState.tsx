import React, { PropsWithChildren, createContext, useState } from "react";
import { GameState } from "../types";
import { Player } from "../lib/Player";

export const GameStateContext = createContext<GameState>({
  players: [],
  setPlayers: () => {},
});

export function GameStateProvider({ children }: PropsWithChildren) {
  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <GameStateContext.Provider value={{ players, setPlayers }}>
      {children}
    </GameStateContext.Provider>
  );
}

/*
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  // Check user information
  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const cleanUser = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  const storageSetUser = (user) => {
    localStorage.setItem("user", user);
    setUser(user);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser: storageSetUser,
      cleanUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
*/