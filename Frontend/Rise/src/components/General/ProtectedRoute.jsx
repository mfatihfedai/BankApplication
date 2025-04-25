import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { logoutUser } from "../../service/LogoutApi";
import Backdrop from "@mui/material/Backdrop";
import { Box, Fade, Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";

const ProtectedRoute = ({ role, children }) => {
  const { user, setUser } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(5); 
  const { t } = useTranslation();

  useEffect(() => {
    if (!user || user === undefined || Object.keys(user).length === 0) {
      setIsModalVisible(true);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(timer); // Geri sayım tamamlandığında interval'i temizle
          return 0;
        });
      }, 1000);

      const timeout = setTimeout(async () => {
        await logoutUser(user);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("lastLoginTime");
        setIsModalVisible(false);
      }, 5000);

      return () => {
        clearInterval(timer); // Bileşen unmount olduğunda interval'i temizle
        clearTimeout(timeout); // Timeout'u temizle
      };
    }
  }, [user, setUser]);

  if (!user || user === undefined || Object.keys(user).length === 0) {
    return (
      <>
        <Modal
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade 
          in={isModalVisible}>
            <Box className="modal">
              <img style={{maxHeight: "100px"}} src="../../../../../../src/assets/LogoNonBackground.png" alt="bank_image" />
              <div>
                {<CancelIcon className="icon" sx={{color: "red"}} />}
              </div>
              <Typography variant="h6" component="h2">
                {t("GuvenlikNedeniyleOturum")}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                {countdown} {t("SaniyeIcerisindeYonlendirileceksiniz")}
              </Typography>
            </Box>
          </Fade>
        </Modal>
        {countdown === 0 && <Navigate to="/" replace />}
      </>
    );
  }

  // Kullanıcı yoksa ana sayfaya yönlendir
  if (!user) {
    console.log("Kullanıcı yok, yönlendiriliyor...");
    return <Navigate to="/" replace />;
  }

  if (user === undefined) {
    console.log("Undefined");
    return <Navigate to="/" replace />;
  }

  // Tüm kontrolleri geçtiyse children(App.jsx'te buluna Admin.jsx veya User.jsx) bileşenleri render et
  return children;
};

export default ProtectedRoute;
