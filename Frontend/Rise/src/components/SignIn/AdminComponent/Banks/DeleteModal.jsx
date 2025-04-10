import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const DeleteModal = ({ open, onClose, onConfirm, bankName }) => {
  const { t } = useTranslation();

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
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          position: "relative",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center", fontWeight: "800" }}>
          {t("BankayiSil")}
        </Typography>
        <Typography>
          {bankName} {t("İsimliBankayiSil")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, boxShadow: "0 0 0 0 !important" }}>
          <Button
            onClick={onConfirm}
          >
            {t("Evet")}
          </Button>
          <Button
            onClick={onClose}
          >
            {t("Hayir")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;