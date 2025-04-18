import React, { useEffect, useState } from "react";
import { getAllAutobill } from "../../../../service/InvoiceApi";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import { useTranslation } from "react-i18next";
import Loading from "../../../Core/Loading";
import i18next from "i18next";

function AutomaticPayment() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllAutobill();
      const formattedDatas = response.data.map((item) => ({
        id: item.id,
        payDate: new Date(item.payDate).toLocaleString("tr-TR", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        invoiceType: t(`InvoiceTypes.${item.invoiceType}`),
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
  }, [i18next.language]);

  const handleSetInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const columns = [
    { field: "payDate", headerName: t("SonIslemTarihi"), sortable: true },
    { field: "invoiceType", headerName: t("FaturaTipi"), sortable: true },
    { field: "invoiceNo", headerName: t("FaturaNumarasi"), sortable: true },
    { field: "amount", headerName: t("SonOdenenTutar"), sortable: true },
    {
      field: "autobill",
      sortable: false,
      headerName: t("OtomatikOdeme"),
      renderCell: (params) => (
        <Button
          onClick={() => handleSetInvoice(params.row)}
        >
          {t("Duzenle")}
        </Button>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ height: "31rem", width: "95%", padding: "20px" }}>
      <h1>{t("OtomatikOdemeTalimatlarim")}</h1>
      <DataGrid
        rows={datas}
        columns={columns.map((col) => ({ ...col, flex: 1 }))}
        disableColumnMenu
      />
      {modalOpen && (
        <InvoiceDetailsModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false), fetchData();
          }}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
}

export default AutomaticPayment;
