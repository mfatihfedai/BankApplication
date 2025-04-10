import React, { useEffect, useState } from "react";
import { getUsersLogs } from "../../../../service/AdminApi";
import ReactApexChart from "react-apexcharts";
import Logo from "../../../../assets/LogoNonBackground.png";
import { TextField, Button, Box, Slide, Paper, FormControlLabel, Switch } from "@mui/material"; // MUI bileşenlerini içe aktar
import "./UserActivities.css"; // CSS dosyasını import edin
import { useTranslation } from "react-i18next";
import GeneralTable from "../../../General/GeneralTable";
import ChartComponent from "./ChartComponent";

function UserActivities() {
  const [logs, setLogs] = useState([]); // Tablo verileri
  const [chartData, setChartData] = useState({}); // Grafik verileri
  const [keyword, setKeyword] = useState(""); // Arama çubuğu için keyword
  const [page, setPage] = useState(0); // Mevcut sayfa
  const [tableData, setTableData] = useState([]); // Tablo verileri
  const [pageSize, setPageSize] = useState(10); // Sayfa boyutu
  const [showChart, setShowChart] = useState(true); // Grafik gösterimini kontrol eder
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
      console.log(response);

      // Tablo verilerini güncelle
      setLogs(response.logResponse);

      const result = logs.map(({ loginTime, logoutTime,userInfo }) => ({ loginTime, logoutTime,userInfo }));
      const formattedResult = result.map((log) => ({
        "İsim Soyisim": log.userInfo.name + " " + log.userInfo.surname,
        "Hesap Numarası": log.userInfo.accountNumber,
        "Giris Tarihi": formatDateTime(log.loginTime),
        "Cikis Tarihi": log.logoutTime ? formatDateTime(log.logoutTime) : "-",
      }));
      setTableData(formattedResult);

      // Grafik verilerini güncelle
      const dates = response.adminLogResponseChart.loginDate.map((date) =>
        new Date(date).getTime()
      );
      const totalLogins = response.adminLogResponseChart.totalLogins;

      setChartData({
        series: [
          {
            name: "Toplam Girişler",
            data: totalLogins,
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
            text: "Günlük Girişler",
            align: "left",
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
            },
            title: {
              text: "Toplam Giriş Sayısı",
            },
          },
          xaxis: {
            type: "datetime",
            categories: dates,
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return val.toFixed(0);
              },
            },
          },
          colors: ["#00333D"], // Çizgi rengini #00333D olarak ayarla
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

  // Sayfa değiştiğinde verileri yeniden çek
  useEffect(() => {
    fetchDatas(keyword, page);
  }, [page,showChart]);

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <>
      <h1 style={{ marginTop: "20px" }}>{t("KullaniciHareketleri")}</h1>
    <div style={{ padding: "20px" }}>
      {/* Toggle Button İLK DENEME css'siz */}
      <FormControlLabel
        control={
          <Switch
            checked={showChart}
            onChange={() => setShowChart(!showChart)}
            color="primary"
          />
        }
        label={showChart ? "Grafik Görünümü" : "Tablo Görünümü"}
      />

      <Box sx={{position: "relative",
          minHeight: "350px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",}} >
        <Slide direction="left" in={showChart} mountOnEnter unmountOnExit>
          <Box>
            <ChartComponent chartData={chartData} />
          </Box>
        </Slide>
        <Slide direction="right" in={!showChart} mountOnEnter unmountOnExit>
          <Box sx={{ width: "100%" }} >
           <GeneralTable data={tableData}/>
          </Box>
        </Slide>
      </Box>



      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          margin: "auto",
        }}
      >
        <div className="switch-container">
          
          <span
            style={{
              color: showTable ? "#E1722F" : "#00333D", 
              fontWeight: "800", 
            }}
          >
            {t("GirisKayitlariTablosu")}
          </span>         
          <label className="switch">
            <input
              type="checkbox"
              checked={!showTable}
              onChange={() => setShowTable(!showTable)}
            />
            <span className="slider round"></span>
          </label>

         
          <span
            style={{
              color: !showTable ? "#E1722F" : "#00333D",
              fontWeight: "800", 
            }}
          >
            {t("GirisKayitlariGrafigi")}
          </span>
        </div>

        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            justifyContent: "right",
            gap: "10px",
            marginRight: "1rem",
          }}
        >
          <TextField
            variant="outlined"
            placeholder={t("KullaniciAra")}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} 
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={() => fetchDatas(keyword, page, pageSize)} 
            sx={{
              backgroundColor: "#00333D",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#E1722F",
              },
            }}
          >
            {t("Ara")}
          </Button>
        </Box>
      </Box> */}

      <div>
        <div>
          {/* <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t("İsimSoyisim")}
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t("HesapNumarasi")}
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t("GirisTarihi")}
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t("CikisTarihi")}
                </th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log) => (
                <tr key={log.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {log.userInfo.name} {log.userInfo.surname}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {log.userInfo.accountNumber}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {formatDateTime(log.loginTime)}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {log.logoutTime ? formatDateTime(log.logoutTime) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          {/* <GeneralTable data={logs}/>  Tablo bileşenini kullanarak tabloyu oluşturun */}
          {/* Sayfalama Butonları */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              width: "100%",
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
              {t("Ileri")}
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default UserActivities;
