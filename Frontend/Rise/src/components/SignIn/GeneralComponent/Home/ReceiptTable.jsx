import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getReceipts } from "../../../../service/ReceiptApi";
import "./ReceiptTable.css";

function ReceiptTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading default olarak true

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
        console.log(formattedLogs);
        let sortFormattedLogs = formattedLogs.sort(
          (a, b) => new Date(b.rawDate) - new Date(a.rawDate)
        );
        setLogs(sortFormattedLogs.slice(0, 5)); // Sadece 5 log
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false); // Veri yüklendikten sonra loading false yapılır
      }
    };

    fetchLogs();
  }, []); // Komponent ilk render edildiğinde çalışacak

  const columns = [
    { field: "payDate", headerName: "Tarih", flex: 0.5 },
    { field: "description", headerName: "Açıklama", flex: 0.7 },
    {
      field: "amount",
      headerName: "Tutar",
      flex: 0.5,
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
        loading={loading} // Loading durumu burada kullanılıyor
        disableColumnMenu
        hideFooter
      />
    </div>
  );
}

export default ReceiptTable;
