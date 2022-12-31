import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Container } from "@mui/material/";
import * as S from "../../Home/Pokemons/styles";
import { FavoriteContext } from "../../../contexts/FavoriteContext";
import { StyledHeartIcon } from "./styles";
import { ArenaContext } from "../../../contexts/ArenaContext";
import { StyledShieldIcon } from "./styles";

export const Pokemon = ({ BASE_URL }) => {
  const { pokemonId } = useParams();
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);
  const URL = `${BASE_URL}${pokemonId}`;

  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  const { arenaPokemons, updateArenaPokemons } = useContext(ArenaContext);

  useEffect(() => {
    const fetchPoke = async () => {
      setLoading(true);
      const res = await fetch(URL);
      const data = await res.json();
      setPokemonData(data);
      setLoading(false);
    };
    fetchPoke();
  }, [URL]);

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  const onFavoriteClick = () => {
    updateFavoritePokemons(pokemonData);
  };

  const onSwordClick = () => {
    updateArenaPokemons(pokemonData);
  };

  return (
    <Container>
      <S.Container>
        <h1>POKEDEX</h1>
        <S.PokemonCard>
          <S.PokemonImage
            src={pokemonData.sprites.other.dream_world.front_default}
            alt={pokemonData.name}
          />
          <h2>
            {pokemonData.name.toUpperCase()}
            <StyledHeartIcon
              onClick={onFavoriteClick}
              favorite={favoritePokemons.some((p) => p.id === pokemonData.id)}
            />
            <StyledShieldIcon
              onClick={onSwordClick}
              arena={arenaPokemons.some((p) => p.id === pokemonData.id)}
            />
          </h2>
          <p>Ability: {pokemonData.abilities[0].ability.name}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Base experience: {pokemonData.base_experience}</p>
        </S.PokemonCard>
        <Link to="/">Strona główna</Link>
      </S.Container>
    </Container>
  );
};
