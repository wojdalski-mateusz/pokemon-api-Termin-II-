import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Pokemons } from "./Pokemons/Pokemons";
import { AppPagination } from "./AppPagination/AppPagination";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokesPerPage] = useState(15);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?limit=150`
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        getPokemonsDetails(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const getPokemonsDetails = async (dataPure) => {
    let currentList = [];
    dataPure.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const result = await response.json();
      currentList = [...currentList, result];
      currentList.sort((a, b) => (a.id > b.id ? 1 : -1));
      setPokemons(currentList);
    });
  };

  const indexOfLastPokemon = currentPage * pokesPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokesPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
      <Container>
        <Pokemons
          pokemons={currentPokemons}
          allPokemons={pokemons}
          loading={loading}
        />
        <AppPagination
          pokemonsPerPage={pokesPerPage}
          totalPokemons={pokemons.length}
          handlePageChange={handlePageChange}
        />
      </Container>
  );
};
