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
  DialogContentText,
  DialogActions,
  Tooltip,
} from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { getLastFourInvoice, updateAutobill } from '../../../../service/InvoiceApi';
import { useTranslation } from 'react-i18next';

function InvoiceDetailsModal({ open, onClose, invoice }) {
  const [localAutobill, setLocalAutobill] = useState(invoice.autobill);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [modalTitle, setModalTitle] = useState();
  const [modalInfo, setModalInfo] = useState();
  const { t } = useTranslation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getLastFourInvoice(invoice.invoiceNo);
      const formattedDatas = response.data.map((item) => ({
        id: item.id,
        month: new Date(item.payDate).toLocaleString('tr-TR', { dateStyle: 'medium' }),
        ödeme: item.invoiceAmount,
      }));
      setDatas(formattedDatas);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
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
        setModalTitle("Başarılı");
        setModalInfo("Ödeme başarılı bir şekilde kaydedildi.");
        setSaveConfirmationOpen(true);
      }
    } catch(error) {
      console.error('Error updating autobill:', error);
      setModalTitle("Hata");
      setModalInfo("Bir hata oluştu. Lütfen yeniden deneyiniz.");
      setSaveConfirmationOpen(true);
    }
  };

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: '800' }}>
          {t("FaturaDetaylari")}
        </Typography>
        <Box
          sx={{
            border: 'solid',
            borderColor: 'black',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',

          }}
        >
          <Typography>{t("SonIslemTarihi")}:</Typography> <Typography sx={{ textAlign: 'right' }}> {invoice.payDate}</Typography>
          <Typography>{t("FaturaTipi")}:</Typography> <Typography sx={{ textAlign: 'right' }}> {invoice.invoiceType}</Typography>
          <Typography>{t("FaturaNumarasi")}:</Typography> <Typography sx={{ textAlign: 'right' }}> {invoice.invoiceNo}</Typography>
          <Typography>{t("SonOdenenTutar")}:</Typography> <Typography sx={{ textAlign: 'right' }}> {invoice.amount}</Typography>
          <Typography>{t("OtomatikOdemeTalimati")}:</Typography><Switch sx={{ marginLeft: '9.5rem' }} checked={localAutobill} onChange={handleSwitchChange} />
        </Box>

        <Box sx={{ mt: 2, boxShadow: "0 0 0 0 !important" }}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
            {t("SonOdemelerGrafigi")}
          </Typography>
          <BarChart
            width={500}
            height={300}
            data={datas}
            loading={loading}
            color={"var(--color-yellow)"}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Bar dataKey="ödeme" fill="var(--color-primary)" />
          </BarChart>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', boxShadow: "0 0 0 0 !important", }}>
          <Button variant="contained" onClick={handleSave}>{t("Kaydet")}</Button>
          <Button variant="contained" onClick={onClose}>{t("Kapat")}</Button>
        </Box>

        {/* Onay Dialogları */}
        <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
          <DialogTitle variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: '600' }}>{t("OtomatikOdemeIptali")}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: 'black' }}>{t("OtomatikOdemeIptalOnay")}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='success' onClick={confirmCancel}>{t("Evet")}</Button>
            <Button variant='contained' color='error' onClick={() => setConfirmationOpen(false)}>{t("Hayir")}</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={saveConfirmationOpen} onClose={() => { setSaveConfirmationOpen(false), onClose() }}>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{modalInfo}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setSaveConfirmationOpen(false), onClose() }}>{t("Tamam")}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
}

export default InvoiceDetailsModal;