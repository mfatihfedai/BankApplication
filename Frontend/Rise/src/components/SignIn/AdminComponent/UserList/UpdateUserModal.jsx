import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const UpdateUserModal = ({
  open,
  onClose,
  log,
  onChange,
  onSubmit,
  formErrors,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          position: "relative",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "800" }}
        >
          Kullanıcı Bilgilerini Güncelle
        </Typography>
        <Box>
          <TextField
            label="Ad"
            fullWidth
            margin="normal"
            value={log.registerName}
            onChange={(e) => onChange("userName", e.target.value)}
            error={!!formErrors.registerName}
            helperText={formErrors.registerName}
          />
          <TextField
            label="Soyad"
            fullWidth
            margin="normal"
            value={log.userSurname}
            onChange={(e) => onChange("userSurname", e.target.value)}
            error={!!formErrors.userSurname}
            helperText={formErrors.userSurname}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#00333D" }}
            onClick={onSubmit}
          >
            Kaydet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
