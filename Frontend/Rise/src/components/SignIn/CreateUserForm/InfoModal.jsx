import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const InfoModal = ({ open, onClose, title, content }) => {
  const handleAccept = () => onClose(true);
  const handleDecline = () => onClose(false);
  const { t } = useTranslation();
  
  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" margin="auto" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        {title === "Uyarı" || title === "Başarılı" ? (
          <Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAccept}
              fullWidth
            >
              {t("Kapat")}
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAccept}
              fullWidth
              sx={{
                backgroundColor: "var(--color-primary)",
                ":hover": {
                  backgroundColor: "var(--color-green-blue)",
                },
              }}
            >
              {t("KabulEdiyorum")}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDecline}
              fullWidth
              sx={{
                backgroundColor: "var(--color-red)",
              }}
            >
              {t("KabulEtmiyorum")}
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default InfoModal;
