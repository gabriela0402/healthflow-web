import ArrowBack from "@mui/icons-material/ArrowBack";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./AppointmentCreate.styled";
import { useAppointmentCreate } from "./AppointmentCreate.hook";

export const AppointmentCreate = () => {
  const navigate = useNavigate();

  const { form, handleChange, handleSubmit, handleCancel } =
    useAppointmentCreate();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/appointments")}
          sx={{
            alignSelf: "flex-start",
            color: "text.secondary",
            textTransform: "none",
          }}
        >
          Voltar para agendamentos
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
            Adicionar agendamento
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>
            Cadastre um novo agendamento para a clínica.
          </Typography>
        </Styled.Header>

        <Styled.FormCard>
          <Styled.FormGrid>
            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Paciente
              </Typography>

              <TextField
                select
                native
                size="small"
                value={form.patientId}
                onChange={(event) =>
                  handleChange("patientId", event.target.value)
                }
              >
                <option value="">Selecione o paciente</option>

                <option value="1">Olivia Souza</option>

                <option value="2">Liam Wilson</option>

                <option value="3">Emma Davis</option>

                <option value="4">Noah Martinez</option>
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Profissional
              </Typography>

              <TextField
                select
                native
                size="small"
                value={form.professionalId}
                onChange={(event) =>
                  handleChange("professionalId", event.target.value)
                }
              >
                <option value="">Selecione o profissional</option>

                <option value="1">Dra. Sarah Miller</option>

                <option value="2">Dr. Michael Chen</option>

                <option value="3">Dra. Emily Watson</option>

                <option value="4">Dr. Robert Khan</option>
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Especialidade
              </Typography>

              <TextField
                select
                native
                size="small"
                value={form.specialtyId}
                onChange={(event) =>
                  handleChange("specialtyId", event.target.value)
                }
              >
                <option value="">Selecione a especialidade</option>

                <option value="1">Clínica Geral</option>

                <option value="2">Cardiologia</option>

                <option value="3">Dermatologia</option>

                <option value="4">Neurologia</option>

                <option value="5">Pediatria</option>

                <option value="6">Ortopedia</option>
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Data da consulta
              </Typography>

              <TextField
                type="date"
                size="small"
                value={form.date}
                onChange={(event) => handleChange("date", event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <CalendarTodayOutlined
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                        fontSize: "1.1rem",
                      }}
                    />
                  ),
                }}
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Horário
              </Typography>

              <TextField
                type="time"
                size="small"
                value={form.time}
                onChange={(event) => handleChange("time", event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Styled.Field>

            <Styled.FullWidthField>
              <Typography variant="body2" fontWeight={600}>
                Observações
              </Typography>

              <TextField
                multiline
                minRows={4}
                value={form.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
                placeholder="Adicione alguma observação, se necessário"
              />
            </Styled.FullWidthField>
          </Styled.FormGrid>

          <Styled.Actions>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                minWidth: "120px",
                textTransform: "none",
              }}
            >
              Limpar
            </Button>

            <ButtonBlue text="Cadastrar agendamento" onClick={handleSubmit} />
          </Styled.Actions>
        </Styled.FormCard>
      </Styled.Container>
    </Stack>
  );
};
