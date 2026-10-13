import CalendarToday from "@mui/icons-material/CalendarToday";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import {
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import {
  ButtonBlue,
  ButtonWhite,
} from "../../components/Buttons/Buttons";
import * as Styled from "./ProfessionalProfile.styled";
import { useProfessionalProfile } from "./ProfessionalProfile.hook";

export const ProfessionalProfile = () => {
  const {
    profile,
    availability,
    handleProfileChange,
    toggleAvailability,
    handleSave,
    handleCancel,
  } = useProfessionalProfile();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Stack>
          <Typography
            variant="h4"
            sx={{
              color: "#102A56",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            Meu perfil
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "0.8rem" }}
          >
            Gerencie suas informações profissionais
          </Typography>
        </Stack>

        <Styled.ProfileCard>
          <Styled.ProfileHeader>
            <Styled.Avatar>
              SM
            </Styled.Avatar>

            <Styled.ProfileInfo>
              <Typography
                variant="h5"
                sx={{
                  color: "#102A56",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                {profile.fullName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{fontSize:"0.9rem"}}
              >
                {profile.specialty}
              </Typography>

              <Styled.ActiveStatus>
                Ativa
              </Styled.ActiveStatus>
            </Styled.ProfileInfo>
          </Styled.ProfileHeader>

          <Styled.FormGrid>
            <Styled.Field>
              <Typography
                variant="body2"
                fontWeight={600}
              >
                Nome completo
              </Typography>

              <TextField
                size="small"
                value={profile.fullName}
                onChange={(event) =>
                  handleProfileChange(
                    "fullName",
                    event.target.value,
                  )
                }
              />
            </Styled.Field>

            <Styled.Field>
              <Typography
                variant="body2"
                fontWeight={600}
              >
                E-mail
              </Typography>

              <TextField
                size="small"
                type="email"
                value={profile.email}
                onChange={(event) =>
                  handleProfileChange(
                    "email",
                    event.target.value,
                  )
                }
                InputProps={{
                  startAdornment: (
                    <EmailOutlined
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
              <Typography
                variant="body2"
                fontWeight={600}
              >
                Telefone
              </Typography>

              <TextField
                size="small"
                value={profile.phone}
                onChange={(event) =>
                  handleProfileChange(
                    "phone",
                    event.target.value,
                  )
                }
                InputProps={{
                  startAdornment: (
                    <PhoneOutlined
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
              <Typography
                variant="body2"
                fontWeight={600}
              >
                Especialidade
              </Typography>

              <TextField
                select
                size="small"
                value={profile.specialty}
                onChange={(event) =>
                  handleProfileChange(
                    "specialty",
                    event.target.value,
                  )
                }
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Cardiologista">
                  Cardiologista
                </option>

                <option value="Dermatologista">
                  Dermatologista
                </option>

                <option value="Neurologista">
                  Neurologista
                </option>

                <option value="Ortopedista">
                  Ortopedista
                </option>
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography
                variant="body2"
                fontWeight={600}
              >
                Registro profissional
              </Typography>

              <TextField
                size="small"
                value={profile.registration}
                onChange={(event) =>
                  handleProfileChange(
                    "registration",
                    event.target.value,
                  )
                }
              />
            </Styled.Field>
          </Styled.FormGrid>

          <Styled.Actions>
            <ButtonWhite
              text="Cancelar"
              onClick={handleCancel}
            />

            <ButtonBlue
              text="Salvar alterações"
              onClick={handleSave}
            />
          </Styled.Actions>
        </Styled.ProfileCard>

        <Styled.AvailabilityCard>
          <Stack>
            <Typography
              variant="h6"
              sx={{
                color: "#102A56",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              Disponibilidade de atendimento
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Defina os dias da semana em que você está
              disponível para receber agendamentos.
            </Typography>
          </Stack>

          <Styled.AvailabilityGrid>
            {availability.map((day) => (
              <Styled.AvailabilityItem key={day.id}>
                <Styled.DayLabel>
                  <Styled.DayIcon>
                    <CalendarToday fontSize="small" />
                  </Styled.DayIcon>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.78rem" }}
                  >
                    {day.label}
                  </Typography>
                </Styled.DayLabel>

                <Styled.Switch
                  type="button"
                  enabled={day.enabled}
                  aria-label={`Alternar ${day.label}`}
                  onClick={() =>
                    toggleAvailability(day.id)
                  }
                />
              </Styled.AvailabilityItem>
            ))}
          </Styled.AvailabilityGrid>
        </Styled.AvailabilityCard>
      </Styled.Container>
    </Stack>
  );
};
