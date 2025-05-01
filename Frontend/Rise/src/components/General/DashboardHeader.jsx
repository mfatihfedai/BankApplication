import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./dashboardHeader.style.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { logoutUser } from "../../service/LogoutApi";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { decryptData } from "../Core/CryptoJS";
import { useTranslation } from "react-i18next";
import Theme from "./Theme";
import Lang from "./Lang";
import { Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "../SignIn/GeneralComponent/Transfer/transfer.style.css"
import LogoNonBackground from "../../assets/LogoNonBackground.png";
import i18n from "i18next";

function DashboardHeader() {
  const { user } = useUser();
  const [formattedDate, setFormattedDate] = useState("");
  const [rawDate, setRawDate] = useState();
  const navigate = useNavigate();
  const [time, setTime] = useState(300); // 300sn = 5dk girince tıklayana kadar olan sayaç
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Menü aç/kapat
  const [menuVisible, setMenuVisible] = useState(false);
  const [menusOpen, setMenusOpen] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const { t } = useTranslation();

  // Sayaç sıfırlama fonksiyonu
  const resetTimer = useCallback(() => {
    setTime(300); // burada ki saniye tıklandıktan sonra tetikelnen sayaç
  }, []);


  const handleToggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
      setTimeout(() => setMenusOpen(true), 10); // DOM’a görünür olduktan sonra animasyonu başlat
    } else {
      setMenusOpen(false);
      setTimeout(() => setMenuVisible(false), 50); // animasyon süresi kadar bekle, sonra DOM’dan kaldır
    }
  };

  // Kullanıcı etkinliklerini dinleme
  useEffect(() => {
    const resetEvents = ["click"];
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

  useEffect(() => {
    let interval;
    if (showModal) {
      setCountdown(10); // sayaç başlangıcı
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
  
      const timeout = setTimeout(async () => {
        await logoutUser(user);
        handleLogout();
      }, 5000); // 5 sn sonunda çıkış
  
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [showModal]);

  // Modal kapatma
  const handleLogout = () => {
    localStorage.removeItem("lastLoginTime");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const lastLoginTimeEncrypt = localStorage.getItem("lastLoginTime");
    const lastLoginTime = decryptData(lastLoginTimeEncrypt);
    const date = new Date(lastLoginTime);
    setFormattedDate(formatDateTime(lastLoginTime));
    setRawDate(date);
  }, [formattedDate]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const locale = i18n.language === "tr" ? tr : undefined;
    return format(date, "d MMMM yyyy HH:mm", { locale });
  };

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

      <div className="dashboard-header-empty"></div>
      <button
        className={`hamburger-menu ${menuOpen ? "open" : ""}`}
        onClick={() => {setMenuOpen(!menuOpen); handleToggleMenu()}}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`blur-overlay ${menusOpen ? "active" : ""}`}></div>
      {menuVisible && (
        <ul className={`list-items ${menusOpen ? "open" : ""}`}>
          <li style={{ "--i": 1 }}><Theme /></li>
          <li style={{ "--i": 2 }}><Lang /></li>
          <li style={{ "--i": 3 }}><LogoutButton /></li>
        </ul>
      )}

      <div className="dashboard-header-logout-button">
        <LogoutButton />
      </div>
      
      <Modal
        open={showModal}
        onClose={handleLogout}
        aria-labelledby="timeout-modal-title"
        aria-describedby="timeout-modal-description"
      >
        <Box className="modal">
          <img style={{maxHeight: "100px"}} src={LogoNonBackground} alt="bank_image" />
          <div>
            {<CancelIcon className="icon" sx={{color: "red"}} />}
          </div>
          <Typography variant="h6" component="h2">
            {t("IslemYapmadinizGuvenlik")}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {countdown} {t("SaniyeIcerisindeYonlendirileceksiniz")}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DashboardHeader;
