import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: #80ced6;
  border-radius: 5px;
  min-height: 600px;
  padding: 20px;
  weight: auto;
`;

export const PokedexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-between;
`;

export const PokemonImage = styled.img`
  height: 150px;
  width: 280px;
`;

export const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  margin-bottom: 10px;
  background-color: #618685;
  color: white;
  padding: 10px 0px;
  border-radius: 35px;
  transition: transform 0.2s;

  :hover {
    transition: transform 0.5s;
    transform: scale(1.03);
  }
`;
