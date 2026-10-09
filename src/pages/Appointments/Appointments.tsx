import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AccessTime from "@mui/icons-material/AccessTime";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./Appointments.styled";

import {
  appointments,
  getInitials,
  getStatusLabel,
} from './Appoiments.utils';

export const Appointments = () => {
  return (
    <>
      <SideBar />

      <Styled.Container>
        <Styled.HeaderContainer>
          <Styled.TitleContainer>
            <Stack>
              <Typography
                variant="h4"
                sx={{ fontSize: "1.6rem" }}
              >
                Agendamentos
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
              >
                Administre os agendamentos da clínica.
              </Typography>
            </Stack>

            <Styled.AddButtonContainer>
              <ButtonBlue
                text="+ Adicionar agendamento"
                onClick={() => {
                  console.log(
                    "Abrir cadastro de agendamento",
                  );
                }}
              />
            </Styled.AddButtonContainer>
          </Styled.TitleContainer>
        </Styled.HeaderContainer>

        <Styled.FiltersContainer>
          <Styled.SearchWrapper>
            <Styled.SearchIcon />

            <Styled.SearchInput
              type="text"
              placeholder="Pesquisar agendamentos..."
            />
          </Styled.SearchWrapper>

          <Styled.FilterSelect defaultValue="date">
            <option value="date">Data</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
          </Styled.FilterSelect>

          <Styled.FilterSelect defaultValue="professional">
            <option value="professional">
              Profissional
            </option>
            <option value="sarah">
              Dra. Sarah Miller
            </option>
            <option value="michael">
              Dr. Michael Chen
            </option>
          </Styled.FilterSelect>

          <Styled.FilterSelect defaultValue="status">
            <option value="status">Status</option>
            <option value="confirmed">Confirmado</option>
            <option value="pending">Pendente</option>
            <option value="cancelled">Cancelado</option>
          </Styled.FilterSelect>
        </Styled.FiltersContainer>

        <Styled.ContentContainer>
          <Styled.ScheduleContainer>
            <Styled.ScheduleHeader>
              <Typography variant="h6">
                Agenda de hoje
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Terça-feira, 12 de março de 2024
              </Typography>
            </Styled.ScheduleHeader>

            <Styled.TableWrapper>
              <Table sx={{ minWidth: "850px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Horário</TableCell>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Profissional</TableCell>
                    <TableCell>Especialidade</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {appointments.map((appointment) => (
                    <Styled.StyledTableRow
                      key={appointment.id}
                      hover
                    >
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                        >
                          {appointment.time}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Styled.PatientCell>
                          <Styled.Avatar>
                            {getInitials(
                              appointment.patient,
                            )}
                          </Styled.Avatar>

                          <Stack>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                            >
                              {appointment.patient}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {appointment.patientInfo}
                            </Typography>
                          </Stack>
                        </Styled.PatientCell>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {appointment.professional}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {appointment.specialty}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Styled.Status
                          status={appointment.status}
                        >
                          {getStatusLabel(
                            appointment.status,
                          )}
                        </Styled.Status>
                      </TableCell>

                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreHoriz fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </Styled.StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Styled.TableWrapper>
          </Styled.ScheduleContainer>

          <Styled.SideSummaryContainer>
            <Styled.SummaryCard>
              <Styled.SummaryCardHeader>
                <Typography variant="h6">
                  Resumo diário
                </Typography>

              </Styled.SummaryCardHeader>

              <Styled.SummaryItem
                sx={{ backgroundColor: "#EAF3FF" }}
              >
                <CalendarToday color="primary" />

                <Stack>
                  <Typography
                    variant="h5"
                    sx={{fontSize:"1.3rem"}}
                    fontWeight={700}
                  >
                    42
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    agendamentos
                  </Typography>
                </Stack>
              </Styled.SummaryItem>

              <Styled.SummaryItem
                sx={{ backgroundColor: "#E7F7EF" }}
              >
                <CheckCircle
                  sx={{ color: "#219653" }}
                />

                <Stack>
                  <Typography
                    variant="h5"
                    sx={{fontSize:"1.3rem"}}
                    fontWeight={700}
                  >
                    28
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    confirmados
                  </Typography>
                </Stack>
              </Styled.SummaryItem>

              <Styled.SummaryItem
                sx={{ backgroundColor: "#FFF5DD" }}
              >
                <AccessTime
                  sx={{ color: "#D99400" }}
                />

                <Stack>
                  <Typography
                    variant="h5"
                    sx={{fontSize:"1.3rem"}}
                    fontWeight={700}
                  >
                    4
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    pendentes
                  </Typography>
                </Stack>
              </Styled.SummaryItem>
            </Styled.SummaryCard>

            <Styled.SummaryCard>
              <Typography variant="h6">
                Status dos agendamentos
              </Typography>

              <Styled.Donut>
                <Styled.DonutValue>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    42
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Total
                  </Typography>
                </Styled.DonutValue>
              </Styled.Donut>

              <Styled.LegendItem>
                <Styled.LegendColor
                  color="#4CAF91"
                />
                <Typography variant="body2">
                  Confirmados
                </Typography>
                <Typography variant="body2">
                  28
                </Typography>
              </Styled.LegendItem>

              <Styled.LegendItem>
                <Styled.LegendColor
                  color="#42A5F5"
                />
                <Typography variant="body2">
                  Agendados
                </Typography>
                <Typography variant="body2">
                  8
                </Typography>
              </Styled.LegendItem>

              <Styled.LegendItem>
                <Styled.LegendColor
                  color="#F4C95D"
                />
                <Typography variant="body2">
                  Pendentes
                </Typography>
                <Typography variant="body2">
                  4
                </Typography>
              </Styled.LegendItem>

              <Styled.LegendItem>
                <Styled.LegendColor
                  color="#E57373"
                />
                <Typography variant="body2">
                  Cancelados
                </Typography>
                <Typography variant="body2">
                  2
                </Typography>
              </Styled.LegendItem>
            </Styled.SummaryCard>

            <Styled.SummaryCard>
              <Styled.SummaryCardHeader>
                <Typography variant="h6">
                  Próximos
                </Typography>

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Ver todos
                </Typography>
              </Styled.SummaryCardHeader>

              <Styled.UpcomingItem>
                <Stack>
                  <Typography variant="body2">
                    Charlotte Lewis
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Cardiologia
                  </Typography>
                </Stack>

                <Typography
                  variant="caption"
                  color="primary"
                >
                  14:00
                </Typography>
              </Styled.UpcomingItem>

              <Styled.UpcomingItem>
                <Stack>
                  <Typography variant="body2">
                    Daniel Walker
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Neurologia
                  </Typography>
                </Stack>

                <Typography
                  variant="caption"
                  color="warning.main"
                >
                  14:30
                </Typography>
              </Styled.UpcomingItem>

              <Styled.UpcomingItem>
                <Stack>
                  <Typography variant="body2">
                    Mia Hall
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Dermatologia
                  </Typography>
                </Stack>

                <Typography
                  variant="caption"
                  color="primary"
                >
                  15:00
                </Typography>
              </Styled.UpcomingItem>
            </Styled.SummaryCard>
          </Styled.SideSummaryContainer>
        </Styled.ContentContainer>
      </Styled.Container>
    </>
  );
};
