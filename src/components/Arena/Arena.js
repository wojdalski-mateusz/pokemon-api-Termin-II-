import * as React from "react";
import { ArenaContext } from "../../contexts/ArenaContext";
import { Container } from "@mui/material";
import { Grid, Button } from "@mui/material";
import { useState, useContext } from "react";
import * as S from "./styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Arena = () => {
  const { arenaPokemons, updateArenaPokemons } = useContext(ArenaContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [winner, setWinner] = useState(null);

  const fight = () => {
    const [pokemon1, pokemon2] = arenaPokemons;
    const score1 = pokemon1.base_experience * pokemon1.weight;
    const score2 = pokemon2.base_experience * pokemon2.weight;

    if (score1 > score2) {
      setWinner(pokemon1.name);
      setOpen(true);
    } else if (score2 > score1) {
      setWinner(pokemon2.name);
      setOpen(true);
    } else {
      setWinner(`W walce ${pokemon1.name} z ${pokemon2.name} padł REMIS`);
      setOpen(true);
    }
  };

  const clearArena = () => {
    handleClose();
    arenaPokemons.length = 0;
  };

  return (
    <Container>
      <S.ArenaContainer>
        <S.CardsWrapper>
          {arenaPokemons.length < 1 ? (
            <S.PlaceholderCard />
          ) : (
            <Grid sx={4}>
              <S.PokemonCard>
                <S.PokemonImage
                  src={arenaPokemons[0].sprites.other.dream_world.front_default}
                  alt={`pic of ${arenaPokemons[0].name}`}
                />
                <h2>
                  {arenaPokemons[0].name.toUpperCase()}
                  <S.StyledRemoveCircleIcon
                    onClick={() => updateArenaPokemons(arenaPokemons[0])}
                  />
                </h2>
                <p>Ability: {arenaPokemons[0].abilities[0].ability.name}</p>
                <p>Height: {arenaPokemons[0].height}</p>
                <p>Weight: {arenaPokemons[0].weight}</p>
                <p>Base experience: {arenaPokemons[0].base_experience}</p>
              </S.PokemonCard>
            </Grid>
          )}
          <h2>VS</h2>
          {arenaPokemons.length < 2 ? (
            <S.PlaceholderCard />
          ) : (
            <Grid sx={4}>
              <S.PokemonCard>
                <S.PokemonImage
                  src={arenaPokemons[1].sprites.other.dream_world.front_default}
                  alt={`pic of ${arenaPokemons[1].name}`}
                />
                <h2>
                  {arenaPokemons[1].name.toUpperCase()}
                  <S.StyledRemoveCircleIcon
                    onClick={() => updateArenaPokemons(arenaPokemons[1])}
                  />
                </h2>
                <p>Ability: {arenaPokemons[1].abilities[0].ability.name}</p>
                <p>Height: {arenaPokemons[1].height}</p>
                <p>Weight: {arenaPokemons[1].weight}</p>
                <p>Base experience: {arenaPokemons[1].base_experience}</p>
              </S.PokemonCard>
            </Grid>
          )}
        </S.CardsWrapper>
        <Button
          variant="contained"
          disabled={arenaPokemons.length < 2}
          onClick={fight}
        >
          --- WALCZ ---
        </Button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h1>Wynik walki</h1>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {winner === "remis" ? (
                  <Typography>Walka zakończyła się remisem.</Typography>
                ) : (
                  <Typography>{`${winner} wygrał walkę!`}</Typography>
                )}
              </Typography>
              {<button onClick={clearArena}>Opuść Arenę</button>}
            </Box>
          </Modal>
        </div>
      </S.ArenaContainer>
    </Container>
  );
};
