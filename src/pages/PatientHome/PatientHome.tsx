import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";

import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import * as Styled from "./PatientHome.styled";
import { SideBar } from "../../components/SideBar/SideBar";
import { Card } from "../../components/Card/Card";
import { getFormattedDate } from "./PatientHome.utils";

import { SpecialtiesModal } from "../../components/SpecialtiesModal/SpecialtiesModal";
import { patientSpecialties } from "./PatientHome.utils";
import { usePatientHome } from "./PatientHome.hook";

export const PatientHome = () => {
  const dataFormatada = getFormattedDate();
  const {
    isSpecialtiesModalOpen,
    openSpecialtiesModal,
    closeSpecialtiesModal,
    handleSchedule,
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
            num="23 de abr, 14:30"
            type="dashboard"
          />

          <Card
            icon={PeopleIcon}
            title="Consultas realizadas"
            num="4"
            type="dashboard"
          />

          <Card
            icon={CalendarTodayIcon}
            title="Consultas agendadas"
            num="3"
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

              <Styled.SectionLink component={Link} to="/my-appointments">
                Ver todos
                <ChevronRightIcon fontSize="small" />
              </Styled.SectionLink>
            </Styled.SectionHeader>

            <Styled.AppointmentList>
              <Styled.AppointmentItem>
                <Styled.DateBox>
                  <Typography>23</Typography>
                  <span>ABR</span>
                </Styled.DateBox>

                <Styled.Time>14:30</Styled.Time>

                <Styled.ProfessionalAvatar>AL</Styled.ProfessionalAvatar>

                <Stack flex={1} minWidth={0}>
                  <Typography
                    sx={{
                      color: "#102A56",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Dra. Ana Lima
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    Cardiologista
                  </Typography>

                  <Styled.Location>
                    <LocationOnOutlinedIcon fontSize="small" />
                    Clínica Central
                  </Styled.Location>
                </Stack>

                <Styled.Status status="confirmed">Confirmada</Styled.Status>

                <ChevronRightIcon sx={{ color: "text.secondary" }} />
              </Styled.AppointmentItem>

              <Styled.AppointmentItem>
                <Styled.DateBox>
                  <Typography>28</Typography>
                  <span>ABR</span>
                </Styled.DateBox>

                <Styled.Time>10:00</Styled.Time>

                <Styled.ProfessionalAvatar>RP</Styled.ProfessionalAvatar>

                <Stack flex={1} minWidth={0}>
                  <Typography
                    sx={{
                      color: "#102A56",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Dr. Rafael Pereira
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    Clínico geral
                  </Typography>

                  <Styled.Location>
                    <LocationOnOutlinedIcon fontSize="small" />
                    Unidade Zona Sul
                  </Styled.Location>
                </Stack>

                <Styled.Status status="confirmed">Confirmada</Styled.Status>

                <ChevronRightIcon sx={{ color: "text.secondary" }} />
              </Styled.AppointmentItem>

              <Styled.AppointmentItem>
                <Styled.DateBox>
                  <Typography>05</Typography>
                  <span>MAI</span>
                </Styled.DateBox>

                <Styled.Time>09:30</Styled.Time>

                <Styled.ProfessionalAvatar>CS</Styled.ProfessionalAvatar>

                <Stack flex={1} minWidth={0}>
                  <Typography
                    sx={{
                      color: "#102A56",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Dra. Camila Santos
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    Dermatologista
                  </Typography>

                  <Styled.Location>
                    <LocationOnOutlinedIcon fontSize="small" />
                    Clínica Central
                  </Styled.Location>
                </Stack>

                <Styled.Status status="pending">Pendente</Styled.Status>

                <ChevronRightIcon sx={{ color: "text.secondary" }} />
              </Styled.AppointmentItem>
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
