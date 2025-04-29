import { useEffect, useState } from "react";
import './transfer.style.css'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAdminMenu } from "../../../../context/AdminMenuContext";
import { useTranslation } from "react-i18next";

export default function TransferModal({ open , handleClose, message, success }) {
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
        <Box className="modal">
        <img style={{maxHeight: "100px"}} src="../../../../../../src/assets/LogoNonBackground.png" alt="bank_image" />
          <div>
            {success ? (
              <CheckCircleIcon className="icon" sx={{color: "green"}} />
            ) : (
              <CancelIcon className="icon" sx={{color: "red"}} />
            )}
          </div>
          <Typography variant="h6" component="h2">
            {success ? t("TransferBasarili") : t("TransferBasarisiz")}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {message}
          </Typography>
          {success && (
            <Typography sx={{ mt: 2 }}>
              {countdown} {t("SaniyeIcerisindeYonlendirileceksiniz")}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
