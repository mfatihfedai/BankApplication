import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Typography, Modal, Alert, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getBanks, updateBank, deleteBank, createBank } from "../../../../service/BankApi.jsx";
import Logo from "../../../../assets/LogoNonBackground.png";
import "../../../Core/logo.css";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import CreateModal from "./CreateModal";

function Banks() {
  const [banks, setBanks] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState({ bankName: "", transferFee: "" });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const fetchBanks = async () => {
    setLoading(true);
    try {
      const response = await getBanks();
      setBanks(response);
      setRowCount(response.length);
    } catch (error) {
      console.error("Error fetching banks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.bankName) errors.bankName = "Banka adı zorunludur.";
    if (!data.transferFee) errors.transferFee = "Transfer ücreti zorunludur.";
    return errors;
  };

  const handleUpdate = async (updatedData) => {
    const errors = validateForm(updatedData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await updateBank(updatedData.id, updatedData);
      if (response) {
        setSuccessMessage("Banka başarıyla güncellendi.");
        fetchBanks();
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      setErrorMessage("Banka güncellenirken bir hata oluştu.");
    }
  };

  const handleCreate = async (newData) => {
    const errors = validateForm(newData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await createBank(newData);
      if (response) {
        setSuccessMessage("Banka başarıyla eklendi.");
        fetchBanks();
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      setErrorMessage("Banka eklenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteBank(id);
      if (response.status === 200) {
        setSuccessMessage("Banka başarıyla silindi.");
        fetchBanks();
      }
    } catch (error) {
      setErrorMessage("Banka silinirken bir hata oluştu.");
    }
  };

  const columns = [
    { field: "bankName", headerName: "Banka Adı", flex: 1 },
    { field: "transferFee", headerName: "Transfer Ücreti", flex: 1 },
    {
      field: "actions",
      headerName: "Düzenle",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              setSelectedBank(params.row);
              setIsUpdateModalOpen(true);
              setFormErrors({});
            }}
            sx={{ color: "#00333D" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedBank(params.row);
              setIsDeleteModalOpen(true);
            }}
            sx={{ color: "#E1722F" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <div style={{ height: "31rem", width: "95%", padding: "20px" }}>
    <h1>BANKA YÖNETİMİ</h1>
      <Box sx={{ display: "flex", justifyContent: "", alignItems: "", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#00333D", "&:hover": { backgroundColor: "#E1722F" } }}
          onClick={() => {
            setSelectedBank({ bankName: "", transferFee: "" });
            setIsCreateModalOpen(true);
            setFormErrors({});
          }}
        >
          Yeni Banka
        </Button>
      </Box>

      <DataGrid
        rows={banks}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        disableColumnResize
        disableColumnMenu
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableVirtualization
        sx={{
          height: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#00333D !important",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
            fontSize: "18px",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f1f9ff",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#ffffff",
          },
        }}
      />

      {/* Modallar */}
      <UpdateModal
        open={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        selectedBank={selectedBank}
        onChange={(field, value) => setSelectedBank({ ...selectedBank, [field]: value })}
        onSubmit={() => handleUpdate(selectedBank)}
        formErrors={formErrors}
      />

      <CreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        selectedBank={selectedBank}
        onChange={(field, value) => setSelectedBank({ ...selectedBank, [field]: value })}
        onSubmit={() => handleCreate(selectedBank)}
        formErrors={formErrors}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleDelete(selectedBank.id);
          setIsDeleteModalOpen(false);
        }}
        bankName={selectedBank.bankName}
      />

      {/* Bilgi Mesajı Modalı */}
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
    </div>
  );
}

export default Banks;