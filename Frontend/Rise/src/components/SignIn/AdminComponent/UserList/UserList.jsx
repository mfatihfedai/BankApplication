import React, { useEffect, useState } from "react";
import { getSearchUsers, deleteUser } from "../../../../service/UserApi";
import { Button, Box, Modal, IconButton, TextField } from "@mui/material";
import "./userList.css";
import { useUser } from "../../../../context/UserContext";
import NewUserModal from "./NewUserModal";
import AddIcon from "@mui/icons-material/Add";
import UpdateUserModal from "./UpdateUserModal";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Loading from "../../../Core/Loading";
import GeneralTable from "../../../General/GeneralTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import i18n from "i18next";
import PreviousNextButton from "../../../General/PreviousNextButton";

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
      setLogs(
        response.items.map((log) => ({
          id: log.id,
          [t("TcKimlik")]: log.identityNumber || t("Bilinmiyor"),
          [t("IsimSoyisim")]: `${log.name || ""} ${log.surname || ""}`,
          [t("HesapNumarasi")]: log.accountNumber || t("Bilinmiyor"),
          [t("Email")]: log.email || t("Bilinmiyor"),
          [t("Rol")]: log.role || t("Bilinmiyor"),
          actions: log, // İşlemler için ham veri
        }))
      );
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
      fetchDatas("", page);
      if (id === user.id) {
        navigate("/");
      }
    } catch (error) {
      console.error("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchDatas("", page);
  }, [page, isDeleteModalOpen, newUserModal, updateUserModal, i18n.language]);

  if (loading) {
    return <Loading />;
  }

  const columns = [
    { field: t("TcKimlik"), headerName: t("TcKimlik"), flex: 1, sortable: false },
    { field: t("IsimSoyisim"), headerName: t("IsimSoyisim"), flex: 1, sortable: false },
    { field: t("HesapNumarasi"), headerName: t("HesapNumarasi"), flex: 1, sortable: false },
    { field: t("Email"), headerName: t("Email"), flex: 1 },
    { field: t("Rol"), headerName: t("Rol"), flex: 1 },
    {
      field: "actions",
      headerName: t("Islemler"),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="edit-list">
          <IconButton
            onClick={() => {
              setSelectedUser(params.row.actions);
              setUpdateUserModal(true);
            }}
          >
            <EditIcon style={{color: "var(--color-text)"}}/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedUserId(params.row.actions.id);
              setIsDeleteModalOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="contents">
      <h1>{t("KullaniciListesi")}</h1>
      <div className="addAndSearch">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            gap: "10px",
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
            onClick={() => fetchDatas(keyword, page)}
          >
            {t("Ara")}
          </Button>
        </Box>
      </div>
      <GeneralTable data={logs} columns={columns} />
      <PreviousNextButton
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 0))}
        onNext={() => setPage((prev) => prev + 1)}
      />
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