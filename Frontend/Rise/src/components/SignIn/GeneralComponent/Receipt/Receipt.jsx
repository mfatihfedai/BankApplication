import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Box, Typography, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "./Receipt.css";
import ReceiptGenerator from "./ReceiptGenerator";
import { getReceipts } from "../../../../service/ReceiptApi";
import { decryptData } from "../../../Core/CryptoJS";
import Logo from "../../../../assets/LogoNonBackground.png";
import "../../../Core/logo.css";

function Receipt() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const formatPayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const fetchLogs = async (currentPage) => {
    setLoading(true);
    try {
      const response = await getReceipts(currentPage);
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

      setLogs(formattedLogs);
      setRowCount(totalElements);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  const generateRandomRef = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const handleReceiptDownload = (log) => {
    const storedUser = localStorage.getItem("user");
    const user = decryptData(storedUser);
    if (!user) {
      console.error("User not found in localStorage");
      return;
    }

    const data = {
      subeCode: "0285/MERKEZ/OSMANİYE ŞUBESİ",
      processBank: "PRISMA BANK",
      customerNo: user.accountNumber,
      taxOffice: "OSMANİYE VERGİ DAİRESİ",
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
    { field: "payDate", headerName: "İşlem Tarihi", sortable: true },
    { field: "channel", headerName: "Kanal", sortable: true },
    { field: "description", headerName: "Açıklama", sortable: false },
    {
      field: "amount",
      headerName: "İşlem Tutarı",
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
      headerName: "Detaylar",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { receiver, details } = params.row;

        if (!receiver) {
          return (
            <Button
              variant="contained"
              size="medium"
              onClick={() => handleReceiptDownload(params.row)}
              sx={{
                backgroundColor: "#E1722A",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#D1611C",
                },
              }}
            >
              PDF
            </Button>
          );
        }

        return (
          <IconButton
            size="small"
            onClick={() => handleOpenDetails(details)}
            sx={{ color: "#00333D" }}
          >
            <AddIcon />
          </IconButton>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <div style={{ height: "31rem", width: "95%", padding: "20px" }}>
      <h1>HESAP HAREKETLERİM</h1>
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
            sortModel: [{ field: "payDate", sort: "desc" }],
          },
        }}
        sx={{
          height: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#00333D !important",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
            fontSize: "18px",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f1f9ff",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#ffffff",
          },
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
                Hesap Detayları
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
                <Typography>İşlem Tarihi:</Typography>{" "}
                <Typography sx={{ textAlign: "right", fontWeight: "600" }}>
                  {" "}
                  {selectedDetails.payDate}
                </Typography>
                <Typography>Gönderen Hesap No:</Typography>{" "}
                <Typography sx={{ textAlign: "right", fontWeight: "600" }}>
                  {" "}
                  {selectedDetails.receiver}
                </Typography>
                <Typography>Gönderilen Miktar:</Typography>{" "}
                <Typography
                  sx={{ textAlign: "right", color: "green", fontWeight: "600" }}
                >
                  {" "}
                  +{selectedDetails.amount} ₺
                </Typography>
                <Typography>Açıklama:</Typography>{" "}
                <Typography
                  sx={{
                    textAlign: "right",
                    gridRow: "span 4 / span 4",
                    fontWeight: "600",
                  }}
                >
                  {" "}
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
