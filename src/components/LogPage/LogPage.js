import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LockIcon from "@mui/icons-material/Lock";
import * as S from "../Home/Pokemons/styles";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";

export const LogPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Nieprawidłowy format emaila")
      .required("Pole wymagane"),
    password: Yup.string()
      .required("Pole wymagane")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum 8 znaków, 1 duża litera, 1 mała litera, 1 cyfra, 1 znak specjalny"
      ),
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values, formik) => {
    axios.get("http://localhost:3004/users").then((response) => {
      const registeredUsers = response.data;
      const user = registeredUsers.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (user) {
        setIsLoggedIn(true);
        enqueueSnackbar("Zalogowano", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Nieprawidłowe dane logowania", {
          variant: "error",
        });
      }
    });
  };

  return (
    <Container>
      {isLoggedIn && <Navigate to="/" />}
      <S.Container>
        <Grid>
          <Box p={10} width={300}>
            <Paper elevation={20}>
              <Grid align="center">
                <Avatar>
                  <LockIcon color="primary" />
                </Avatar>
                <Box m={0}>
                  <h2>Logowanie</h2>
                </Box>
                <Typography variant="caption">
                  Uzupełnij dane aby się zalogować
                </Typography>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  <Form>
                    <Field
                      as={TextField}
                      fullWidth
                      name="email"
                      label="Email"
                      placeholder="Wprowadź adres E-mail"
                      helperText={<ErrorMessage name="email" />}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Hasło"
                      placeholder="Wprowadź hasło"
                      helperText={<ErrorMessage name="password" />}
                      type="password"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Zaloguj
                    </Button>
                  </Form>
                </Formik>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </S.Container>
    </Container>
  );
};
