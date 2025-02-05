import React, { useEffect, useState } from "react";
import { getSearchUsers, deleteUser } from "../../../../service/UserApi";
import { TextField, Button, Box, Modal } from "@mui/material";
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
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchDatas = async (keyword, page) => {
    setLoading(true);
    try {
      const response = await getSearchUsers(keyword, page);
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
      if (id === user.id) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchDatas(keyword, page);
  }, [page, isDeleteModalOpen, newUserModal, updateUserModal]);

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>EMİR ASAF'LA KULLANICI LİSTESİ</h1>
      <div className="addAndSearch">
        <Box sx={{ display: "flex", justifyContent: "", alignItems: "" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewUserModal(true)}
            sx={{
              backgroundColor: "var(--color-blue)",
              "&:hover": { backgroundColor: "var(--color-orange)" },
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
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--color-blue)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--color-blue)",
              },
            }}
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
        <table>
          <thead className="tableInf">
            <tr>
              <th>TC Kimlik Numarası</th>
              <th>İsim Soyisim</th>
              <th>Hesap Numarası</th>
              <th>E-Mail</th>
              <th>Rol</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody className="userListTable">
            {logs?.map((log) => (
              <tr key={log.id}>
                <td>{log.identityNumber || "Bilinmiyor"}</td>
                <td>
                  {log.name || ""} {log.surname || ""}
                </td>
                <td>{log.accountNumber || "Bilinmiyor"}</td>
                <td>{log.email || "Bilinmiyor"}</td>
                <td>{log.role || "Bilinmiyor"}</td>
                <td>
                  <IconButton aria-label="edit">
                    <EditIcon
                      className="icon"
                      variant="contained"
                      onClick={() => {
                        setSelectedUser(log);
                        setUpdateUserModal(true);
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      className="icon"
                      onClick={() => {
                        setSelectedUserId(log.id);
                        setIsDeleteModalOpen(true);
                      }}
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
          userData={selectedUser}
        />
      )}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
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
            textAlign: "center",
          }}
        >
          <p>Bu kullanıcıyı silmek istediğinizden emin misiniz?</p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleDelete(selectedUserId);
                setIsDeleteModalOpen(false);
              }}
              sx={{
                backgroundColor: "var(--color-blue)",
              }}
            >
              Sil
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsDeleteModalOpen(false)}
              sx={{
                backgroundColor: "var(--color-blue)",
              }}
            >
              İptal
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default UserList;
