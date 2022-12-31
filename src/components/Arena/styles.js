import styled from "styled-components";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export const ArenaContainer = styled.div`
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

export const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding-top: 50px
`;

export const PlaceholderCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 430px;
  margin-bottom: 10px;
  background-color: #618685;
  color: white;
  padding: 10px 0px;
  border-radius: 35px;
`;

export const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 430px;
  margin-bottom: 10px;
  background-color: #618685;
  color: white;
  padding: 10px 0px;
  border-radius: 35px;
  transition: transform 0.2s;
`;

export const PokemonImage = styled.img`
  height: 150px;
  width: 280px;
`;

export const StyledRemoveCircleIcon = styled(RemoveCircleIcon)`
  color: red;
  padding-left: 10px;
  cursor: pointer;
`;