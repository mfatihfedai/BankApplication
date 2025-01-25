import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteModal = ({ open, onClose, onConfirm, bankName }) => {
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
          Bankayı Sil
        </Typography>
        <Typography>
          {bankName} isimli bankayı silmek istediğinize emin misiniz?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E1722F" }}
            onClick={onConfirm}
          >
            Evet
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00333D" }}
            onClick={onClose}
          >
            Hayır
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;