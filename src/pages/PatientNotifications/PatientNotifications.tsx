import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircle from "@mui/icons-material/CheckCircle";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";

import {
  Button,
  Stack,
  Switch,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./PatientNotifications.styled";
import { usePatientNotifications } from "./PatientNotifications.hook";

export const PatientNotifications = () => {
  const {
    notifications,
    preferences,
    unreadCount,
    loading,
    error,
    reload,
    markAsRead,
    markAllAsRead,
    togglePreference,
  } = usePatientNotifications();

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
            Notificações
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            Acompanhe avisos importantes sobre seus atendimentos
          </Typography>
        </Styled.Header>

        <Styled.ContentGrid>
          <Styled.NotificationCard>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <Typography
                sx={{
                  color: "#102A56",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                }}
              >
                Recentes{unreadCount > 0 ? ` (${unreadCount} não lidas)` : ""}
              </Typography>

              {unreadCount > 0 && (
                <Button
                  variant="text"
                  onClick={markAllAsRead}
                  sx={{
                    fontSize: "0.75rem",
                    textTransform: "none",
                  }}
                >
                  Marcar todas como lidas
                </Button>
              )}
            </Stack>

            {loading && (
              <Stack alignItems="center" sx={{ py: 4 }}>
                <CircularProgress size={26} />
              </Stack>
            )}

            {!loading && error && (
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={reload}>
                    Tentar de novo
                  </Button>
                }
              >
                {error}
              </Alert>
            )}

            {!loading && !error && notifications.length === 0 && (
              <Typography
                color="text.secondary"
                sx={{ fontSize: "0.8rem", py: 2 }}
              >
                Você não tem notificações.
              </Typography>
            )}

            <Stack spacing={1} sx={{ display: loading || error ? "none" : "flex" }}>
              {notifications.map((notification) => (
                <Styled.NotificationItem
                  key={notification.id}
                  read={notification.read}
                >
                  {!notification.read && <Styled.UnreadDot />}

                  <Styled.NotificationIcon type={notification.type}>
                    {notification.type === "appointment" && (
                      <CalendarTodayOutlined />
                    )}

                    {notification.type === "reminder" && (
                      <NotificationsNoneOutlined />
                    )}

                    {notification.type === "system" && <CheckCircle />}
                  </Styled.NotificationIcon>

                  <Styled.NotificationBody>
                    <Typography
                      sx={{
                        color: "#102A56",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                      }}
                    >
                      {notification.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: "0.76rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {notification.description}
                    </Typography>

                    {!notification.read && (
                      <Styled.MarkReadButton
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Marcar como lida
                      </Styled.MarkReadButton>
                    )}
                  </Styled.NotificationBody>

                  <Stack alignItems="flex-end" sx={{ minWidth: "90px" }}>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "0.68rem" }}
                    >
                      {notification.date}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "0.68rem" }}
                    >
                      {notification.time}
                    </Typography>
                  </Stack>
                </Styled.NotificationItem>
              ))}
            </Stack>
          </Styled.NotificationCard>

          <Styled.PreferencesCard>
            <Stack spacing={0.3}>
              <Typography
                sx={{
                  color: "#102A56",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                Preferências de notificação
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                Escolha como deseja receber nossas notificações.
              </Typography>
            </Stack>

            <Styled.PreferenceItem>
              <Stack direction="row" alignItems="center" gap={1}>
                <EmailOutlined color="primary" />

                <Stack sx={{ ml: 2 }}>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    E-mail
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "0.7rem" }}
                  >
                    Receba informações importantes por e-mail.
                  </Typography>
                </Stack>
              </Stack>

              <Switch
                checked={preferences.email}
                onChange={() => togglePreference("email")}
              />
            </Styled.PreferenceItem>

            <Styled.PreferenceItem>
              <Stack direction="row" alignItems="center" gap={1}>
                <NotificationsNoneOutlined color="primary" />

                <Stack sx={{ ml: 2 }}>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    Lembretes
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "0.7rem" }}
                  >
                    Receba lembretes das suas consultas.
                  </Typography>
                </Stack>
              </Stack>

              <Switch
                checked={preferences.reminders}
                onChange={() => togglePreference("reminders")}
              />
            </Styled.PreferenceItem>

            <Styled.PreferenceItem>
              <Stack direction="row" alignItems="center" gap={1}>
                <CalendarTodayOutlined color="primary" />

                <Stack sx={{ ml: 2 }}>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    Atualizações de consulta
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "0.7rem" }}
                  >
                    Saiba sobre confirmações e remarcações.
                  </Typography>
                </Stack>
              </Stack>

              <Switch
                checked={preferences.appointmentUpdates}
                onChange={() => togglePreference("appointmentUpdates")}
              />
            </Styled.PreferenceItem>
          </Styled.PreferencesCard>
        </Styled.ContentGrid>
      </Styled.Container>
    </Stack>
  );
};
