import React from "react";
import { Box, Typography, Container } from "@mui/material";

const AboutUs = () => {

  return (
    <Container>
      <Typography variant="h2" className="MuiTypography-h1">
        Hakkımızda
      </Typography>
      <Box className="MuiBox-root">
        <Typography variant="h5" className="MuiTypography-heading">
          Tarihçemiz
        </Typography>
        <Typography variant="body1" className="MuiTypography-body">
          1990 yılında kurulan PrismaBank, müşteri memnuniyeti ve finansal çözümlerde
          yenilikçi yaklaşımıyla sektörde öncü bir konuma gelmiştir. Bugün, Türkiye'nin
          dört bir yanında şubelerimiz ve dijital bankacılık hizmetlerimizle müşterilerimize
          hizmet vermekteyiz.
        </Typography>
        <Typography variant="h5" className="MuiTypography-heading">
          Misyonumuz
        </Typography>
        <Typography variant="body1" className="MuiTypography-body">
          Müşterilerimize güvenilir, hızlı ve yenilikçi finansal çözümler sunarak, onların
          hayallerini gerçekleştirmelerine yardımcı olmak.
        </Typography>
        <Typography variant="h5" className="MuiTypography-heading">
          Vizyonumuz
        </Typography>
        <Typography variant="body1" className="MuiTypography-body">
          Türkiye'nin lider dijital bankası olmak ve küresel ölçekte tanınan bir marka haline
          gelmek.
        </Typography>
        <Typography variant="h5" className="MuiTypography-heading">
          Değerlerimiz
        </Typography>
        <Typography variant="body1" className="MuiTypography-body">
          <ul>
            <li>Müşteri Odaklılık</li>
            <li>Şeffaflık</li>
            <li>Yenilikçilik</li>
            <li>Sosyal Sorumluluk</li>
          </ul>
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;