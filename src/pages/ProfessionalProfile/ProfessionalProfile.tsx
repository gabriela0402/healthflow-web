import CalendarToday from "@mui/icons-material/CalendarToday";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue, ButtonWhite } from "../../components/Buttons/Buttons";
import * as Styled from "./ProfessionalProfile.styled";
import { useProfessionalProfile } from "./ProfessionalProfile.hook";

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

export const ProfessionalProfile = () => {
  const navigate = useNavigate();

  const {
    profile,
    availability,
    loading,
    saving,
    isDirty,
    error,
    reload,
    handleProfileChange,
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
            sx={{ color: "#102A56", fontSize: "1.2rem", fontWeight: 700 }}
          >
            Meu perfil
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            Gerencie suas informações profissionais
          </Typography>
        </Stack>

        {loading ? (
          <Stack alignItems="center" sx={{ py: 8 }}>
            <CircularProgress size={32} />
          </Stack>
        ) : error ? (
          <Alert
            severity="error"
            sx={{ mt: 3 }}
            action={
              <Button color="inherit" size="small" onClick={reload}>
                Tentar de novo
              </Button>
            }
          >
            {error}
          </Alert>
        ) : (
          <>
            <Styled.ProfileCard>
              <Styled.ProfileHeader>
                <Styled.Avatar>{getInitials(profile.fullName)}</Styled.Avatar>

                <Styled.ProfileInfo>
                  <Typography
                    variant="h5"
                    sx={{ color: "#102A56", fontSize: "1.1rem", fontWeight: 700 }}
                  >
                    {profile.fullName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                    {profile.specialty}
                  </Typography>
                </Styled.ProfileInfo>
              </Styled.ProfileHeader>

              <Styled.FormGrid>
                <Styled.Field>
                  <Typography variant="body2" fontWeight={600}>Nome completo</Typography>
                  <TextField
                    size="small"
                    value={profile.fullName}
                    onChange={(e) => handleProfileChange("fullName", e.target.value)}
                  />
                </Styled.Field>

                <Styled.Field>
                  <Typography variant="body2" fontWeight={600}>E-mail</Typography>
                  <TextField
                    size="small"
                    type="email"
                    value={profile.email}
                    disabled
                    helperText="O e-mail é o seu login e só o administrador pode alterá-lo."
                    InputProps={{
                      startAdornment: (
                        <EmailOutlined sx={{ mr: 1, color: "text.secondary", fontSize: "1.1rem" }} />
                      ),
                    }}
                  />
                </Styled.Field>

                <Styled.Field>
                  <Typography variant="body2" fontWeight={600}>Telefone</Typography>
                  <TextField
                    size="small"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    placeholder="(00) 00000-0000"
                    InputProps={{
                      startAdornment: (
                        <PhoneOutlined sx={{ mr: 1, color: "text.secondary", fontSize: "1.1rem" }} />
                      ),
                    }}
                  />
                </Styled.Field>

                <Styled.Field>
                  <Typography variant="body2" fontWeight={600}>Especialidade</Typography>
                  <TextField size="small" value={profile.specialty} disabled />
                </Styled.Field>

                <Styled.Field>
                  <Typography variant="body2" fontWeight={600}>Registro profissional</Typography>
                  <TextField size="small" value={profile.registration} disabled />
                </Styled.Field>
              </Styled.FormGrid>

              <Styled.Actions>
                <ButtonWhite text="Cancelar" onClick={handleCancel} disabled={!isDirty || saving} />

                <ButtonBlue
                  text={saving ? "Salvando..." : "Salvar alterações"}
                  onClick={handleSave}
                  disabled={!isDirty || saving}
                />
              </Styled.Actions>
            </Styled.ProfileCard>

            <Styled.AvailabilityCard>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
                <Stack>
                  <Typography
                    variant="h6"
                    sx={{ color: "#102A56", fontSize: "1rem", fontWeight: 700 }}
                  >
                    Disponibilidade de atendimento
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                    Dias da semana em que você tem horários cadastrados.
                  </Typography>
                </Stack>

                <Button
                  onClick={() => navigate("/my-schedule")}
                  sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                >
                  Gerenciar horários
                </Button>
              </Stack>

              <Styled.AvailabilityGrid>
                {availability.map((day) => (
                  <Styled.AvailabilityItem key={day.id}>
                    <Styled.DayLabel>
                      <Styled.DayIcon>
                        <CalendarToday fontSize="small" />
                      </Styled.DayIcon>

                      <Typography variant="body2" sx={{ fontSize: "0.78rem" }}>
                        {day.label}
                      </Typography>
                    </Styled.DayLabel>

                    <Typography
                      variant="caption"
                      sx={{
                        color: day.enabled ? "#219653" : "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      {day.enabled ? "Atende" : "Não atende"}
                    </Typography>
                  </Styled.AvailabilityItem>
                ))}
              </Styled.AvailabilityGrid>
            </Styled.AvailabilityCard>
          </>
        )}
      </Styled.Container>
    </Stack>
  );
};