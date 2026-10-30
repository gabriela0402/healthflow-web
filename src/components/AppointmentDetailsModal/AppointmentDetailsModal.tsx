import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import type { PatientAppointment } from "../../pages/PatientAppointments/PatientAppointments.types";
import {
  getInitials,
  getStatusLabel,
} from "../../pages/PatientAppointments/PatientAppoiments.utils";

type AppointmentDetailsModalProps = {
  open: boolean;
  appointment: PatientAppointment | null;
  onClose: () => void;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.2}>
      <Typography color="text.secondary" sx={{ fontSize: "0.72rem" }}>
        {label}
      </Typography>
      <Typography sx={{ color: "#102A56", fontSize: "0.9rem", fontWeight: 600 }}>
        {value}
      </Typography>
    </Stack>
  );
}

export function AppointmentDetailsModal({
  open,
  appointment,
  onClose,
}: AppointmentDetailsModalProps) {
  const formattedDate = appointment
    ? new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(appointment.date)
    : "";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#102A56",
          fontSize: "1.1rem",
          fontWeight: 700,
        }}
      >
        Detalhes do atendimento
        <IconButton aria-label="Fechar" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {appointment && (
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">

              <Stack>
                <Typography
                  sx={{ color: "#102A56", fontWeight: 700, fontSize: "0.95rem" }}
                >
                  {appointment.professional}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                  {appointment.specialty}
                </Typography>
              </Stack>
            </Stack>

            <DetailRow label="Data" value={formattedDate} />
            <DetailRow label="Horário" value={appointment.time} />
            <DetailRow
              label="Status"
              value={getStatusLabel(appointment.status)}
            />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}