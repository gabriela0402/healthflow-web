import { Stack, TextField } from "@mui/material";
import * as Styled from "./Login.styled";

export const Login = () => {
  return (
    <Styled.Container>
      <Stack sx={{ alignItems: "center" }}>
        <Styled.Title>Seja Bem vindo(a) de volta!</Styled.Title>
        <Styled.Subtitle>Faça o seu login</Styled.Subtitle>
      </Stack>

      <Stack sx={{ marginTop: "3rem", width: "60%" }} spacing={6}>
        <Stack
          sx={{
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Styled.Text>Email:</Styled.Text>
          <TextField
            placeholder="Digite seu email"
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "1.2rem" },
            }}
          />
        </Stack>
        <Stack
          sx={{
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Styled.Text>Senha:</Styled.Text>
          <TextField
            placeholder="Digite sua senha"
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "1.2rem" },
            }}
          />
        </Stack>
      </Stack>
    </Styled.Container>
  );
};
