import { useContext } from "react";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { Container, Grid } from "@mui/material";
import * as S from "../Home/Pokemons/styles";
import { StyledRemoveCircleIcon } from "../Arena/styles";

export const Favorites = () => {
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  const info = "Żaden z Pokemonów nie jest ulubionym :(";
  return (
    <Container>
      <S.Container>
        <S.PokedexWrapper>
          {favoritePokemons.length === 0
            ? info
            : favoritePokemons.map((pokemon) => (
                <Grid sx={4}>
                  <S.PokemonCard>
                    <S.PokemonImage
                      src={
                        pokemon.sprites.other.dream_world?.front_default || ""
                      }
                      alt={`pic of ${pokemon.name}`}
                    />
                    <h2>
                      {pokemon.name.toUpperCase()}
                      <StyledRemoveCircleIcon
                        onClick={() => updateFavoritePokemons(pokemon)}
                      />
                    </h2>
                    <h6>Height: {pokemon.height}</h6>
                    <h6>Weight: {pokemon.weight}</h6>
                  </S.PokemonCard>
                </Grid>
              ))}
        </S.PokedexWrapper>
      </S.Container>
    </Container>
  );
};
