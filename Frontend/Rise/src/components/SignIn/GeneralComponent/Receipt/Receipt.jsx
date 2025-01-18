import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReceiptGenerator from './ReceiptGenerator';
import { getReceipts } from '../../../../service/ReceiptApi';

function Receipt() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const formatPayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });
  };

  const fetchLogs = async (currentPage) => {
    setLoading(true);
    try {
      const response = await getReceipts(currentPage);
      const { items, hasNext, totalElements } = response.data;

      const formattedLogs = items.flatMap((item) => {
        const invoices = item.invoiceInfoList.map((invoice) => ({
          id: `invoice-${invoice.id}`,
          payDate: formatPayDate(invoice.payDate),
          channel: 'Fatura',
          description: invoice.invoiceType,
          amount: invoice.invoiceAmount,
          receipt: item.id,
        }));

        const transfers = item.transferList.map((transfer) => ({
          id: `transfer-${transfer.id}`,
          payDate: formatPayDate(transfer.transferTime),
          channel: 'Havale',
          description: transfer.message,
          amount: transfer.transferAmount,
          receipt: item.id,
        }));

        return [...invoices, ...transfers];
      });

      setLogs(formattedLogs);
      setHasNext(hasNext);
      setRowCount(totalElements);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page, pageSize);
  }, [page, pageSize]);

  const handleReceiptDownload = (receiptId) => {
    // Find the log by receiptId
    const selectedLog = logs.find((log) => log.receipt === receiptId);
    if (!selectedLog) {
      console.error('Receipt not found');
      return;
    }

    const data = {
      customerNo: '60274994',
      processRef: '248405016131',
      iban: 'TR95 0006 7010 0000 0044 7990 02',
      processDate: '04.01.2025 14:00:39',
      documentNo: 'SYA2025037574986',
      currency: 'TL',
      amount: '3,04',
      explanation: 'Bakiye Sıfırlama 420343******4418',
      customerName: 'MEHMET FATİH FEDAİ',
    };
    
    const receipt = new ReceiptGenerator();
    const pdfDoc = receipt.generateReceipt(data);
    receipt.downloadPDF(pdfDoc);
  };

  const columns = [
    { field: 'payDate', headerName: 'İşlem Tarihi', width: 250, sortable: true },
    { field: 'channel', headerName: 'Kanal', width: 180, sortable: true },
    { field: 'description', headerName: 'Açıklama', width: 320, sortable: true },
    { field: 'amount', headerName: 'İşlem Tutarı', width: 200, sortable: true },
    {
      field: 'receipt',
      headerName: 'Dekont',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleReceiptDownload(params.value)}
        >
          PDF
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: '30rem', width: '95%', padding: '20px' }}>
      <h1>Hesap Hareketlerim</h1>
      <DataGrid
        rows={logs}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => {
          if (hasNext || newPage < page) {
            setPage(newPage);
          }
        }}
        pageSizeOptions={[5, 10, 20]}
        loading={loading}
        disableColumnResize
        disableColumnMenu
        disableSelectionOnClick
        sortingOrder={['asc', 'desc']}
        initialState={{
          sorting: {
            sortModel: [{ field: 'payDate', sort: 'desc' }],
          },
        }}
        sx={{
          '& .MuiDataGrid-columnHeader': {
            '& .MuiDataGrid-sortIcon': {
              opacity: 1,
            },
          },
        }}
      />
    </div>
  );
}

export default Receipt;
