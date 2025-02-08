import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getReceipts } from "../../../../service/ReceiptApi";
import "./ReceiptTable.css";

function ReceiptTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getReceipts();
        const { items } = response.data;

        const formattedLogs = items.flatMap((item) => {
          const invoices = item.invoiceInfoList.map((invoice) => ({
            id: `invoice-${invoice.id}`,
            payDate: new Date(invoice.payDate).toLocaleDateString("tr-TR"), // Sadece tarih
            description: invoice.invoiceType,
            amount: invoice.invoiceAmount,
            rawDate: invoice.payDate,
          }));

          const transfers = item.transferList.map((transfer) => ({
            id: `transfer-${transfer.id}`,
            payDate: new Date(transfer.transferTime).toLocaleDateString(
              "tr-TR"
            ), // Sadece tarih
            description: transfer.message,
            amount: transfer.transferAmount,
            rawDate: transfer.transferTime,
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
        setLoading(false); // Veri yüklendikten sonra loading false yapılır
      }
    };

    fetchLogs();
  }, []); // Komponent ilk render edildiğinde çalışacak

  const columns = [
    { field: "payDate", headerName: "Tarih", flex: 1, minWidth: 100 },
    { field: "description", headerName: "Açıklama", flex: 2, minWidth: 150 },
    {
      field: "amount",
      headerName: "Tutar",
      flex: 1,
      sortable: false,
      minWidth: 100,
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
  ];

  return (
    <div className="receipt-table-container">
      <h2 id="title">Son 5 Hareket</h2>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={logs}
          columns={columns}
          autoHeight
          loading={loading}
          disableColumnMenu
          hideFooter
        />
      </div>
    </div>
  );
}

export default ReceiptTable;
