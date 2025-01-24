import React, { useEffect, useState } from 'react';
import { getAllAutobill } from '../../../../service/InvoiceApi';
import { DataGrid } from '@mui/x-data-grid';
import { Button, } from '@mui/material';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import Logo from "../../../../assets/LogoNonBackground.png";

function AutomaticPayment() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllAutobill();
      const formattedDatas = response.data.map((item) => ({
        id: item.id,
        payDate: new Date(item.payDate).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }),
        invoiceType: item.invoiceType,
        invoiceNo: item.invoiceNo,
        amount: item.invoiceAmount,
        autobill: item.autobill,
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

  const handleSetInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const columns = [
    { field: 'payDate', headerName: 'Son İşlem Tarihi', sortable: true },
    { field: 'invoiceType', headerName: 'Fatura Tipi', sortable: true },
    { field: 'invoiceNo', headerName: 'Fatura Numarası', sortable: true },
    { field: 'amount', headerName: 'Son Ödenen Tutar (₺)', sortable: true },
    {
      field: 'autobill',
      sortable: false,
      headerName: 'Otomatik Ödeme',
      renderCell: (params) => (
        <Button
          variant="contained"
          size="medium"
          onClick={() => handleSetInvoice(params.row)}
          sx={{ backgroundColor: '#E1722A', color: '#ffffff', '&:hover': { backgroundColor: '#D1611C' } }}
        >
          Düzenle
        </Button>
      ),
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
    <div style={{ height: '31rem', width: '95%', padding: '20px' }}>
      <h1>OTOMATİK ÖDEME TALİMATLARIM</h1>
      <DataGrid
        rows={datas}
        columns={columns.map((col) => ({ ...col, flex: 1 }))}
        disableColumnMenu
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
      {modalOpen && (
        <InvoiceDetailsModal
          open={modalOpen}
          onClose={() => {setModalOpen(false), fetchData()}}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
}

export default AutomaticPayment;
