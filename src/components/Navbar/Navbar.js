import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  IconButton,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ResponsiveAppBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    enqueueSnackbar("Wylogowano", {
      variant: "success",
    });
    return <Navigate to="/" />;
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const pages = isLoggedIn
    ? ["Ulubione", "Arena", "Wyloguj"]
    : ["Ulubione", "Arena", "Logowanie", "Rejestracja"];

  return (
    <Container>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to={`/`}>
                <Logo />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/${page}`}
                      >
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to={`/`}>
                <Logo />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={
                    page === "Wyloguj" ? handleLogOut : handleCloseNavMenu
                  }
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={page === "Wyloguj" ? "/" : `/${page}`}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
};
export default ResponsiveAppBar;
