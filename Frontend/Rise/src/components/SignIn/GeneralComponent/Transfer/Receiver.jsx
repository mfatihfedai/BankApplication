import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import TransferModal from "./TransferModal";
import { createTransfer } from "../../../../service/TransferApi";
import { useReceiverFormSchema } from "../../../Schemas/ReceiverFormSchemas";
import { useTranslation } from "react-i18next";

function Receiver() {
  const { t } = useTranslation(); // i18next hook
  const [showModal, setShowModal] = useState(false);
  const [transferMessage, setTransferMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const receiverFormSchemas = useReceiverFormSchema();

  const handleClose = () => {
    setShowModal(false); // Modal'ı kapat
  };

  async function submit() {
    try {
      const transfer = {
        receiverAccountNo: values.receiverAccountNo,
        transferAmount: values.transferAmount,
        message: `${values.transferMessage}`,
        bankName: values.bankName,
        transferFee: values.transferFee,
        isReceiver: false,
      };
      await createTransfer(transfer);
      setShowModal(true);
      setSuccess(true);
      setTransferMessage(t("ParaGöndermeBasari"));
    } catch (err) {
      setShowModal(true);
      if (err.response?.data?.data === "There is no receiver account number") {
        setTransferMessage(t("LutfenHesapNumarasiniDogruGirin"));
      }
      if (err.response?.data?.data === "There is no balance") {
        setTransferMessage(t("YetersizBakiye"));
      }
      if (
        err.response?.data?.data ===
        "Can not send transfer your own account number"
      ) {
        setTransferMessage(t("KendiHesapNumarasinaHavale"));
      }
    }
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      receiverAccountNo: "",
      transferAmount: "",
      transferMessage: "",
      bankName: "Prisma Bank",
      transferFee: 1.0,
    },
    validationSchema: receiverFormSchemas,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: submit,
  });

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 700,
          margin: "20px auto",
          padding: "1rem 3rem",
          borderRadius: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          background: "var(--color-box-background)",
        }}
      >
        <TextField
          label={t("AliciHesapNo")}
          name="receiverAccountNo"
          value={values.receiverAccountNo}
          onChange={handleChange}
          type="number"
        />

        <TextField
          label={t("Tutar")}
          name="transferAmount"
          value={values.transferAmount}
          onChange={handleChange}
          type="number"
        />

        <TextField
          label={t("Aciklama")}
          name="transferMessage"
          value={values.transferMessage}
          onChange={handleChange}
          type="text"
        />

        <TextField
          disabled
          label={t("BankaAdi")}
          name="bankName"
          value={values.bankName}
          type="text"
        />

        <TextField
          disabled
          label={t("TransferUcreti")}
          name="transferFee"
          value={values.transferFee}
          type="number"
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          fullWidth
        >
          {t("Gonder")}
        </Button>
      </Box>

      {/* Transfer Modal */}
      {showModal && (
        <TransferModal
          open={showModal}
          handleClose={handleClose}
          message={transferMessage}
          success={success}
        />
      )}
    </div>
  );
}

export default Receiver;
