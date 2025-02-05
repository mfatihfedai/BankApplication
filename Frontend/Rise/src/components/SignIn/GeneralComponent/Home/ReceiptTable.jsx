import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getReceipts } from "../../../../service/ReceiptApi";
import "./ReceiptTable.css";

function ReceiptTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading default olarak true

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getReceipts();
        const { items } = response.data;
        console.log(items);
        const formattedLogs = items.flatMap((item) => {
          const invoices = item.invoiceInfoList.map((invoice) => ({
            id: `invoice-${invoice.id}`,
            payDate: new Date(invoice.payDate).toLocaleDateString("tr-TR"), // Sadece tarih
            description: invoice.invoiceType,
            amount: invoice.invoiceAmount,
          }));

          const transfers = item.transferList.map((transfer) => ({
            id: `transfer-${transfer.id}`,
            payDate: new Date(transfer.transferTime).toLocaleDateString("tr-TR"), // Sadece tarih
            description: transfer.message,
            amount: transfer.transferAmount,
          }));

          return [...invoices, ...transfers];
        });

        formattedLogs.sort((a, b) => new Date(b.payDate) - new Date(a.payDate));
        setLogs(formattedLogs.slice(0, 5)); // Sadece 5 log
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);  // Veri yüklendikten sonra loading false yapılır
      }
    };

    fetchLogs();
  }, []);  // Komponent ilk render edildiğinde çalışacak

  const columns = [
    { field: "payDate", headerName: "Tarih", flex: 0.3 },
    { field: "description", headerName: "Açıklama", flex: 1 },
    {
      field: "amount",
      headerName: "Tutar",
      flex: 0.3,
      renderCell: (params) => (
        <span style={{ fontWeight: "bold", color: "red" }}>
          {`-${params.value} ₺`}
        </span>
      ),
    },
  ];

  return (
    <div className="receipt-table-container">
      <h2 id="title">Son 5 Hareket</h2>
      <DataGrid
        rows={logs}
        columns={columns}
        autoHeight
        loading={loading}  // Loading durumu burada kullanılıyor
        disableColumnMenu
        hideFooter
      />
    </div>
  );
}

export default ReceiptTable;
