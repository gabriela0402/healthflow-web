import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import Close from "@mui/icons-material/Close";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import * as Styled from "./LogoutModal.styled";
import type { LogoutModalProps } from "./LogoutModal.types";

export const LogoutModal = ({
  open,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#102A56",
          fontWeight: 700,
        }}
      >
        Confirmar saída

        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Fechar"
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Styled.Content>
          <LogoutOutlined
            sx={{
              alignSelf: "center",
              color: "primary.main",
              fontSize: "2.5rem",
            }}
          />

          <Typography
            sx={{
              color: "#102A56",
              fontSize: "1rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Deseja realmente sair?
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            Você precisará fazer login novamente para acessar
            a plataforma.
          </Typography>

          <Styled.Actions>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ textTransform: "none" }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              sx={{ textTransform: "none" }}
            >
              Sim, sair
            </Button>
          </Styled.Actions>
        </Styled.Content>
      </DialogContent>
    </Dialog>
  );
};
