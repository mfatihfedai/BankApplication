import React from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import "./signIn.style.css";
import { signInUser } from "../../service/SignInApi";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUser } from "../../context/UserContext";

const SignIn = () => {
  const [identityNo, setIdentityNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [colour, setColour] = useState("");
  const [loading, setLoading] = useState(false);
  const { newUser, saveLastLoginTime } = useUser();

  const handleSignIn = () => {
    navigate("/newUser")
  }

  const handleForgetPass = () => {
    navigate("/forget-password")
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await signInUser(identityNo, password);
      if (response.data !== null) {
        const logUser = response.data.user;
        newUser(logUser);
        saveLastLoginTime(response.data.lastLoginTime);
        navigate("/verify");
      } else {
        setError("Kullanıcı adı veya şifre yanlış. Lütfen tekrar deneyiniz.");
        setColour("red");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error.message);
      setError("Kullanıcı adı veya şifre yanlış. Lütfen tekrar deneyiniz.");
      setColour("red");
    }
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
            onClick={handleForgetPass}
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
          <LoadingButton
            // type="submit"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            loading={loading}
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
          </LoadingButton>
          {error && <p style={{ color: colour }}>{error}</p>}
          <Box>
            <Link
              onClick={handleSignIn}
              href=""
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
export default SignIn;
