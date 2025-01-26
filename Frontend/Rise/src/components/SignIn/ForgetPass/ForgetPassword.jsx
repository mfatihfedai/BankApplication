import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  Typography,
  Link,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgetPass } from "../../../service/ForgetPassApi";
import Logo from "../../Home/Logo/Logo";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir email adresi girin")
      .required("Email adresi zorunludur"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await forgetPass(values.email);
        if (response.status === 200) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (error) {
        console.error("Could not send email", error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleMainPage = () => {
    navigate("/")
  }

  return (
    <div>
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
            <br />
            Şifrenizi mi unuttunuz?
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: "gray", marginBottom: 2 }}
          >
                {/* {<p>Sayın müşterimiz, biz ki <strong>RISE BANK</strong> olarak müşterilerimizin sağlığına oldukça önem veririz.
                Sanıyoruz ki son zamanlardaki yorgunluklarınızdan dolayı bir miktar
                B12 takviyesi almaya ihtiyacınız var. Dilerseniz
                <a href="https://www.trendyol.com/sr?q=b12+vitamini&qt=b12+vitamini&st=b12+vitamini&os=1&sk=1&sst=MOST_FAVOURITE"><u><i><strong> buraya </strong></i></u></a>
                tıklayarak hemen satın alabilirsiniz. <br/><br/>
                Eğer 'Hayır ihtiyacım yok' derseniz aşağıya e-mail adresinizi girerek yeni bir şifre oluşturabilirsiniz.</p>} */}
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email Adresi"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputLabelProps={{
              style: { color: "var(--color-blue)", fontFamily: "Montserrat" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#3f51b5", // Hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5", // Focus
                },
              },
            }}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            sx={{
              fontFamily: "Montserrat",
              backgroundColor: "var(--color-blue)",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#3f51b5",
              },
            }}
          >
            Gönder
          </LoadingButton>
          {success && (
            (<Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "green", marginTop: 1 }}
            >
              Başarılı! Lütfen emailinizi kontrol edin.
            </Typography>)
          )}
          {success && (
            (<Button variant="outlined" onClick={handleMainPage} >Anasayfaya Dön</Button>)
          )}
        </Box>
      </form>
    </div>
  );
};

export default ForgetPassword;
