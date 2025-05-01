import React, { useEffect, useState } from "react";
import { getAllAutobill } from "../../../../service/InvoiceApi";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import { useTranslation } from "react-i18next";
import Loading from "../../../Core/Loading";
import i18next from "i18next";
import { format } from "date-fns";

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
        payDate: formatDateTime(item.payDate),
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

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const locale = i18next.language === "tr" ? tr : undefined;
    return format(date, "d MMM yyyy HH:mm", { locale });
  };

  useEffect(() => {
    fetchData();
  }, [i18next.language]);

  const handleSetInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const columns = [
    { field: "payDate", headerName: t("SonIslemTarihi"), sortable: false },
    { field: "invoiceType", headerName: t("FaturaTipi"), sortable: false },
    { field: "invoiceNo", headerName: t("FaturaNumarasi"), sortable: false },
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
    <div className="contents">
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
