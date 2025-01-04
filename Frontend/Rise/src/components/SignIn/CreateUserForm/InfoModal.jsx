import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const InfoModal = ({ open, onClose, title, content }) => {
  const handleAccept = () => onClose(true);
  const handleDecline = () => onClose(false);

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
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            fullWidth
          >
            Kabul Ediyorum
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDecline}
            fullWidth
          >
            Kabul Etmiyorum
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default InfoModal;
