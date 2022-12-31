import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import * as S from "../Home/Pokemons/styles";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const Registry = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Wprowadź poprawne imię")
      .max(15)
      .required("Pole wymagane"),
    email: Yup.string()
      .email("Nieprawidłowy format emaila")
      .required("Pole wymagane"),
    password: Yup.string()
      .required("Pole wymagane")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum 8 znaków, 1 duża litera, 1 mała litera, 1 cyfra, 1 znak specjalny"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Hasło musi być takie samo")
      .required("Pole wymagane"),
  });

  const navigate = useNavigate();

  const handleSuccessfulRegistration = () => {
    navigate("/Logowanie");
  };
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values, formik) => {
    axios
      .post("http://localhost:3004/users", values)
      .then((response) => {
        console.log(response);
        formik.resetForm();
        enqueueSnackbar("Rejestracja przebiegła pomyślnie", {
          variant: "success",
        });
        handleSuccessfulRegistration();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <S.Container>
        <Grid>
          <Box p={10} width={300}>
            <Paper elevation={20}>
              <Grid align="center">
                <Avatar>
                  <CatchingPokemonIcon color="primary" />
                </Avatar>
                <Box m={0}>
                  <h2>Rejestracja</h2>
                </Box>
                <Typography variant="caption">
                  Wypełnij formularz aby założyć konto
                </Typography>
              </Grid>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Imię"
                    placeholder="Wprowadź imię"
                    helperText={<ErrorMessage name="name" />}
                  />
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
                  <Field
                    as={TextField}
                    fullWidth
                    name="confirmPassword"
                    label="Powtórz hasło"
                    placeholder="Powtórz hasło"
                    helperText={<ErrorMessage name="confirmPassword" />}
                    type="password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Wyślij
                  </Button>
                </Form>
              </Formik>
            </Paper>
          </Box>
        </Grid>
      </S.Container>
    </Container>
  );
};
