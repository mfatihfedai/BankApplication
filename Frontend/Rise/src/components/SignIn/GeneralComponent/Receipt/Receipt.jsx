import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './Receipt.css';
import ReceiptGenerator from './ReceiptGenerator';
import { getReceipts } from '../../../../service/ReceiptApi';
import { decryptData } from "../../../Core/CryptoJS";

function Receipt() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatPayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });
  };

  const generateRandomRef = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const fetchLogs = async (currentPage) => {
    setLoading(true);
    try {
      const response = await getReceipts(currentPage);
      const { items, totalElements } = response.data;
      console.log(response)
      const formattedLogs = items.flatMap((item) => {
        const invoices = item.invoiceInfoList.map((invoice) => ({
          id: `invoice-${invoice.id}`,
          payDate: formatPayDate(invoice.payDate),
          channel: 'Fatura',
          description: invoice.invoiceType,
          amount: invoice.invoiceAmount,
          receipt: item.id,
          rawDate: invoice.payDate,
          type: 'invoice',
        }));

        const transfers = item.transferList.map((transfer) => ({
          id: `transfer-${transfer.id}`,
          payDate: formatPayDate(transfer.transferTime),
          channel: 'Havale',
          description: transfer.message,
          amount: transfer.transferAmount,
          receipt: item.id,
          rawDate: transfer.transferTime,
          type: 'transfer',
          receiver: transfer.receiver,
        }));

        return [...invoices, ...transfers];
      });

      setLogs(formattedLogs);
      setRowCount(totalElements);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  const handleReceiptDownload = (log) => {
    const storedUser = localStorage.getItem('user');
    const user = decryptData(storedUser);
    if (!user) {
      console.error('User not found in localStorage');
      return;
    }

    const data = {
      subeCode: '0285/MERKEZ/OSMANİYE ŞUBESİ',
      processBank: 'PRISMA BANK',
      customerNo: user.accountNumber,
      taxOffice: 'OSMANİYE VERGİ DAİRESİ',
      processDate: formatPayDate(log.rawDate),
      processRef: generateRandomRef(),
      currency: 'TL',
      amount: log.amount,
      explanation: log.description,
      fileName: `${user.name}-${user.surname}-dekont`,
      customerName: `${user.name} ${user.surname}`,
    };

    const receipt = new ReceiptGenerator();
    receipt.generateReceipt(data);
    receipt.downloadPDF(`${user.name}-${user.surname}-dekont`);
  };

  const columns = [
    { field: 'payDate', headerName: 'İşlem Tarihi', sortable: true },
    { field: 'channel', headerName: 'Kanal', sortable: true },
    { field: 'description', headerName: 'Açıklama', sortable: false },
    {
      field: 'amount',
      headerName: 'İşlem Tutarı',
      sortable: true,
      renderCell: (params) => {
        const { type, receiver, amount } = params.row;
        const isTransfer = type === 'transfer';
        const fontWeight = 'bold';
        let displayAmount = amount;
        let color = '#000';

        if (isTransfer) {
          if (receiver) {
            color = 'green';
            displayAmount = `+${amount}`;
          } else {
            color = 'red';
            displayAmount = `-${amount}`;
          }
        } else {
          color = 'red';
          displayAmount = `-${amount}`;
        }
        return (
          <span style={{ fontWeight, color }}>
            {displayAmount} ₺
          </span>
        );
      },
    },
    {
      field: 'receipt',
      headerName: 'Dekont',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { receiver } = params.row;

        if (receiver) return null;

        return (
          <Button
            variant="contained"
            size="medium"
            onClick={() => handleReceiptDownload(params.row)}
            sx={{
              backgroundColor: '#E1722A',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#D1611C',
              },
            }}
          >
            PDF
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: '31rem', width: '95%', padding: '20px' }}>
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
        loading={loading}
        disableColumnResize
        disableColumnMenu
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableVirtualization
        sortingOrder={['asc', 'desc']}
        initialState={{
          sorting: {
            sortModel: [{ field: 'payDate', sort: 'desc' }],
          },
        }}
        sx={{
          height: '100%',
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#00333D !important',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
          '& .MuiDataGrid-cell': {
            textAlign: 'center',
            fontSize: '18px',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f1f9ff',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-footerContainer': {
            display: 'none',
          },
          '& .MuiDataGrid-sortIcon': {
            color: '#ffffff',
          },
        }}
      />
    </div>
  );
}

export default Receipt;
