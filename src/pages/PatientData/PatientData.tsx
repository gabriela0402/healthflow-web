import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import { getInitials } from "./PatientData.utils";
import { MenuItem } from "@mui/material";

import {
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./PatientData.styled";
import { usePatientData } from "./PatientData.hook";

export const PatientData = () => {
  const {
    form,
    isLoading,
    isSaving,
    isDirty,
    error,
    reload,
    handleChange,
    handleSave,
    handleCancel,
  } = usePatientData();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Styled.Header>
          <Typography
            variant="h4"
            sx={{
              color: "#102A56",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            Meus dados
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            Mantenha suas informações pessoais atualizadas
          </Typography>
        </Styled.Header>

        {isLoading ? (
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
            <Styled.Card>

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
                    disabled
                    helperText="O e-mail é usado no login e não pode ser alterado."
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
                  <Typography variant="body2" fontWeight={600}>
                    Telefone
                  </Typography>

                  <TextField
                    size="small"
                    value={form.phone}
                    onChange={(event) =>
                      handleChange("phone", event.target.value)
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
                    onChange={(event) =>
                      handleChange("gender", event.target.value)
                    }
                  >
                    <MenuItem value="">Não informado</MenuItem>
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
                    onChange={(event) =>
                      handleChange("cpf", event.target.value)
                    }
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
                    InputProps={{
                      startAdornment: (
                        <LocationOnOutlined
                          sx={{
                            mr: 1,
                            color: "text.secondary",
                            fontSize: "1.1rem",
                          }}
                        />
                      ),
                    }}
                  />
                </Styled.FullWidthField>
              </Styled.FormGrid>

              <Styled.Actions>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={!isDirty || isSaving}
                  sx={{ minWidth: "130px", textTransform: "none" }}
                >
                  Cancelar
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={!isDirty || isSaving}
                  sx={{ minWidth: "160px", textTransform: "none" }}
                >
                  {isSaving ? "Salvando..." : "Salvar alterações"}
                </Button>
              </Styled.Actions>
            </Styled.Card>

            <Styled.Card>
              <Stack spacing={0.3}>
                <Typography
                  sx={{
                    color: "#102A56",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Contato de emergência
                </Typography>

                <Typography color="text.secondary" sx={{ fontSize: "0.78rem" }}>
                  Informe alguém para contato em situações de emergência.
                </Typography>
              </Stack>

              <Styled.FormGrid>
                <Styled.Field>
                  <Typography variant="body2" fontWeight={600}>
                    Nome do contato
                  </Typography>

                  <TextField
                    size="small"
                    value={form.emergencyContactName}
                    onChange={(event) =>
                      handleChange("emergencyContactName", event.target.value)
                    }
                  />
                </Styled.Field>

                <Styled.Field>
                  <Typography variant="body2" fontWeight={600}>
                    Telefone do contato
                  </Typography>

                  <TextField
                    size="small"
                    value={form.emergencyContactPhone}
                    onChange={(event) =>
                      handleChange("emergencyContactPhone", event.target.value)
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
              </Styled.FormGrid>
            </Styled.Card>
            <Styled.Actions sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={!isDirty || isSaving}
                sx={{ minWidth: "130px", textTransform: "none" }}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!isDirty || isSaving}
                sx={{ minWidth: "160px", textTransform: "none" }}
              >
                {isSaving ? "Salvando..." : "Salvar alterações"}
              </Button>
            </Styled.Actions>
          </>
        )}
      </Styled.Container>
    </Stack>
  );
};
