import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { getLastFourInvoice, updateAutobill } from '../../../../service/InvoiceApi';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import "./AutomaticPayments.css";
import LogoNonBackground from "../../../../assets/LogoNonBackground.png"
import i18n from "i18next";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useUser } from '../../../../context/UserContext';

function InvoiceDetailsModal({ open, onClose, invoice }) {
  const [localAutobill, setLocalAutobill] = useState(invoice.autobill);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [modalInfo, setModalInfo] = useState();
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:768px)');
  const { user }  = useUser();
  const isDemo = user.email === "demoprismabank@gmail.com";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getLastFourInvoice(invoice.invoiceNo);
      const formattedDatas = response.data.map((item) => ({
        id: item.id,
        month: formatDateTime(item.payDate),
        [t("Odemeler")]: item.invoiceAmount,
      }));
      setDatas(formattedDatas);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const locale = i18n.language === "tr" ? tr : undefined;
    return format(date, "MMM yy", { locale });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
    if (!isChecked) {
      setConfirmationOpen(true);
    } else {
      setLocalAutobill(true);
    }
  };

  const confirmCancel = () => {
    setLocalAutobill(false);
    setConfirmationOpen(false);
  };

  const handleSave = async () => {
    try {
      const response = await updateAutobill(invoice.id, localAutobill);
      if(response.status === 200) {
        setModalInfo(t("OdemeTalimatiGuncellendi"));
        setSaveConfirmationOpen(true);
      }
    } catch(error) {
      console.error('Error updating autobill:', error);
      setModalInfo(t("GuncellemeHatasi"));
      setSaveConfirmationOpen(true);
    }
  };

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: isMobile ? '95vw' : 600, boxShadow: 24, p: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: '800' }}>
          {t("FaturaDetaylari")}
        </Typography>

        <div className='grid-container'>
            <Typography id="div1">{t("SonIslemTarihi")}:</Typography>
            <Typography id="div2">{invoice.payDate}</Typography>
            <Typography id="div3">{t("FaturaTipi")}:</Typography>
            <Typography id="div4">{invoice.invoiceType}</Typography>
            <Typography id="div5">{t("FaturaNumarasi")}:</Typography>
            <Typography id="div6">{invoice.invoiceNo}</Typography>
            <Typography id="div7">{t("SonOdenenTutar")}:</Typography>
            <Typography id="div8">{invoice.amount}</Typography>
            <Typography id="div9">{t("OtomatikOdemeTalimati")}:</Typography>
            <Switch sx={{
              gridArea: "5 / 2 / 6 / 3",
              justifySelf: "right"
            }} checked={localAutobill} onChange={handleSwitchChange} />
        </div>

        <Box sx={{ mt: 2, boxShadow: "0 0 0 0 !important", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2, fontSize: isMobile ? '1rem' : '1.5rem' }}>
            {t("SonOdemelerGrafigi")}
          </Typography>
          <BarChart
            width={isMobile ? 300 : 500} // Adjust chart size for mobile
            height={isMobile ? 200 : 300}
            data={datas}
            loading={loading}
            margin={{
              top: 10,
              right: isMobile ? 10 : 0, // Adjust margins for mobile
              left: isMobile ? -30 : -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Bar dataKey={t("Odemeler")} fill="var(--color-primary)" />
          </BarChart>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: isMobile ? '1rem' : 0, boxShadow: "0 0 0 0 !important", }}>
          <Button variant="contained" sx={{ width: isMobile ? '100%' : 'auto' }} disabled={isDemo} onClick={handleSave}>{t("Kaydet")}</Button>
          <Button variant="contained" sx={{ width: isMobile ? '100%' : 'auto' }} onClick={onClose}>{t("Kapat")}</Button>
        </Box>

        {/* Onay Dialogları */}
        <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
          <DialogTitle variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: '600' }}>{t("OtomatikOdemeIptali")}</DialogTitle>
          <DialogContent>
            <Typography>{t("OtomatikOdemeIptalOnay")}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmCancel}>{t("Evet")}</Button>
            <Button onClick={() => setConfirmationOpen(false)}>{t("Hayir")}</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={saveConfirmationOpen}
        onClose={() => { setSaveConfirmationOpen(false), onClose() }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}>
          <img style={{height: "100px", width: "100px"}} src={LogoNonBackground} alt="bank_image" />
            <CheckCircleIcon sx={{color: "green", fontSize:"50px"}} />
            <DialogContent>
              <Typography>{modalInfo}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setSaveConfirmationOpen(false), onClose() }}>{t("Tamam")}</Button>
            </DialogActions>
        </div>
        </Dialog>
      </Box>
    </Modal>
  );
}

export default InvoiceDetailsModal;