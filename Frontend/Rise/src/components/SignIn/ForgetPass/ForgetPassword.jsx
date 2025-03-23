import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgetPass } from "../../../service/ForgetPassApi";
import "./forgetPassword.css"
import { useTheme } from "../../../context/ThemeContext";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation();

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
        setUserNotFound(false);
        setSuccess(false);
        const response = await forgetPass(values.email);
        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
        } else if(response.status === 404) {
          setUserNotFound(true);
        }
        else {
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
    <div className= {`forget-password ${theme === "dark" ? "dark" : ""}`}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 600,
            height: 530,
            margin: "auto",
            padding: 4,
            borderRadius: 4,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: theme === "dark" ? "#333333" : "linear-gradient(to right, #ece9e6, #ffffff)",
            color: theme === "dark" ? "#ffffff" : "#000000",
          }}
        >
          <Link href="/" style={{ marginBottom:"-25px", paddingTop:"10px"}}>
          <ArrowBackIosNewIcon
            style={{
              color: theme === "dark" ? "#ffffff" : "var(--color-blue)",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          </Link>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: theme === "dark" ? "var(--color-white)" : "var(--color-blue)" }}
          >
            {t("SifreniziMiUnuttunuz")}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            className="forget-password-subtitle"
            sx={{ color: theme === "dark" ? "#ffffff" : "var(--color-black)" }}
          >
            {t("LütfenKayitliEmailAdresiniziGirin")}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
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
            label={t("EmailAdresi")}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputLabelProps={{
              style: { 
                color: theme === "dark" ? "#ffffff" : "var(--color-black)", 
                fontFamily: "Montserrat" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "dark" ? "#ffffff" : "#3f51b5",
                },
                "&:hover fieldset": {
                  borderColor: theme === "dark" ? "#ffffff" : "#3f51b5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme === "dark" ? "#ffffff" : "#3f51b5",
                },
              },
              "& .MuiInputBase-input": {
                color: theme === "dark" ? "#ffffff" : "#000000",
              },
            }}
          />{userNotFound && (
            (<Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "var(--color-red)" }}
            >
              {t("KullaniciBulunamadi")}
            </Typography>)
          )}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            sx={{
              fontFamily: "Montserrat",
              backgroundColor: theme === "dark" ? "#555555" : "var(--color-blue)",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#777777" : "#ffffff",
                color: theme === "dark" ? "#ffffff" : "#3f51b5",
              },
            }}
          >
            {t("Gonder")}
          </LoadingButton>
          {success && (
            (<Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "var(--color-green)", marginTop: 1 }}
            >
              {t("BaşariliLütfenEmailiniziKontrolEdin")}
            </Typography>)
          )}
          {success && (
            (<Button 
              variant="outlined" 
              onClick={handleMainPage} 
              sx={{
                marginTop: 2,
                borderColor: theme === "dark" ? "#ffffff" : "var(--color-blue)",
                color: theme === "dark" ? "#ffffff" : "var(--color-blue)",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#555555" : "var(--color-blue)",
                  color: theme === "dark" ? "#ffffff" : "#ffffff",
                },
              }}
              >
                 {t("AnasayfayaDon")}
            </Button>)
          )}
        </Box>
      </form>
    </div>
  );
};

export default ForgetPassword;
