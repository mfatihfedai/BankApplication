import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { TextField, Button, Box, Typography } from "@mui/material";
import Logo from "../Home/Logo/Logo";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const { user, lastLoginTime } = useUser();

  // Sayaç için useEffect
  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user.id;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/verify-otp?otp=${otp}&id=${id}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        console.log(user);
        if (user.role === "ADMIN") {
          navigate(`/admin-dashboard`);
        }
        if (user.role === "USER") {
          navigate("/user-dashboard");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verification failed:", err.message);
      setError("An error occurred while verifying OTP.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 600,
            margin: "0 auto",
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 1,
            fontFamily: "Montserrat",
          }}
        >
          <Typography
            style={{ fontWeight: "bold" }}
            variant="h5"
            textAlign="center"
            gutterBottom
          >
            <Logo />
            {`Sayın ${user?.name}, `}
            {`Son girişiniz: ${lastLoginTime}`}-----
            {counter > 0 ? ` ${counter} saniye var.` : " süre doldu."}
          </Typography>

          <TextField
            label="verify"
            name="verifyCode"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter OTP"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            style={{ backgroundColor: "var(--color-blue)" }}
            disabled={counter === 0} // Sayaç 0 olunca butonu devre dışı bırak
          >
            Doğrula
          </Button>

          {/* Sayaç sıfır olduğunda uyarı */}
          {counter === 0 && (
            <Typography style={{ color: "red", textAlign: "center" }}>
              Süre doldu, yeniden doğrulama kodu isteyin.
            </Typography>
          )}
        </Box>
      </form>
      {/* <h1>Enter OTP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Verify</button>
      </form> */}
    </div>
  );
};

export default Verify;
