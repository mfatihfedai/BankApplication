import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const CreateModal = ({ open, onClose, selectedBank, onChange, onSubmit, formErrors }) => {
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
          width: 400,
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          position: "relative",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center", fontWeight: "800" }}>
          Yeni Banka Ekle
        </Typography>
        <Box>
          <TextField
            label="Banka Adı"
            fullWidth
            margin="normal"
            value={selectedBank.bankName}
            onChange={(e) => onChange("bankName", e.target.value)}
            error={!!formErrors.bankName}
            helperText={formErrors.bankName}
          />
          <TextField
            label="Transfer Ücreti"
            fullWidth
            margin="normal"
            value={selectedBank.transferFee}
            onChange={(e) => onChange("transferFee", e.target.value)}
            error={!!formErrors.transferFee}
            helperText={formErrors.transferFee}
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

export default CreateModal;