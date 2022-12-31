import React from "react";
import Pagination from "@mui/material/Pagination";
import * as S from "./styles";

export const AppPagination = ({
  pokemonsPerPage,
  totalPokemons,
  handlePageChange,
}) => (
  <S.PaginationWrapper>
    <Pagination
      count={Math.ceil(totalPokemons / pokemonsPerPage)}
      onChange={handlePageChange}
      color="primary"
    />
  </S.PaginationWrapper>
);
