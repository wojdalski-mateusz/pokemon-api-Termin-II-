import { useState } from "react";
import { Home } from "./components/Home/Home";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { Pokemon } from "./components/Home/Pokemon/Pokemon";
import { Favorites } from "./components/Favorites/Favorites";
import { Arena } from "./components/Arena/Arena";
import { LogPage } from "./components/LogPage/LogPage";
import { Registry } from "./components/Registry/Registry";
import { FavoriteContext } from "./contexts/FavoriteContext";
import { ArenaContext } from "./contexts/ArenaContext";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [arenaPokemons, setArenaPokemons] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateFavoritePokemons = (pokemon) => {
    const pokemonId = pokemon.id;
    if (!favorites.some((p) => p.id === pokemonId)) {
      setFavorites([...favorites, pokemon]);
    } else {
      setFavorites(favorites.filter((p) => p.id !== pokemonId));
    }
  };

  const updateArenaPokemons = (pokemon) => {
    const pokemonId = pokemon.id;
    if (
      arenaPokemons.length < 2 &&
      !arenaPokemons.some((p) => p.id === pokemon.id)
    ) {
      setArenaPokemons([...arenaPokemons, pokemon]);
    } else {
      setArenaPokemons(arenaPokemons.filter((p) => p.id !== pokemonId));
    }
  };

  return (
    <>
        <FavoriteContext.Provider
          value={{
            favoritePokemons: favorites,
            updateFavoritePokemons: updateFavoritePokemons,
          }}
        >
          <ArenaContext.Provider
            value={{
              arenaPokemons: arenaPokemons,
              updateArenaPokemons: updateArenaPokemons,
            }}
          >
            <ResponsiveAppBar
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="pokemon/:pokemonId"
                element={<Pokemon BASE_URL={BASE_URL} />}
              />
              <Route path="Ulubione" element={<Favorites />} />
              <Route path="Arena" element={<Arena />} />
              <Route
                path="Logowanie"
                element={
                  <LogPage
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route path="Rejestracja" element={<Registry />} />
            </Routes>
          </ArenaContext.Provider>
        </FavoriteContext.Provider>
    </>
  );
}

export default App;
