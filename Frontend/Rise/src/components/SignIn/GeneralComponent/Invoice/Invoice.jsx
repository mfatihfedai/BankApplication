import React, { useState, useEffect } from "react";
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
  Fade,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Backdrop from "@mui/material/Backdrop";
import CancelIcon from "@mui/icons-material/Cancel";
import { createInvoice } from "../../../../service/InvoiceApi";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { useAdminMenu } from "../../../../context/AdminMenuContext";
import './invoice.css'

function Invoice() {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3); 
  const { setComponentName } = useAdminMenu();
  const [modalInfo, setModalInfo] = useState();
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const iconStyle = (color) => ({
    fontSize: 60,
    color: color,
    animation: "pop-in 1s ease",
  });

  const handleClose = () => {
    setShowModal(false); // Modal'ı kapat
  };
  
  useEffect(() => {
    let timer;
    if (showModal && success) {
      // Geri sayım başlat
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(timer); 
          setComponentName("Home"); 
          return 0;
        });
      }, 1000); 
    }

    return () => {
      clearInterval(timer); 
    };
  }, [showModal, success, setComponentName]);
  
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
          setShowModal(true);
          setSuccess(true);
        }
      } catch (error) {
        console.error("Fatura ödeme hatası:", error.message);
        setShowModal(true);
        setModalInfo("Fatura ödemesi yapılamadı. Lütfen tekrar deneyiniz.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showModal}
      onClose={!success && handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showModal}>
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center", 
        }}>
        <img style={{maxHeight: "100px"}} src="../../../../../../src/assets/LogoWithName.png" alt="bank_image" />
          <div>
            {success ? (
              <GridCheckCircleIcon sx={iconStyle("green")} />
            ) : (
              <CancelIcon sx={iconStyle("red")} />
            )}
          </div>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Fatura Ödeme {success ? "Başarılı" : "Başarısız"}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {modalInfo}
          </Typography>
          {success && (
            <Typography id="transition-modal-countdown" sx={{ mt: 2 }}>
              {countdown} saniye içinde anasayfaya yönlendiriliyorsunuz...
            </Typography>
          )}
        </Box>
      </Fade>
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
