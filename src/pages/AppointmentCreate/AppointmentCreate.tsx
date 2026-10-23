import ArrowBack from "@mui/icons-material/ArrowBack";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./AppointmentCreate.styled";
import { useAppointmentCreate } from "./AppointmentCreate.hook";

import {
  Alert,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const AppointmentCreate = () => {
  const navigate = useNavigate();

  const {
    form,
    patients,
    specialties,
    filteredProfessionals,
    availableDays,
    timeSlots,
    isLoading,
    loadError,
    isLoadingAvailability,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useAppointmentCreate();

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

        {loadError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {loadError}
          </Alert>
        )}
        <Styled.FormCard>
          <Styled.FormGrid>
            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Paciente
              </Typography>
              <TextField
                select
                size="small"
                value={form.patientId || "none"}
                onChange={(e) => handleChange("patientId", e.target.value)}
                disabled={isLoading}
              >
                <MenuItem value="none">Selecione o paciente</MenuItem>
                {patients.map((p) => (
                  <MenuItem key={p.id} value={String(p.id)}>
                    {p.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Especialidade
              </Typography>
              <TextField
                select
                size="small"
                value={form.specialtyId || "none"}
                onChange={(e) => handleChange("specialtyId", e.target.value)}
                disabled={isLoading}
              >
                <MenuItem value="none">Selecione a especialidade</MenuItem>
                {specialties.map((s) => (
                  <MenuItem key={s.id} value={String(s.id)}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Profissional
              </Typography>
              <TextField
                select
                size="small"
                value={form.professionalId || "none"}
                onChange={(e) => handleChange("professionalId", e.target.value)}
                disabled={!form.specialtyId}
                helperText={
                  !form.specialtyId
                    ? "Escolha a especialidade primeiro."
                    : undefined
                }
              >
                <MenuItem value="none">Selecione o profissional</MenuItem>
                {filteredProfessionals.map((p) => (
                  <MenuItem key={p.id} value={String(p.id)}>
                    {p.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Data da consulta
              </Typography>

              <TextField
                select
                size="small"
                value={form.date || "none"}
                onChange={(e) => handleChange("date", e.target.value)}
                disabled={!form.professionalId || isLoadingAvailability}
                helperText={
                  form.professionalId &&
                  !isLoadingAvailability &&
                  availableDays.length === 0
                    ? "Este profissional não tem horários cadastrados."
                    : undefined
                }
              >
                <MenuItem value="none">Selecione a data</MenuItem>
                {availableDays.map((day) => (
                  <MenuItem key={day.value} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Horário
              </Typography>

              <TextField
                select
                size="small"
                value={form.time || "none"}
                onChange={(e) => handleChange("time", e.target.value)}
                disabled={!form.date || isLoadingAvailability}
                helperText={
                  form.date && !isLoadingAvailability && timeSlots.length === 0
                    ? "Sem horários disponíveis nesta data."
                    : undefined
                }
              >
                <MenuItem value="none">Selecione o horário</MenuItem>
                {timeSlots.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </TextField>
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
              disabled={isSubmitting}
              sx={{ minWidth: "120px", textTransform: "none" }}
            >
              Limpar
            </Button>

            <ButtonBlue
              text={isSubmitting ? "Cadastrando..." : "Cadastrar agendamento"}
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </Styled.Actions>
        </Styled.FormCard>
      </Styled.Container>
    </Stack>
  );
};
