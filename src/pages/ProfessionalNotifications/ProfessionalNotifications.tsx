import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircle from "@mui/icons-material/CheckCircle";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";

import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "../PatientNotifications/PatientNotifications.styled";
import { useProfessionalNotifications } from "./ProfessionalNotifications.hook";

export const ProfessionalNotifications = () => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    reload,
    markAsRead,
    markAllAsRead,
  } = useProfessionalNotifications();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Styled.Header>
          <Typography
            variant="h4"
            sx={{ color: "#102A56", fontSize: "1.2rem", fontWeight: 700 }}
          >
            Notificações
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            Acompanhe avisos importantes sobre sua agenda e seus pacientes
          </Typography>
        </Styled.Header>

        <Stack sx={{ mt: "1.5rem" }}>
          <Styled.NotificationCard>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
            >
              <Typography
                sx={{ color: "#102A56", fontSize: "1.05rem", fontWeight: 700 }}
              >
                Recentes{unreadCount > 0 ? ` (${unreadCount} não lidas)` : ""}
              </Typography>

              {unreadCount > 0 && (
                <Button
                  variant="text"
                  onClick={markAllAsRead}
                  sx={{ fontSize: "0.75rem", textTransform: "none" }}
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

            <Stack
              spacing={1}
              sx={{ display: loading || error ? "none" : "flex" }}
            >
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
                      sx={{ fontSize: "0.76rem", lineHeight: 1.5 }}
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

                  <Styled.NotificationDate>
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
                  </Styled.NotificationDate>
                </Styled.NotificationItem>
              ))}
            </Stack>
          </Styled.NotificationCard>
        </Stack>
      </Styled.Container>
    </Stack>
  );
};