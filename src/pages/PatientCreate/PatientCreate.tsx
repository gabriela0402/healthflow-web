import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./PatientCreate.styled";
import { usePatientCreate } from "./PatientCreate.hook";

export const PatientCreate = () => {
  const navigate = useNavigate();

  const { form, isLoading, handleChange, handleSubmit, handleCancel } =
    usePatientCreate();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/patients")}
          sx={{
            alignSelf: "flex-start",
            color: "text.secondary",
            textTransform: "none",
          }}
        >
          Voltar para pacientes
        </Button>

        <Styled.Header>
          <Typography
            variant="h4"
            sx={{ color: "#102A56", fontSize: "1.6rem", fontWeight: 700 }}
          >
            Adicionar paciente
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>
            Cadastre um novo paciente na clínica.
          </Typography>
        </Styled.Header>

        <Styled.FormCard>
          <Styled.FormGrid>
            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Nome completo
              </Typography>

              <TextField
                size="small"
                value={form.fullName}
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
                placeholder="Digite o nome completo"
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                E-mail
              </Typography>

              <TextField
                size="small"
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder="Digite o e-mail"
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Senha inicial
              </Typography>

              <TextField
                size="small"
                type="password"
                value={form.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
                placeholder="Mínimo de 6 caracteres"
                helperText="O paciente usará essa senha no primeiro acesso."
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Telefone
              </Typography>

              <TextField
                size="small"
                value={form.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                placeholder="(00) 00000-0000"
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Data de nascimento
              </Typography>

              <TextField
                size="small"
                type="date"
                value={form.birthDate}
                onChange={(event) =>
                  handleChange("birthDate", event.target.value)
                }
                inputProps={{ max: new Date().toISOString().slice(0, 10) }}
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Gênero
              </Typography>

              <TextField
                select
                size="small"
                value={form.gender}
                onChange={(event) => handleChange("gender", event.target.value)}
              >
                <MenuItem value="none">Não informado</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Outro">Outro</MenuItem>
                <MenuItem value="Prefiro não informar">
                  Prefiro não informar
                </MenuItem>
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                CPF
              </Typography>

              <TextField
                size="small"
                value={form.cpf}
                onChange={(event) => handleChange("cpf", event.target.value)}
                placeholder="000.000.000-00"
              />
            </Styled.Field>

            <Styled.FullWidthField>
              <Typography variant="body2" fontWeight={600}>
                Endereço
              </Typography>

              <TextField
                size="small"
                value={form.address}
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
                placeholder="Digite o endereço completo"
              />
            </Styled.FullWidthField>
          </Styled.FormGrid>

          <Styled.Actions>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={isLoading}
              sx={{ textTransform: "none" }}
            >
              Limpar
            </Button>

            <ButtonBlue
              text={isLoading ? "Cadastrando..." : "Cadastrar paciente"}
              onClick={handleSubmit}
              disabled={isLoading}
            />
          </Styled.Actions>
        </Styled.FormCard>
      </Styled.Container>
    </Stack>
  );
};