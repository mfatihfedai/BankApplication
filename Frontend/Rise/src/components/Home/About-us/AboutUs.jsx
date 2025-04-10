import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "./AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleMainPage = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" className="about-container">
      <ArrowBackIosNewIcon onClick={handleMainPage} className="back-icon" />
      <Typography variant="h3" className="about-title">
        {t("Hakkimizda")}
      </Typography>
      <Box className="about-section">
        <Typography variant="h5" className="section-heading">
          {t("Tarihcemiz")}
        </Typography>
        <Typography variant="body1" className="section-text">
          {t("TarihceMetni")}
        </Typography>

        <Typography variant="h5" className="section-heading">
          {t("Misyonumuz")}
        </Typography>
        <Typography variant="body1" className="section-text">
          {t("MisyonMetni")}
        </Typography>

        <Typography variant="h5" className="section-heading">
          {t("Vizyonumuz")}
        </Typography>
        <Typography variant="body1" className="section-text">
          {t("VizyonMetni")}
        </Typography>

        <Typography variant="h5" className="section-heading">
          {t("Degerlerimiz")}
        </Typography>
        <ul className="values-list">
          <li>{t("MusteriOdaklilik")}</li>
          <li>{t("Seffaflik")}</li>
          <li>{t("Yenilikcilik")}</li>
          <li>{t("SosyalSorumluluk")}</li>
        </ul>
      </Box>
    </Container>
  );
};

export default AboutUs;
