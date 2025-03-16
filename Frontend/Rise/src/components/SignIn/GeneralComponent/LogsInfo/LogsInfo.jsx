import React, { useEffect, useState } from "react";
import { getLogs } from "../../../../service/LogApi";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import "./LogsInfo.css";
import Logo from "../../../../assets/LogoNonBackground.png";
import { useTranslation } from "react-i18next";

function LogsInfo() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchLogs = async (currentPage) => {
    try {
      setLoading(true);
      const response = await getLogs(currentPage);
      console.log(response);
      const { items, hasNext } = response.data;
      setLogs(items);
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
  }, [page]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, "d MMMM yyyy HH:mm", { locale: tr });
  };

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{t("GirisKayitlarim")}</h1>
      <table>
        <thead>
          <tr>
            <th>{t("GirisTarihi")}</th>
            <th>{t("CikisTarihi")}</th>
          </tr>
        </thead>
        <tbody>
          {logs?.map((log) => (
            <tr key={log.id}>
              <td>{formatDateTime(log.loginTime)}</td>
              <td>{log.logoutTime ? formatDateTime(log.logoutTime) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          width: "95%",
        }}
      >
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={!hasPrevious}
        >
          {t("Geri")}
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!hasNext}
        >
          {t("İleri")}
        </button>
      </div>
    </div>
  );
}

export default LogsInfo;
