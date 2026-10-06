import { Box, Stack, TextField, Typography } from "@mui/material";
import * as Styled from "./Login.styled";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import { Link as RouterLink } from "react-router-dom";
import { theme } from "../../theme";
import Logo from "../../assets/img/HealthFlow-Logo.png"

export const Login = () => {
  return (
    <Styled.Container>
      <Styled.Illustration
        src={Logo}
        alt="Logo do HealthFlow"
      />

      <Stack alignItems="center">
        <Styled.Title>
          Seja bem-vindo(a) de volta!
        </Styled.Title>

        <Styled.Subtitle>
          Faça o seu login
        </Styled.Subtitle>
      </Stack>

      <Stack
        sx={{
          marginTop: "3rem",
          width: "60%",
          maxWidth: "600px",
        }}
        spacing={3}
      >
        <Stack spacing={1} width="100%">
          <Styled.Text>Email:</Styled.Text>

          <TextField
            fullWidth
            placeholder="Digite seu e-mail"
            type="email"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "1.2rem",
              },
            }}
          />
        </Stack>

        <Stack spacing={1} width="100%">
          <Styled.Text>Senha:</Styled.Text>

          <TextField
            fullWidth
            placeholder="Digite sua senha"
            type="password"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "1.2rem",
              },
            }}
          />
        </Stack>

        <Box>
          <ButtonBlue
            text="Entrar"
            onClick={() => console.log("Clicou")}
          />
        </Box>

        <Styled.OrContainer>
          <Styled.OrLine />
          <Typography color={theme.palette.text.secondary}>
            ou
          </Typography>
          <Styled.OrLine />
        </Styled.OrContainer>

        <Styled.CreateAccountContainer>
          <Typography color={theme.palette.text.secondary}>
            Não tem conta?{" "}
            <Styled.CreateAccountLink
              component={RouterLink}
              to="/register"
            >
              Crie agora
            </Styled.CreateAccountLink>
          </Typography>
        </Styled.CreateAccountContainer>
      </Stack>
    </Styled.Container>
  );
};
