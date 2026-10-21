import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleIcon from "@mui/icons-material/People";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";

import { CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import * as Styled from "./PatientHome.styled";
import { SideBar } from "../../components/SideBar/SideBar";
import { Card } from "../../components/Card/Card";
import {
  formatNextAppointment,
  getDayLabel,
  getFormattedDate,
  getMonthLabel,
  patientSpecialties,
} from "./PatientHome.utils";
import { SpecialtiesModal } from "../../components/SpecialtiesModal/SpecialtiesModal";
import { usePatientHome } from "./PatientHome.hook";
import {
  getInitials,
  getStatusLabel,
} from "../PatientAppointments/PatientAppoiments.utils";

export const PatientHome = () => {
  const dataFormatada = getFormattedDate();
  const {
    isSpecialtiesModalOpen,
    openSpecialtiesModal,
    closeSpecialtiesModal,
    handleSchedule,
    loading,
    error,
    reload,
    nextAppointment,
    upcomingAppointments,
    scheduledCount,
    completedCount,
  } = usePatientHome();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Styled.TitleContainer>
          <Stack spacing={0.4}>
            <Typography
              variant="h4"
              sx={{
                color: "#102A56",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Olá, Gabriela
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "0.9rem" }}
            >
              Acompanhe sua saúde e seus próximos atendimentos
            </Typography>
          </Stack>

          <Styled.DateContainer>
            <CalendarTodayIcon
              sx={{
                color: "primary.main",
                fontSize: "1.1rem",
              }}
            />

            <Typography
              sx={{
                color: "#4a5568",
                fontWeight: 500,
                fontSize: "0.8rem",
              }}
            >
              {dataFormatada}
            </Typography>
          </Styled.DateContainer>
        </Styled.TitleContainer>

        <Styled.CardContainer>
          <Card
            icon={CalendarTodayIcon}
            title="Próxima consulta"
            num={
              loading
                ? "..."
                : nextAppointment
                  ? formatNextAppointment(nextAppointment.date)
                  : "Nenhuma"
            }
            type="dashboard"
          />

          <Card
            icon={PeopleIcon}
            title="Consultas realizadas"
            num={loading ? "..." : String(completedCount)}
            type="dashboard"
          />

          <Card
            icon={CalendarTodayIcon}
            title="Consultas agendadas"
            num={loading ? "..." : String(scheduledCount)}
            type="dashboard"
          />
        </Styled.CardContainer>

        <Styled.ContentGrid>
          <Styled.AppointmentsCard>
            <Styled.SectionHeader>
              <Stack spacing={0.3}>
                <Typography
                  sx={{
                    color: "#102A56",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Próximos atendimentos
                </Typography>

                <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                  Seus agendamentos e consultas futuras.
                </Typography>
              </Stack>

              <Styled.SectionLink component={Link} to="/my-appoiments-patient">
                Ver todos
                <ChevronRightIcon fontSize="small" />
              </Styled.SectionLink>
            </Styled.SectionHeader>

            <Styled.AppointmentList>
              {loading && (
                <Stack alignItems="center" sx={{ py: 4 }}>
                  <CircularProgress size={26} />
                </Stack>
              )}

              {!loading && error && (
                <Alert
                  severity="error"
                  sx={{ mt: 2 }}
                  action={
                    <Button color="inherit" size="small" onClick={reload}>
                      Tentar de novo
                    </Button>
                  }
                >
                  {error}
                </Alert>
              )}

              {!loading && !error && upcomingAppointments.length === 0 && (
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem", py: 3, textAlign: "center" }}
                >
                  Você não tem atendimentos futuros.
                </Typography>
              )}

              {!loading &&
                !error &&
                upcomingAppointments.map((appointment) => (
                  <Styled.AppointmentItem key={appointment.id}>
                    <Styled.DateBox>
                      <Typography>{getDayLabel(appointment.date)}</Typography>
                      <span>{getMonthLabel(appointment.date)}</span>
                    </Styled.DateBox>

                    <Styled.Time>{appointment.time}</Styled.Time>

                    <Styled.ProfessionalAvatar>
                      {getInitials(appointment.professional)}
                    </Styled.ProfessionalAvatar>

                    <Stack flex={1} minWidth={0}>
                      <Typography
                        sx={{
                          color: "#102A56",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        {appointment.professional}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {appointment.specialty}
                      </Typography>
                    </Stack>

                    <Styled.Status status={appointment.status}>
                      {getStatusLabel(appointment.status)}
                    </Styled.Status>

                    <ChevronRightIcon sx={{ color: "text.secondary" }} />
                  </Styled.AppointmentItem>
                ))}
            </Styled.AppointmentList>
          </Styled.AppointmentsCard>

          <Styled.HelpCard>
            <Styled.HelpIcon>
              <PersonSearchOutlinedIcon />
            </Styled.HelpIcon>

            <Typography
              sx={{
                color: "#102A56",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              Como podemos ajudar?
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                fontSize: "0.8rem",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              Agende uma consulta, encontre especialistas e cuide da sua saúde
              com mais facilidade.
            </Typography>

            <Styled.HelpButton component={Link} to="/book-appointment">
              <CalendarTodayIcon fontSize="small" />
              Agendar consulta
            </Styled.HelpButton>

            <Styled.HelpOutlineButton
              type="button"
              onClick={openSpecialtiesModal}
            >
              <PeopleIcon fontSize="small" />
              Ver especialistas
            </Styled.HelpOutlineButton>
          </Styled.HelpCard>
        </Styled.ContentGrid>
      </Styled.Container>
      <SpecialtiesModal
        open={isSpecialtiesModalOpen}
        specialties={patientSpecialties}
        onClose={closeSpecialtiesModal}
        onSchedule={handleSchedule}
      />
    </Stack>
  );
};
