import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./ProfessionalCreate.styled";
import { useProfessionalCreate } from "./ProfessionalCreate.hook";

export const ProfessionalCreate = () => {
  const navigate = useNavigate();

  const {
    form,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useProfessionalCreate();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/professionals")}
          sx={{
            alignSelf: "flex-start",
            color: "text.secondary",
            textTransform: "none",
          }}
        >
          Voltar para profissionais
        </Button>

        <Styled.Header>
          <Typography
            variant="h4"
            sx={{
              color: "#102A56",
              fontSize: "1.6rem",
              fontWeight: 700,
            }}
          >
            Adicionar profissional
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            Cadastre um novo profissional na clínica.
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
                  handleChange(
                    "fullName",
                    event.target.value,
                  )
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
                onChange={(event) =>
                  handleChange("email", event.target.value)
                }
                placeholder="Digite o e-mail"
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Telefone
              </Typography>

              <TextField
                size="small"
                value={form.phone}
                onChange={(event) =>
                  handleChange("phone", event.target.value)
                }
                placeholder="(00) 00000-0000"
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Especialidade
              </Typography>

              <TextField
                select
                native
                size="small"
                value={form.specialty}
                onChange={(event) =>
                  handleChange(
                    "specialty",
                    event.target.value,
                  )
                }
              >
                <option value="">Selecione</option>
                <option value="Clínica Geral">
                  Clínica Geral
                </option>
                <option value="Cardiologia">
                  Cardiologia
                </option>
                <option value="Dermatologia">
                  Dermatologia
                </option>
                <option value="Neurologia">
                  Neurologia
                </option>
                <option value="Pediatria">
                  Pediatria
                </option>
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Registro profissional
              </Typography>

              <TextField
                size="small"
                value={form.registrationNumber}
                onChange={(event) =>
                  handleChange(
                    "registrationNumber",
                    event.target.value,
                  )
                }
                placeholder="Ex.: CRM-SP 123.456"
              />
            </Styled.Field>
          </Styled.FormGrid>

          <Styled.Actions>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ textTransform: "none" }}
            >
              Limpar
            </Button>

            <ButtonBlue
              text="Cadastrar profissional"
              onClick={handleSubmit}
            />
          </Styled.Actions>
        </Styled.FormCard>
      </Styled.Container>
    </Stack>
  );
};
