import FavoriteIcon from "@mui/icons-material/Favorite";
import ShieldIcon from "@mui/icons-material/Shield";
import styled from "styled-components";

export const StyledHeartIcon = styled(FavoriteIcon)`
  color: ${(props) => (props.favorite ? "red" : "black")};
`;

export const StyledShieldIcon = styled(ShieldIcon)`
color: ${(props) => props.arena ? "red" : "black"}
`;