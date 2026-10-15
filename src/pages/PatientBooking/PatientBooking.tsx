import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Healing from "@mui/icons-material/Healing";
import Person from "@mui/icons-material/Person";
import Schedule from "@mui/icons-material/Schedule";
import Search from "@mui/icons-material/Search";

import { Stack, Typography } from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";

import * as Styled from "./PatientBooking.styled";
import { usePatientBooking } from "./PatientBooking.hook";

export const PatientBooking = () => {
  const {
    step,
    search,
    setSearch,
    booking,
    filteredSpecialties,
    filteredProfessionals,
    availableDates,
    availableTimes,
    selectedDate,
    isLoadingSpecialties,
    specialtiesError,
    selectSpecialty,
    selectProfessional,
    selectDate,
    selectTime,
    canContinue,
    nextStep,
    previousStep,
    goToStep,
    confirmAppointment,
  } = usePatientBooking();

  const steps = [
    "Especialidade",
    "Profissional",
    "Data e horário",
    "Confirmação",
  ];

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Typography
          variant="h4"
          sx={{
            color: "#102A56",
            fontSize: "1.2rem",
            fontWeight: 700,
          }}
        >
          Agendar consulta
        </Typography>

        <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
          Encontre o profissional ideal para o seu atendimento
        </Typography>

        <Styled.Stepper>
          {steps.map((label, index) => {
            const stepNumber = (index + 1) as 1 | 2 | 3 | 4;

            return (
              <Styled.Step
                key={label}
                active={step === stepNumber}
                completed={step > stepNumber}
                onClick={() => goToStep(stepNumber)}
                sx={{
                  cursor: step > stepNumber ? "pointer" : "default",
                }}
              >
                <Styled.StepNumber active={step >= stepNumber}>
                  {stepNumber}
                </Styled.StepNumber>

                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: step === stepNumber ? 700 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </Typography>
              </Styled.Step>
            );
          })}
        </Styled.Stepper>

        <Styled.ContentGrid>
          <Styled.MainCard>
            {step === 1 && (
              <>
                <Typography
                  sx={{
                    color: "#102A56",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Selecione a especialidade
                </Typography>

                <Typography color="text.secondary" sx={{ fontSize: "0.78rem" }}>
                  Escolha a área médica para encontrar os profissionais
                  disponíveis.
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ position: "relative" }}
                >
                  <Search
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "0.8rem",
                      zIndex: 1,
                      color: "text.secondary",
                      fontSize: "1.1rem",
                      transform: "translateY(-50%)",
                    }}
                  />

                  <Styled.SearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar especialidade"
                    style={{
                      paddingLeft: "2.5rem",
                    }}
                  />
                </Stack>

                {isLoadingSpecialties && (
                  <Typography
                    color="text.secondary"
                    sx={{
                      marginTop: "1rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    Carregando especialidades...
                  </Typography>
                )}

                {specialtiesError && (
                  <Typography
                    color="error"
                    sx={{
                      marginTop: "1rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    {specialtiesError}
                  </Typography>
                )}

                {!isLoadingSpecialties &&
                  !specialtiesError &&
                  filteredSpecialties.length === 0 && (
                    <Typography
                      color="text.secondary"
                      sx={{
                        marginTop: "1rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      Nenhuma especialidade encontrada.
                    </Typography>
                  )}

                {!isLoadingSpecialties &&
                  !specialtiesError &&
                  filteredSpecialties.length > 0 && (
                    <Styled.SpecialtyGrid>
                      {filteredSpecialties.map((specialty) => (
                        <Styled.SpecialtyCard
                          key={specialty.id}
                          selected={booking.specialty?.id === specialty.id}
                          onClick={() => selectSpecialty(specialty.id)}
                        >
                          <Styled.SelectionIcon>
                            <Healing />
                          </Styled.SelectionIcon>

                          <Stack>
                            <Typography
                              sx={{
                                fontSize: "0.85rem",
                                fontWeight: 700,
                              }}
                            >
                              {specialty.name}
                            </Typography>

                            <Typography
                              color="text.secondary"
                              sx={{
                                marginTop: "0.3rem",
                                fontSize: "0.7rem",
                                lineHeight: 1.4,
                              }}
                            >
                              {specialty.description ||
                                "Especialidade disponível para agendamento."}
                            </Typography>
                          </Stack>
                        </Styled.SpecialtyCard>
                      ))}
                    </Styled.SpecialtyGrid>
                  )}
              </>
            )}

            {step === 2 && (
              <>
                <Typography
                  sx={{
                    color: "#102A56",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Selecione o profissional
                </Typography>

                <Typography color="text.secondary" sx={{ fontSize: "0.78rem" }}>
                  Profissionais disponíveis em {booking.specialty?.name}.
                </Typography>

                {filteredProfessionals.length === 0 && (
                  <Typography
                    color="text.secondary"
                    sx={{
                      marginTop: "1rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    Nenhum profissional disponível para esta especialidade.
                  </Typography>
                )}

                <Styled.ProfessionalList>
                  {filteredProfessionals.map((professional) => (
                    <Styled.ProfessionalCard
                      key={professional.id}
                      selected={booking.professional?.id === professional.id}
                      onClick={() => selectProfessional(professional.id)}
                    >
                      <Styled.ProfessionalAvatar>
                        {getInitials(professional.name)}
                      </Styled.ProfessionalAvatar>

                      <Stack>
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            fontWeight: 700,
                          }}
                        >
                          {professional.name}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "0.72rem" }}
                        >
                          {professional.specialty}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "0.68rem" }}
                        >
                          {professional.registration}
                        </Typography>
                      </Stack>
                    </Styled.ProfessionalCard>
                  ))}
                </Styled.ProfessionalList>
              </>
            )}

            {step === 3 && (
              <>
                <Typography
                  sx={{
                    color: "#102A56",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Escolha a data e o horário
                </Typography>

                <Typography color="text.secondary" sx={{ fontSize: "0.78rem" }}>
                  Selecione um dos horários disponíveis.
                </Typography>

                <Styled.DateGrid>
                  {availableDates.map((date) => (
                    <Styled.DateCard
                      key={date.value}
                      selected={booking.date === date.value}
                      onClick={() => selectDate(date.value)}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                        }}
                      >
                        {date.label}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {date.weekday}
                      </Typography>
                    </Styled.DateCard>
                  ))}
                </Styled.DateGrid>

                {booking.date && (
                  <>
                    <Typography
                      sx={{
                        marginTop: "1.5rem",
                        color: "#102A56",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                      }}
                    >
                      Horários disponíveis
                    </Typography>

                    <Styled.TimeGrid>
                      {availableTimes.map((time) => (
                        <Styled.TimeButton
                          key={time}
                          selected={booking.time === time}
                          onClick={() => selectTime(time)}
                        >
                          {time}
                        </Styled.TimeButton>
                      ))}
                    </Styled.TimeGrid>
                  </>
                )}
              </>
            )}

            {step === 4 && (
              <Styled.ConfirmationBox>
                <Styled.ConfirmationIcon>
                  <CheckCircle sx={{ fontSize: "2.5rem" }} />
                </Styled.ConfirmationIcon>

                <Typography
                  sx={{
                    color: "#102A56",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                  }}
                >
                  Revise sua consulta
                </Typography>

                <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                  Confira os dados antes de confirmar o agendamento.
                </Typography>

                <Stack spacing={1} sx={{ width: "100%" }}>
                  <Typography>
                    <strong>Especialidade:</strong> {booking.specialty?.name}
                  </Typography>

                  <Typography>
                    <strong>Profissional:</strong> {booking.professional?.name}
                  </Typography>

                  <Typography>
                    <strong>Data:</strong> {selectedDate?.label}
                  </Typography>

                  <Typography>
                    <strong>Horário:</strong> {booking.time}
                  </Typography>
                </Stack>
              </Styled.ConfirmationBox>
            )}

            <Styled.FooterActions>
              {step > 1 ? (
                <ButtonBlue text="Voltar" onClick={previousStep} />
              ) : (
                <span />
              )}

              {step < 4 ? (
                <ButtonBlue text="Continuar" onClick={nextStep} />
              ) : (
                <ButtonBlue
                  text="Confirmar consulta"
                  onClick={confirmAppointment}
                />
              )}
            </Styled.FooterActions>
          </Styled.MainCard>

          <Styled.SummaryCard>
            <Typography
              sx={{
                color: "#102A56",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              Sua consulta
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: "0.78rem" }}>
              Confira as informações selecionadas.
            </Typography>

            <Styled.SummaryItem>
              <Styled.SummaryIcon>
                <Healing />
              </Styled.SummaryIcon>

              <Stack>
                <Typography color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                  Especialidade
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {booking.specialty?.name || "Selecione uma especialidade"}
                </Typography>
              </Stack>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Styled.SummaryIcon>
                <Person />
              </Styled.SummaryIcon>

              <Stack>
                <Typography color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                  Profissional
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {booking.professional?.name || "Selecione um profissional"}
                </Typography>
              </Stack>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Styled.SummaryIcon>
                <CalendarToday />
              </Styled.SummaryIcon>

              <Stack>
                <Typography color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                  Data e horário
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedDate?.label || "Selecione uma data"}

                  {booking.time && ` às ${booking.time}`}
                </Typography>
              </Stack>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Styled.SummaryIcon>
                <Schedule />
              </Styled.SummaryIcon>

              <Stack>
                <Typography color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                  Status
                </Typography>

                <Typography
                  sx={{
                    color: canContinue() ? "#219653" : "text.secondary",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {step === 4 ? "Pronto para confirmar" : "Em preenchimento"}
                </Typography>
              </Stack>
            </Styled.SummaryItem>
          </Styled.SummaryCard>
        </Styled.ContentGrid>
      </Styled.Container>
    </Stack>
  );
};
