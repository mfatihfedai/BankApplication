import React, { useEffect, useState } from "react";
import { getSearchUsers } from "../../../../service/UserApi";
import { TextField, Button, Box } from "@mui/material";
import "./userList.css";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function UserList() {
  const [logs, setLogs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(true);

  const fetchDatas = async (page, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getSearchUsers(keyword, page);
      console.log(response);
      setLogs(response.items);
      setTotalPages(response.totalElements);
      setHasNext(response.hasNext);
      setHasPrevious(page > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatas(keyword, page);
  }, [page, keyword]);

  return (
    <>
      <h1 style={{ marginTop: "20px" }}>EMİR ASAF'LA KULLANICI LİSTESİ</h1>
      <div className="addAndSearch">
        <Box sx={{ display: "flex", justifyContent: "", alignItems: "" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#00333D",
              "&:hover": { backgroundColor: "#E1722F" },
            }}
          >
            Yeni Kullanıcı
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: "10px",
            marginRight: "1rem",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Kullanıcı Ara..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <Button
            variant="contained"
            onClick={() => fetchDatas(page, pageSize)}
            sx={{
              backgroundColor: "#00333D",
              color: "#fff",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#E1722F" },
            }}
          >
            Ara
          </Button>
        </Box>
      </div>

      {showTable && (
        <div className="content-container">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>TC Kimlik Numarası</th>
                <th>İsim Soyisim</th>
                <th>Hesap Numarası</th>
                <th>E-Mail</th>
                <th>Password</th>
                <th>Rol</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log) => (
                <tr key={log.id}>
                  <td>{log.identityNumber || "Bilinmiyor"}</td>
                  <td>
                    {log.name || ""} {log.surname || ""}
                  </td>
                  <td>{log.accountNumber || "Bilinmiyor"}</td>
                  <td>{log.email || "Bilinmiyor"}</td>
                  <td>{log.password || "******"}</td>
                  <td>{log.role || "Bilinmiyor"}</td>
                  <td>
                    <IconButton aria-label="edit" color="success">
                      <EditIcon style={{ color: "var(--color-blue)" }} />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon style={{ color: "var(--color-orange)" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={!hasPrevious}
            >
              Geri
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNext}
            >
              İleri
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserList;
