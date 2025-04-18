import React, { useEffect, useState } from "react";
import { getLogs } from "../../../../service/LogApi";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import GeneralTable from "../../../General/GeneralTable";
import Loading from "../../../Core/Loading";
import i18n from "i18next";
import { Box } from "@mui/material";

function LogsInfoTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchLastLogs = async () => {
    try {
      setLoading(true);
      const response = await getLogs(0); // İlk sayfayı al
      const { items } = response.data;
      const lastThreeLogs = items.slice(0, 3); // Son 3 giriş
      const formattedLogs = lastThreeLogs.map(({ loginTime, logoutTime }) => ({
        [t("GirisTarihi")]: formatDateTime(loginTime),
        [t("CikisTarihi")]: logoutTime ? formatDateTime(logoutTime) : "-",
      }));
      setLogs(formattedLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const locale = i18n.language === "tr" ? tr : undefined;
    return format(date, "d MMMM yyyy HH:mm", { locale });
  };

  useEffect(() => {
    fetchLastLogs();
  }, [i18n.language]);

  if (loading) {
    return <Loading />;
  }

  const columns = [
    { field: t("GirisTarihi"), headerName: t("GirisTarihi"), flex: 1, minWidth: 150, sortable: false },    
    { field: t("CikisTarihi"), headerName: t("CikisTarihi"), flex: 1, minWidth: 150, sortable: false},
  ];

  return (
    <Box>
      <h2 style={{textAlign: "center"}}>{t("SonGirisler")}</h2>
      <GeneralTable data={logs} columns={columns} />
    </Box>
  );
}

export default LogsInfoTable;