
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import "./signIn.style.css"

const SingIn = () => {
  return (
    <Container className="signIn" component="main" maxWidth="xs">
      <Box
        sx={{
          fontFamily: "Montserrat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat",
          }}
        >
          İnternet Şubemize Hoş Geldiniz
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="customerNumber"
            label="T.C. Kimlik/Müşteri Numarası"
            name="customerNumber"
            autoComplete="customer-number"
            autoFocus
            InputLabelProps={{
              style: { color: "var(--color-blue)", fontFamily: "Montserrat" }, // Label rengi ve fontu
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "var(--color-blue)", // Hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--color-blue)", // Focus
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{
              style: { color: "var(--color-blue)", fontFamily: "Montserrat" }, // Label rengi ve fontu
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "var(--color-blue)", // Hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--color-blue)", // Focus
                },
              },
            }}
          />
          <Box>
            <Link
              href="#"
              variant="body2"
              sx={{
                color: "var(--color-blue)",
                fontFamily: "Montserrat",
              }}
            >
              Şifremi Unuttum
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontFamily: "Montserrat",
              backgroundColor: "var(--color-blue)",
              color: "var(--color-white)",
              "&:hover": {
                backgroundColor: "var(--color-white)",
                color: "var(--color-blue)",
              },
            }}
          >
            GİRİŞ YAP
          </Button>
          <Box>
            <Link
              href="#"
              variant="body2"
              sx={{
                color: "var(--color-blue)",
                fontFamily: "Montserrat",
              }}
            >
              Müşteri Olmak İster Misiniz?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default SingIn;
