import React from "react";

export const ArenaContext = React.createContext({
  arenaPokemons: [],
  updateArenaPokemons: () => null,
});

export const ArenaProvider = ArenaContext.Provider;
