import React, { useEffect, useState } from "react";
import { getLogs } from "../../../../service/LogApi";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import "./LogsInfo.css";
import { useTranslation } from "react-i18next";
import GeneralTable from "../../../General/GeneralTable";
import Loading from "../../../Core/Loading";
import i18n from "i18next";
import PreviousNextButton from "../../../General/PreviousNextButton";

function LogsInfo() {
  const [infos, setInfos] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchLogs = async (currentPage) => {
    try {
      setLoading(true);
      const response = await getLogs(currentPage);
      const { items, hasNext } = response.data;
      const result = items.map(({ loginTime, logoutTime }) => ({ loginTime, logoutTime }));
      const formattedResult = result.map((log) => ({
        [t("GirisTarihi")]: formatDateTime(log.loginTime),
        [t("CikisTarihi")]: log.logoutTime ? formatDateTime(log.logoutTime) : "-",
      }));  
      setInfos(formattedResult);
      setHasNext(hasNext);
      setHasPrevious(currentPage > 0);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page, i18n.language]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const locale = i18n.language === "tr" ? tr : undefined;
    return format(date, "d MMMM yyyy HH:mm", { locale });
  };

  if (loading) {
    return <Loading />;
  }

  const columns = [
    { field: t("GirisTarihi"), headerName: t("GirisTarihi"), flex: 1 },
    { field: t("CikisTarihi"), headerName: t("CikisTarihi"), flex: 1 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>{t("GirisKayitlarim")}</h1>
      <GeneralTable data={infos} columns={columns} />
      <PreviousNextButton
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 0))}
        onNext={() => setPage((prev) => prev + 1)}
      />
    </div>
  );
}

export default LogsInfo;