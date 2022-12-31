import React from "react";

export const FavoriteContext = React.createContext({
  favoritePokemons: [],
  updateFavoritePokemons: () => null,
});

export const FavoriteProvider = FavoriteContext.Provider;
