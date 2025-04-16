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
import { useTranslation } from "react-i18next";
import Loading from "../../../Core/Loading";

function UserList() {
  const { t } = useTranslation();
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchDatas(keyword, page);
      if (id === user.id) {
        navigate("/");
      }
    } catch (error) {
      console.error("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchDatas(keyword, page);
  }, [page, isDeleteModalOpen, newUserModal, updateUserModal]);

  if (loading) {
    return (<Loading />);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Emir Asaf'la {t("KullaniciListesi")}</h1>
      <div className="addAndSearch">
        <Box sx={{ display: "flex", justifyContent: "", alignItems: "" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewUserModal(true)}
          >
            {t("YeniKullanici")}
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
            placeholder={t("KullaniciAra")}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "8px" }
            }}
          />
          <Button
            variant="contained"
            onClick={() => fetchDatas(keyword, page)}
          >
            {t("Ara")}
          </Button>
        </Box>
      </div>
      <div className="content-container">
        <table>
          <thead className="tableInf">
            <tr>
              <th>{t("TcKimlik")}</th>
              <th>{t("IsimSoyisim")}</th>
              <th>{t("HesapNumarasi")}</th>
              <th>{t("Email")}</th>
              <th>{t("Rol")}</th>
              <th>{t("Islemler")}</th>
            </tr>
          </thead>
          <tbody className="userListTable">
            {logs?.map((log) => (
              <tr key={log.id}>
                <td>{log.identityNumber || t("Bilinmiyor")}</td>
                <td>
                  {log.name || ""} {log.surname || ""}
                </td>
                <td>{log.accountNumber || t("Bilinmiyor")}</td>
                <td>{log.email || t("Bilinmiyor")}</td>
                <td>{log.role || t("Bilinmiyor")}</td>
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
            {t("Geri")}
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNext}
          >
            {t("Ileri")}
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
          <p>{t("SilmeOnayi")}</p>
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
            >
              {t("Sil")}
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              {t("Iptal")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default UserList;
