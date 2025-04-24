import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getReceipts } from "../../../../service/ReceiptApi";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

function ReceiptTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getReceipts();
        const { items } = response.data;

        const formattedLogs = items.flatMap((item) => {
          const invoices = item.invoiceInfoList.map((invoice) => ({
            id: `invoice-${invoice.id}`,
            payDate: new Date(invoice.payDate).toLocaleDateString("tr-TR"),
            description: invoice.invoiceType,
            amount: invoice.invoiceAmount,
            rawDate: invoice.payDate,
            type: "invoice", // Fatura işlemleri için tür eklendi
            receiver: null, // Faturalar için alıcı bilgisi yok
          }));

          const transfers = item.transferList.map((transfer) => ({
            id: `transfer-${transfer.id}`,
            payDate: new Date(transfer.transferTime).toLocaleDateString(
              "tr-TR"
            ),
            description: transfer.message,
            amount: transfer.transferAmount,
            rawDate: transfer.transferTime,
            type: "transfer", // Transfer işlemleri için tür eklendi
            receiver: transfer.receiver, // Havale işlemlerinde alıcı bilgisi var
          }));

          return [...invoices, ...transfers];
        });

        let sortedLogs = formattedLogs.sort(
          (a, b) => new Date(b.rawDate) - new Date(a.rawDate)
        );
        setLogs(sortedLogs.slice(0, 5));
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const columns = [
    { field: "payDate", headerName: t("Tarih"), flex: 1, minWidth: {sm:50,  lg: 100}, sortable: false },
    { field: "description", headerName: t("Aciklama"), flex: 2, minWidth: {sm:75,  lg: 100}, sortable: false },
    {
      field: "amount",
      headerName: t("Tutar"),
      flex: 1,
      sortable: false,
      minWidth: {sm:50,  lg: 110},
      renderCell: (params) => {
        const { type, receiver, amount } = params.row;
        const isTransfer = type === "transfer";
        const fontWeight = "bold";
        let displayAmount = `-${amount}`;
        let color = "red";

        if (isTransfer && receiver) {
          color = "green"; // Gelen transferleri yeşil yap
          displayAmount = `+${amount}`;
        }

        return <span style={{ fontWeight, color }}>{displayAmount} ₺</span>;
      },
    },
  ];

  return (
    <Box>
      <h2 style={{textAlign:"center"}}>{t("SonBesHareket")}</h2>
      <div style={{ height: 318}}>
        <DataGrid
          rows={logs}
          columns={columns}
          loading={loading}
          disableColumnMenu
          hideFooter
        />
      </div>
    </Box>
  );
}

export default ReceiptTable;
