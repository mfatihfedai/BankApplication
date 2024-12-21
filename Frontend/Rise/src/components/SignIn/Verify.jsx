import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { TextField, Button, Box, Typography } from "@mui/material";
import Logo from "../Home/Logo/Logo";
import LinearProgressBar from "../General/LinearProgressBar";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const { user } = useUser();
  const email = user?.email;
  const maskedEmail = maskEmail(email);

  // Sayaç için useEffect
  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/"); // Sayaç sıfırlanınca anasayfaya gidiyo
    }
  }, [counter, navigate]);

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
  function maskEmail(email) {
    //TALHA DID IT :)
    const [localPart, domain] = email.split("@");
    const maskedLocalPart =
      localPart.substring(0, 1) + "*".repeat(localPart.length - 2);
    return `${maskedLocalPart}@${domain}`;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            color: "var(--color-black)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 600,
            margin: "0 auto",
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            fontFamily: "Montserrat",
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
            <Logo />
            <br />
            {`Sayın ${user?.name} ${user?.surname} `}
          </Typography>
          <Typography
            sx={{ color: "gray", margin: 1, textAlign: "center" }}
            variant="h6"
          >
            {`${maskedEmail} adresinize gönderilen kodu doğrulamak için`}
            {counter > 0 ? (
              <>
                {" "}
                <Typography
                  component="span"
                  sx={{ 
                    color: counter <= 10 ? "red" : "var(--color-black)",
                    animation: counter <= 10 ? "pulse 0.5s infinite" : "none", 
                    fontWeight: "bold",
                    display: "inline-block", }}
                >
                  {counter}
                </Typography>{" "}
                saniye var.
              </>
            ) : (
              " süre doldu."
            )}
          </Typography>
          <TextField
            label="Doğrulama Kodu"
            name="verifyCode"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            InputLabelProps={{
              style: { color: "var(--color-blue)", fontFamily: "Montserrat" }, // Label rengi ve fontu
            }}
            sx={{
              marginBottom: 3,
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
          {error && <p style={{ color: "red" }}>{error}</p>}

          <LinearProgressBar initialSecond={60} />

          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            disabled={counter === 0} // Sayaç 0 olunca butonu devre dışı bırak
            sx={{
              marginBottom: 3,
              backgroundColor: "var(--color-blue)",
              color: "var(--color-white)",
              "&:hover": {
                backgroundColor: "var(--color-white)",
                color: "var(--color-blue)",
              },
            }}
          >
            Doğrula
          </Button>

          {/* Sayaç sıfır olduğunda uyarı
          {counter === 0 && (
            <Typography style={{ color: "red", textAlign: "center" }}>
              Süre doldu, yeniden doğrulama kodu isteyin.
            </Typography>
          )} */}
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
