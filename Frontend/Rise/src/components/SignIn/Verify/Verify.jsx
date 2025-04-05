import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { TextField, Button, Box, Typography } from "@mui/material";
import LinearProgressBar from "../../General/LinearProgressBar";
import { verifyUser } from "../../../service/VerifyApi";
import "./verify.style.css"
import { useTranslation } from "react-i18next";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const { user } = useUser();
  const email = user?.email;
  const maskedEmail = maskEmail(email);
  const { t } = useTranslation();

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
    try {
      const response = await verifyUser(otp, id)

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
    
      const [localPart, domain] = email.split("@");
      if(localPart.length > 1){
        const maskedLocalPart =
        localPart.substring(0, 1) + "*".repeat(localPart.length - 1);
        return `${maskedLocalPart}@${domain}`;
      }
      return email;
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
        className = "verify"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 600,
            margin: "0 auto",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "var(--color-box-background)",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            <h1 style={{fontSize:"35px", paddingTop:"1rem", textDecoration:"underline"}}>PRISMA BANK</h1>
            {t("Sayin")} {`${user?.name} ${user?.surname} `}
          </Typography>
          <Typography
            sx={{ color: "gray", margin: 1, textAlign: "center" }}
            variant="h6"
          >
            {`${maskedEmail} `}{t("AdreseGonderilenKod")}
            {counter > 0 ? (
              <>
                {" "}
                <Typography
                  component="span"
                  sx={{ 
                    color: counter <= 10 ? "red" : "var(--color-text)",
                    animation: counter <= 10 ? "pulse 0.5s infinite" : "none", 
                    fontWeight: "bold",
                    display: "inline-block", }}
                >
                  {counter}
                </Typography>{" "}
                {t("SaniyeVar")}
              </>
            ) : (
              " süre doldu."
            )}
          </Typography>
          <TextField
            label={t("DogrulamaKodu")}
            name="verifyCode"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            InputLabelProps={{
              style: {fontFamily: "Montserrat" }, // Label rengi ve fontu
            }}
            sx={{
              marginBottom: 3,
            }}
          />
          {error && <p style={{ color: "var(--color-red)" }}>{error}</p>}

          <LinearProgressBar initialSecond={60} />

          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            disabled={counter === 0} // Sayaç 0 olunca butonu devre dışı bırak
            sx={{
              marginBottom: 3,
            }}
          >
            {t("Dogrula")}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Verify;
