import React, { useEffect, useState } from "react";
import { getUsersLogs } from "../../../../service/AdminApi";
import ReactApexChart from "react-apexcharts";
import Logo from "../../../../assets/LogoNonBackground.png";
import { TextField, Button, Box } from "@mui/material"; // MUI bileşenlerini içe aktar
import "./UserActivities.css"; // CSS dosyasını import edin

function UserActivities() {
  const [logs, setLogs] = useState([]); // Tablo verileri
  const [chartData, setChartData] = useState({}); // Grafik verileri
  const [keyword, setKeyword] = useState(""); // Arama çubuğu için keyword
  const [page, setPage] = useState(0); // Mevcut sayfa
  const [pageSize, setPageSize] = useState(10); // Sayfa boyutu
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
  const [hasNext, setHasNext] = useState(false); // İleri butonu için durum
  const [hasPrevious, setHasPrevious] = useState(false); // Geri butonu için durum
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(true); // Tablo veya grafik gösterimini kontrol eder

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
  }, [page]);

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <>
      <h1 style={{ marginTop: "20px" }}>KULLANICI HAREKETLERİ</h1>
      {/* Switch Butonu */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width:"90%", margin:"auto" }}>
        <div className="switch-container">
          {/* Sol Taraftaki Yazı */}
          <span
            style={{
              color: showTable ? "#E1722F" : "#00333D", // showTable true ise turuncu, değilse varsayılan renk
              fontWeight: "800", // showTable true ise kalın, değilse normal
            }}
          >
            Giriş Kayıtları Tablosu
          </span>

          {/* Switch Butonu */}
          <label className="switch">
            <input
              type="checkbox"
              checked={!showTable}
              onChange={() => setShowTable(!showTable)}
            />
            <span className="slider round"></span>
          </label>

          {/* Sağ Taraftaki Yazı */}
          <span
            style={{
              color: !showTable ? "#E1722F" : "#00333D", // showTable false ise turuncu, değilse varsayılan renk
              fontWeight: "800", // showTable false ise kalın, değilse normal
            }}
          >
            Giriş Kayıtları Grafiği
          </span>
        </div>

        {/* Arama Çubuğu */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin:"auto",
              justifyContent: "right",
              gap: "10px",
              marginRight:"1rem",
            }}
          >        
          <TextField
            variant="outlined"
            placeholder="Kullanıcı Ara..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Input değeri değiştiğinde state'i güncelle
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={() => fetchDatas(keyword, page, pageSize)} // Butona tıklandığında arama yap
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
            Ara
          </Button>
        </Box>
      </Box>

      <div className="content-container">
        {/* Sol Taraf: Tablo */}
        <div
          className={`table-container ${showTable ? "visible" : "hidden"}`}
        >
          {/* Tablo */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  İsim Soyisim
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Hesap Numarası
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  TC Kimlik Numarası
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Giriş Tarihi
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Çıkış Tarihi
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
                    {log.userInfo.identityNumber}
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
          </table>

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
              Geri
            </button>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={!hasNext}
            >
              İleri
            </button>
          </div>
        </div>

        {/* Sağ Taraf: Grafik */}
        <div
          className={`chart-container ${!showTable ? "visible" : "hidden"}`}
        >
          {chartData.series && (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={500}
              width={"100%"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default UserActivities;