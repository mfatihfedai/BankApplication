import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Modal,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { createInvoice } from "../../../../service/InvoiceApi";

function Invoice() {
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    invoiceNo: Yup.number()
      .required("Fatura numarası zorunludur")
      .typeError("Fatura numarası yalnızca rakamlardan oluşmalıdır"),
    invoiceType: Yup.string().required("Fatura tipi seçilmelidir"),
    invoiceAmount: Yup.number()
      .required("Fatura tutarı zorunludur")
      .typeError("Fatura tutarı sayısal olmalıdır")
      .min(1, "Fatura tutarı 1'den küçük olamaz"),
    autobill: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      invoiceNo: "",
      invoiceType: "",
      invoiceAmount: "",
      autobill: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const data = {
          invoiceNo: parseInt(values.invoiceNo),
          invoiceType: values.invoiceType,
          invoiceAmount: parseFloat(values.invoiceAmount),
          autobill: values.autobill,
        };

        const response = await createInvoice(data);
        if (response.status === 200) {
          setSuccessModalOpen(true); 
        }
      } catch (error) {
        console.error("Fatura ödeme hatası:", error.message);
        setErrorMessage("Fatura ödemesi yapılamadı. Lütfen tekrar deneyiniz.");
        setErrorModalOpen(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      {/* Başarılı Modal */}
      <Modal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography id="success-modal-title" variant="h6" fontWeight="bold">
            Fatura Başarıyla Ödendi!
          </Typography>
          <Button
            sx={{ mt: 2, backgroundColor: "#00333D" }}
            variant="contained"
            onClick={() => {
              setSuccessModalOpen(false);
              formik.resetForm();
            }}
          >
            Kapat
          </Button>
        </Box>
      </Modal>

      {/* Hata Modal */}
      <Modal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography id="error-modal-title" variant="h6" color="error" fontWeight="bold">
            Hata
          </Typography>
          <Typography id="error-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
          <Button
            sx={{ mt: 2, backgroundColor: "#ff1744" }}
            variant="contained"
            onClick={() => setErrorModalOpen(false)}
          >
            Kapat
          </Button>
        </Box>
      </Modal>

      {/* Fatura Formu */}
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            margin: "50px auto",
            padding: 4,
            borderRadius: 4,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(to right, #ece9e6, #ffffff)",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            Fatura Öde
          </Typography>

          {/* Fatura Numarası */}
          <TextField
            margin="normal"
            fullWidth
            id="invoiceNo"
            name="invoiceNo"
            label="Fatura Numarası"
            value={formik.values.invoiceNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.invoiceNo && Boolean(formik.errors.invoiceNo)}
            helperText={formik.touched.invoiceNo && formik.errors.invoiceNo}
          />

          {/* Fatura Tipi */}
          <InputLabel id="invoiceType-label">Fatura Tipi</InputLabel>
          <Select
            labelId="invoiceType-label"
            id="invoiceType"
            name="invoiceType"
            value={formik.values.invoiceType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.invoiceType && Boolean(formik.errors.invoiceType)}
            fullWidth
          >
            <MenuItem value="Doğalgaz">Doğalgaz</MenuItem>
            <MenuItem value="Elektrik">Elektrik</MenuItem>
            <MenuItem value="Su">Su</MenuItem>
            <MenuItem value="Telefon">Telefon</MenuItem>
          </Select>
          {formik.touched.invoiceType && formik.errors.invoiceType && (
            <Typography color="error">{formik.errors.invoiceType}</Typography>
          )}

          {/* Fatura Tutarı */}
          <TextField
            margin="normal"
            fullWidth
            id="invoiceAmount"
            name="invoiceAmount"
            label="Fatura Tutarı (₺)"
            type="number"
            value={formik.values.invoiceAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.invoiceAmount && Boolean(formik.errors.invoiceAmount)
            }
            helperText={
              formik.touched.invoiceAmount && formik.errors.invoiceAmount
            }
          />

          {/* Otomatik Ödeme */}
          <FormControlLabel
            control={
              <Switch
                id="autobill"
                name="autobill"
                checked={formik.values.autobill}
                onChange={formik.handleChange}
              />
            }
            label="Otomatik Ödeme Talimatı"
          />
          {/* Otomatik Ödeme Bilgilendirme */}
          {formik.values.autobill && (
            <Typography
              sx={{ fontSize: "14px", color: "gray", marginTop: "-10px" }}
            >
              Ödemeleriniz her ayın 1. günü ilk ödeme miktarınıza bağlı bir
              miktarda yapılacaktır.
            </Typography>
          )}

          {/* Gönder Butonu */}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            sx={{
              backgroundColor: "var(--color-blue)",
              color: "#ffffff",
              fontFamily: "Montserrat",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "var(--color-blue)",
              },
            }}
          >
            Faturayı Öde
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
}

export default Invoice;
