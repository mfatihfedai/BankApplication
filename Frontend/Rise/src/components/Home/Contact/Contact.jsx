import React, { useState } from "react";
import { useNavigate } from "react-router";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleMainPage = () => {
    navigate("/")
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        minHeight: "92vh",
      }}
    >
      <Container maxWidth="lg">
      <ArrowBackIosNewIcon
        onClick={handleMainPage}
        className="back-icon"
      />
        <Grid
          container
          spacing={4}
          justifyContent="center"
          borderRadius={2}
          padding={4}
        >
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {t("Iletisim")}
            </Typography>
            <Typography variant="body1">{t("IletisimAltBaslik")}</Typography>
            <Box mt={4}>
              <Typography variant="h6" fontWeight="bold">
                {t("LokasyonBaslik")}
              </Typography>
              <Typography variant="body2">
                {t("LokasyonDetay")}
              </Typography>

              <Typography variant="h6" fontWeight="bold" mt={3}>
                {t("TelefonBaslik")}
              </Typography>
              <Typography variant="body2">
                {t("TelefonNumarasi")}
              </Typography>

              <Typography variant="h6" fontWeight="bold" mt={3}>
                {t("EmailBaslik")}
              </Typography>
              <Typography variant="body2">{t("EmailAdresi")}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                border: "1px solid var(--color-box-border)",
                background: "var(--color-box-background)",
              }}
            >
              <form>
                <TextField
                  label={t("FormAd")}
                  name="name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  label={t("FormEmail")}
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  label={t("FormTelefon")}
                  name="phone"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <TextField
                  label={t("FormMesaj")}
                  name="message"
                  multiline
                  rows={5}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button type="submit" 
                href={`mailto:info@yourdomain.com?subject=Contact&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`}
                variant="contained" fullWidth sx={{ mt: 2 }}>
                  {t("FormGonder")}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
