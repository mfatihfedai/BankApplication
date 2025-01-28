import React, { useEffect, useState } from "react";
import {
  getSearchUsers,
  deleteUser,
  createUser,
} from "../../../../service/UserApi";
import { TextField, Button, Box, Modal, Alert } from "@mui/material";
import "./userList.css";
import { useUser } from "../../../../context/UserContext";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../../../../assets/LogoNonBackground.png";
import NewUserModal from "./NewUserModal";
import UpdateUserModal from "./UpdateUserModal";
import { useNavigate } from "react-router";

function UserList() {
  const [logs, setLogs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newUserModal, setNewUserModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchDatas = async (keyword, page) => {
    setLoading(true);
    try {
      const response = await getSearchUsers(keyword, page);
      console.log(response);
      setLogs(response.items);

      setHasNext(response.hasNext);
      setHasPrevious(page > 0);
    } catch (error) {
      console.error(error);
      setErrorMessage("Tablo yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      console.log(response);
      console.log(id);
      if (id === user.id) {
        navigate("/");
      }

      if (response.status === 200) {
        setSuccessMessage("Kullanıcı başarıyla silindi.");
        setIsDeleteModalOpen(true);
      }
    } catch (error) {
      setErrorMessage("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchDatas(keyword, page);
  }, [page, isDeleteModalOpen]);

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <>
      <h1 style={{ marginTop: "20px" }}>EMİR ASAF'LA KULLANICI LİSTESİ</h1>
      <div className="addAndSearch">
        <Box sx={{ display: "flex", justifyContent: "", alignItems: "" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewUserModal(true)}
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
            onClick={() => fetchDatas(keyword, page)}
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
      <div className="content-container">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {/* <th>TC Kimlik Numarası</th> */}
              <th>İsim Soyisim</th>
              <th>Hesap Numarası</th>
              {/* <th>E-Mail</th> */}
              <th>Rol</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr key={log.id}>
                {/* <td>{log.identityNumber || "Bilinmiyor"}</td> */}
                <td>
                  {log.name || ""} {log.surname || ""}
                </td>
                <td>{log.accountNumber || "Bilinmiyor"}</td>
                {/* <td>{log.email || "Bilinmiyor"}</td> */}

                <td>{log.role || "Bilinmiyor"}</td>
                <td>
                  <IconButton
                    aria-label="edit"
                    style={{ color: "var(--color-blue)" }}
                  >
                    <EditIcon
                      variant="contained"
                      onClick={() => setUpdateUserModal(log)}
                    />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(log.id);
                      }}
                      style={{ color: "var(--color-blue)" }}
                    />
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
            width: "100%",
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
        {newUserModal && (
          <NewUserModal
            open={newUserModal}
            onClose={() => setNewUserModal(false)}
          />
        )}
        {updateUserModal && (
          <UpdateUserModal
            open={updateUserModal}
            onClose={() => setUpdateUserModal(false)}
          />
        )}
      </div>
      <Modal
        open={!!successMessage || !!errorMessage}
        onClose={() => {
          setSuccessMessage("");
          setErrorMessage("");
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            position: "relative",
          }}
        >
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Modal>
    </>
  );
}

export default UserList;
