<<<<<<< HEAD:Frontend/Rise/src/components/SingIn/SingIn.jsx
import React, { useState } from "react";
 import {
=======
import React from "react";
import axios from "axios";
import {
>>>>>>> 8d3529f8d82c53718face05163d9491e7e8dc8ab:Frontend/Rise/src/components/SignIn/SignIn.jsx
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

<<<<<<< HEAD:Frontend/Rise/src/components/SingIn/SingIn.jsx
import "./signIn.style.css"
import axios from "axios";

const SingIn = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        customerNumber: customerNumber,
        password: password,
      });

      // Giriş başarılıysa yanıt verilerinden token’ı alıp saklıyoruz
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Giriş başarılı");
        // Yönlendirme veya korumalı bir sayfaya geçiş yapılabilir
      }
    } catch (error) {
      setErrorMessage("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Müşteri Numarası"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
=======
import "./signIn.style.css";
import { signInUser } from "../../service/SignInApi";
import { useState } from "react";

const SignIn = () => {
  const [identityNo, setIdentityNo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    signInUser(identityNo, password);
  };

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
            value={identityNo}
            onChange={(e) => setIdentityNo(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            // type="submit"
            onClick={handleSubmit}
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
>>>>>>> 8d3529f8d82c53718face05163d9491e7e8dc8ab:Frontend/Rise/src/components/SignIn/SignIn.jsx
  );
};
export default SignIn;
