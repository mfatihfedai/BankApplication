import { useEffect, useState } from "react";
import './transferModal.style.css'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAdminMenu } from "../../../../context/AdminMenuContext";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center", 
};

const iconStyle = (color) => ({
  fontSize: 60,
  color: color,
  animation: "pop-in 1s ease",
});

export default function TransferModal({ open, handleClose, message, success }) {
  const { setComponentName } = useAdminMenu();
  const [countdown, setCountdown] = useState(3); 
  const { t } = useTranslation();

  useEffect(() => {
    let timer;
    if (open && success) {
      // Geri sayım başlat
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(timer); 
          setComponentName("Home"); 
          return 0;
        });
      }, 1000); 
    }

    return () => {
      clearInterval(timer); 
    };
  }, [open, success, setComponentName]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={!success && handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
        <img style={{maxHeight: "100px"}} src="../../../../../../src/assets/LogoNonBackground.png" alt="bank_image" />
          <div>
            {success ? (
              <CheckCircleIcon sx={iconStyle("green")} />
            ) : (
              <CancelIcon sx={iconStyle("red")} />
            )}
          </div>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {success ? t("TransferBasarili") : t("TransferBasarisiz")}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          {success && (
            <Typography id="transition-modal-countdown" sx={{ mt: 2 }}>
              {countdown} {t("SaniyeIcerisindeYonlendirileceksiniz")}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
