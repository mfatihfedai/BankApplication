import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Box, Typography, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "./Receipt.css";
import ReceiptGenerator from "./ReceiptGenerator";
import { getReceipts } from "../../../../service/ReceiptApi";
import { useUser } from "../../../../context/UserContext";
import { useTranslation } from "react-i18next";
import Loading from "../../../Core/Loading";
import i18n from "i18next";
import { tr } from "date-fns/locale";
import { format } from "date-fns";

function Receipt() {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const { t } = useTranslation();

  const formatPayDate = (dateString) => {
    const date = new Date(dateString);
    const locale = i18n.language === "tr" ? tr : undefined;
    return format(date, "d MMMM yyyy HH:mm", { locale });
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await getReceipts();
      const { items, totalElements } = response.data;
      const formattedLogs = items.flatMap((item) => {
        const invoices = item.invoiceInfoList.map((invoice) => ({
          id: `invoice-${invoice.id}`,
          payDate: formatPayDate(invoice.payDate),
          channel: "Fatura",
          description: invoice.invoiceType,
          amount: invoice.invoiceAmount,
          receipt: item.id,
          rawDate: invoice.payDate,
          type: "invoice",
        }));

        const transfers = item.transferList.map((transfer) => ({
          id: `transfer-${transfer.id}`,
          payDate: formatPayDate(transfer.transferTime),
          channel: "Havale",
          description: transfer.message,
          amount: transfer.transferAmount,
          receipt: item.id,
          rawDate: transfer.transferTime,
          type: "transfer",
          receiver: transfer.receiver,
          details: {
            payDate: formatPayDate(transfer.transferTime),
            receiver: transfer.receiverAccountNo,
            amount: transfer.transferAmount,
            messages: transfer.message,
          },
        }));

        return [...invoices, ...transfers];
      });
      formattedLogs.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

      setLogs(formattedLogs);
      setRowCount(totalElements);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const generateRandomRef = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const handleReceiptDownload = (log) => {
    const data = {
      subeCode: "0285/ÇANKAYA/ANKARA ÇAYYOLU ŞUBESİ",
      processBank: "PRISMA BANK",
      customerNo: user.accountNumber,
      taxOffice: "BAŞKENT VERGİ DAİRESİ",
      processDate: formatPayDate(log.rawDate),
      processRef: generateRandomRef(),
      currency: "TL",
      amount: log.amount,
      explanation: log.description,
      fileName: `${user.name}-${user.surname}-dekont`,
      customerName: `${user.name} ${user.surname}`,
    };

    const receipt = new ReceiptGenerator();
    receipt.generateReceipt(data);
    receipt.downloadPDF(`${user.name}-${user.surname}-dekont`);
  };

  const handleOpenDetails = (details) => {
    setSelectedDetails(details);
  };

  const handleCloseDetails = () => {
    setSelectedDetails(null);
  };

  const columns = [
    { field: "payDate", headerName: t("IslemTarihi"), sortable: true },
    { field: "channel", headerName: t("Kanal"), sortable: true },
    { field: "description", headerName: t("Aciklama"), sortable: false },
    {
      field: "amount",
      headerName: t("IslemTutari"),
      sortable: false,
      renderCell: (params) => {
        const { type, receiver, amount } = params.row;
        const isTransfer = type === "transfer";
        const fontWeight = "bold";
        let displayAmount = `-${amount}`;
        let color = "red";

        if (isTransfer && receiver) {
          color = "green";
          displayAmount = `+${amount}`;
        }
        return <span style={{ fontWeight, color }}>{displayAmount} ₺</span>;
      },
    },
    {
      field: "receipt",
      headerName: t("Dekont"),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { receiver, details } = params.row;

        if (!receiver) {
          return (
            <Button
              onClick={() => handleReceiptDownload(params.row)}
            >
              PDF
            </Button>
          );
        }

        return (
          <IconButton
            onClick={() => handleOpenDetails(details)}
          >
            <AddIcon sx={{color: "var(--color-text)"}}/>
          </IconButton>
        );
      },
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="contents">
      <h1>{t("HesapHareketleri")}</h1>
      <DataGrid
        rows={logs}
        columns={columns.map((col) => ({
          ...col,
          flex: 1,
        }))}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        disableColumnResize
        disableColumnMenu
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableVirtualization
        sortingOrder={["asc", "desc"]}
        initialState={{
          sorting: {
            sortModel: [{ field: { logs }, sort: "desc" }],
          },
        }}
        sx={{
          height: "578px"
        }}
      />
      <Modal
        open={!!selectedDetails}
        onClose={handleCloseDetails}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 600,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleCloseDetails}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedDetails && (
            <>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center", fontWeight: "800" }}
              >
                {t("HesapDetaylari")}
              </Typography>
              <Box
                sx={{
                  margin: "10px",
                  border: "solid",
                  borderColor: "black",
                  padding: "1rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gridTemplateRows: "repeat(7, 1fr)",
                  lineHeight: "1",
                }}
              >
                <Typography>{t("IslemTarihi")}:</Typography>
                <Typography sx={{ textAlign: "right", fontWeight: "600" }}>
                  {selectedDetails.payDate}
                </Typography>

                <Typography>{t("GonderenHesapNo")}:</Typography>
                <Typography sx={{ textAlign: "right", fontWeight: "600" }}>
                  {selectedDetails.receiver}
                </Typography>

                <Typography>{t("GonderilenMiktar")}:</Typography>
                <Typography
                  sx={{ textAlign: "right", color: "green", fontWeight: "600" }}
                >
                  +{selectedDetails.amount} ₺
                </Typography>

                <Typography>{t("Aciklama")}:</Typography>
                <Typography
                  sx={{
                    textAlign: "right",
                    gridRow: "span 4 / span 4",
                    fontWeight: "600",
                  }}
                >
                  {selectedDetails.messages}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Receipt;
