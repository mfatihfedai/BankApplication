import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./dashboardHeader.style.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { decryptData } from "../Core/CryptoJS";
import { useTranslation } from "react-i18next";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 250,
  bgcolor: "background.paper",
  border: "2px solid var(--color-blue)",
  boxShadow: 24,
  textAlign: "center",
  pt: 2,
  px: 4,
  pb: 3,
};

function DashboardHeader() {
  const { user } = useUser();
  const [formattedDate, setFormattedDate] = useState("");
  const [rawDate, setRawDate] = useState();
  const navigate = useNavigate();
  const [time, setTime] = useState(10000); // çalışmak için arttırıldı
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  // Sayaç sıfırlama fonksiyonu
  const resetTimer = useCallback(() => {
    setTime(10000); // burası da değişecek
  }, []);

  // Kullanıcı etkinliklerini dinleme
  useEffect(() => {
    const resetEvents = ["keydown", "click", "scroll"];
    const resetOnActivity = () => resetTimer();

    resetEvents.forEach((event) =>
      window.addEventListener(event, resetOnActivity)
    );

    return () => {
      resetEvents.forEach((event) =>
        window.removeEventListener(event, resetOnActivity)
      );
    };
  }, [resetTimer]);

  // Sayaç için useEffect
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setShowModal(true); // Sayaç sıfırlandıysa modal aç
    }
  }, [time]);

  // Modal kapatma
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const lastLoginTimeEncrypt = localStorage.getItem("lastLoginTime");
    const lastLoginTime = decryptData(lastLoginTimeEncrypt);
    const date = new Date(lastLoginTime);
    setFormattedDate(format(date, "d MMMM yyyy HH:mm", { locale: tr }));
    setRawDate(date);
  }, [formattedDate]);

  // Zamanı MM:SS formatına çevirme fonksiyonu
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-role">{`${user?.role}`}</div>
      <div className="dashboard-header-welcome">
        <p>
          {t("Sayin")} {`${user?.name} ${user?.surname}`}
        </p>
        {rawDate?.getFullYear() === 1970 ? (
          <p>{t("SonGiris")}: {t("IlkGiris")}</p>
        ) : (
          <p>
            {t("SonGiris")}: {formattedDate}
          </p>
        )}
      </div>

      <div className="dashboard-header-logout-button">
        <LogoutButton />
      </div>

      <Modal
        open={showModal}
        onClose={handleLogout}
        aria-labelledby="timeout-modal-title"
        aria-describedby="timeout-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <h2 id="timeout-modal-title">{t("OturumSonlaniyor")}</h2>
          <p id="timeout-modal-description">
            {t("IslemYapmadinizGuvenlik")}
          </p>
          <Button
            onClick={handleLogout}
            variant="contained"
            style={{
              marginTop: "10px",
              color: "var(--color-white)",
              backgroundColor: "var(--color-blue)",
            }}
          >
            {t("Tamam")}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default DashboardHeader;
