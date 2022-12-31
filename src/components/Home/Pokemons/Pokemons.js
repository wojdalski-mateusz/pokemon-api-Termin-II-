import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from "react";
import { Grid } from "@mui/material";

export const Pokemons = ({ pokemons, loading, allPokemons }) => {
  const [filter, setFilter] = useState("");

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const renderPokemons = (data) => {
    return data.map(
      (pokemon) =>
        pokemon.name.includes(filter) && (
          <Link
            to={`pokemon/${pokemon.id}`}
            key={pokemon.id}
            style={{ textDecoration: "none" }}
          >
            <Grid xs={4}>
              <S.PokemonCard>
                <S.PokemonImage
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={`pic of ${pokemon.name}`}
                />
                <h3>{pokemon.name.toUpperCase()}</h3>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>Ability: {pokemon.abilities[0].ability.name}</p>
                <p>Base experience: {pokemon.base_experience}</p>
              </S.PokemonCard>
            </Grid>
          </Link>
        )
    );
  };

  return (
    <>
      <SearchBar handleSearchChange={handleSearchChange} />
      <S.Container>
        <S.PokedexWrapper>
          {!filter ? renderPokemons(pokemons) : renderPokemons(allPokemons)}
        </S.PokedexWrapper>
      </S.Container>
    </>
  );
};
