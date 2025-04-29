import React, { useEffect, useState } from "react";
import { getUsersLogs } from "../../../../service/AdminApi";
import { TextField, Button, Box, Slide, Paper, FormControlLabel, Switch } from "@mui/material"; // MUI bileşenlerini içe aktar
import "./UserActivities.css"; // CSS dosyasını import edin
import { useTranslation } from "react-i18next";
import GeneralTable from "../../../General/GeneralTable";
import ChartComponent from "./ChartComponent";
import Loading from "../../../Core/Loading";
import PreviousNextButton from "../../../General/PreviousNextButton";
import i18n from "i18next";

function UserActivities() {
  const [chartData, setChartData] = useState({}); // Grafik verileri
  const [keyword, setKeyword] = useState(""); // Arama çubuğu için keyword
  const [page, setPage] = useState(0); // Mevcut sayfa
  const [tableData, setTableData] = useState([]); // Tablo verileri
  const [pageSize, setPageSize] = useState(10); // Sayfa boyutu
  const [showChart, setShowChart] = useState(false); // Grafik gösterimini kontrol eder
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
  const [hasNext, setHasNext] = useState(false); // İleri butonu için durum
  const [hasPrevious, setHasPrevious] = useState(false); // Geri butonu için durum
  const [loading, setLoading] = useState(true);
  // const [showTable, setShowTable] = useState(true); // Tablo veya grafik gösterimini kontrol eder
  const { t } = useTranslation();

  // Tarih formatlama fonksiyonu
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  // Verileri API'den çekme
  const fetchDatas = async (keyword, page) => {
    setLoading(true);
    try {
      const response = await getUsersLogs(keyword, page);

      const result = response.logResponse.map(({ loginTime, logoutTime, userInfo }) => ({
        [t("İsimSoyisim")]: `${userInfo.name} ${userInfo.surname}`,
        [t("HesapNumarasi")]: userInfo.accountNumber,
        [t("GirisTarihi")]: formatDateTime(loginTime),
        [t("CikisTarihi")]: logoutTime ? formatDateTime(logoutTime) : "-",
      }));
      setTableData(result);

      // Grafik verilerini güncelle
      const dates = response.adminLogResponseChart.loginDate.map((date) =>
        new Date(date).getTime()
      );
      const totalLogins = response.adminLogResponseChart.totalLogins;

      setChartData({
        series: [
          {
            name: t("ToplamGirisler"),
            data: totalLogins,
            style: {
              color: "var(--color-text)",
            },
          },
        ],
        options: {
          chart: {
            type: "area",
            stacked: false,
            height: 350,
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: "zoom",
            },
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 5,
          },
          title: {
            text: t("GunlukGirisler"),
            align: "left",
            style: {
              color: "var(--color-text)",
              fontSize: "18px",
              fontWeight: "bold", 
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100],
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              },
              style: {
                colors: "var(--color-text)",
                fontSize: "10px", 
              },
            },
            title: {
              text: t("ToplamGirisSayisi"),
              style: {
                color: "var(--color-text)", 
                fontSize: "16px",
              }
            },
          },
          xaxis: {
            type: "datetime",
            categories: dates,
            labels: {
              style: {
                colors: "var(--color-text)", 
              }
            }
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return val.toFixed(0);
              }
            },
          },
          colors: ["var(--color-primary)"],
        },
      });

      // Sayfalama bilgilerini güncelle
      setTotalPages(response.totalPages);
      setHasNext(response.hasNext);
      setHasPrevious(page > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: t("İsimSoyisim"), headerName: t("İsimSoyisim"), flex: 1, sortable: false },
    { field: t("HesapNumarasi"), headerName: t("HesapNumarasi"), flex: 1, sortable: false },
    { field: t("GirisTarihi"), headerName: t("GirisTarihi"), flex: 1 },
    { field: t("CikisTarihi"), headerName: t("CikisTarihi"), flex: 1 },
  ];

  // Sayfa değiştiğinde ve dil değiştiğinde verileri yeniden çek
  useEffect(() => {
    fetchDatas(keyword, page);
  }, [page, showChart, i18n.language]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="contents">
        <h1>{t("KullaniciHareketleri")}</h1>
          {/* Toggle Button İLK DENEME css'siz */}
          <div className="addAndSearch">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: {xs: "0px", md: "10px"},
              }}
            >
              {/* Tablo Görünümü Metni */}
              <span
                style={{
                  textAlign: "center",
                  color: !showChart ? "var(--color-secondary)" : "var(--color-primary)",
                  fontWeight: "bold",
                }}
              >
                {t("TabloGorunumu")}
              </span>

              {/* Switch Butonu */}
              <Switch
                checked={showChart}
                onChange={() => setShowChart(!showChart)}
                sx={{
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "var(--color-secondary)", // Yuvarlak topun rengi
                  },
                  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                    backgroundColor: "var(--color-secondary)", // Aktifken de aynı renk
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "var(--color-text)", // Track'in rengi
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "var(--color-text)", // Aktifken track'in rengi
                  },
                }}
              />
              {/* Grafik Görünümü Metni */}
              <span
                style={{
                  color: showChart ? "var(--color-secondary)" : "var(--color-primary)",
                  fontWeight: "bold",
                }}
              >
                {t("GrafikGorunumu")}
              </span>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                gap: "10px",
                alignItems: "center",
                marginRight: "1rem",
              }}
            >
              <TextField
                variant="outlined"
                placeholder={t("KullaniciAra")}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="search-input"
              />
              <Button
                variant="contained"
                onClick={() => fetchDatas(keyword, page, pageSize)}
              >
                {t("Ara")}
              </Button>
            </Box>
          </div>
          <Box sx={{
            position: "relative",
            minHeight: "350px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} >

            <Slide direction="left" in={showChart} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "var(--color-chart-background)",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ChartComponent 
                sx={{ width: "100%" }}
                chartData={chartData} 
                />
              </Box>
            </Slide>
            <Slide direction="right" in={!showChart} mountOnEnter unmountOnExit>
              <Box sx={{ width: "100%" }} >
                <GeneralTable data={tableData} columns={columns} />
                <PreviousNextButton
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  onPrevious={() => setPage((prev) => Math.max(prev - 1, 0))}
                  onNext={() => setPage((prev) => prev + 1)}
                />
              </Box>
            </Slide>
          </Box>
      </div>
    </>
  );
}

export default UserActivities;
