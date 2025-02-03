import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import { updateUser } from "../../../../service/UserApi";
import { newUserFormSchemas } from "../../../Schemas/NewUserFormSchemas";

const UpdateUserModal = ({ open, onClose, userData }) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      registerName: userData?.name || "",
      registerSurname: userData?.surname || "",
      registerEmail: userData?.email || "",
      registerIdentityNo: userData?.identityNumber || "",
      registerRole: userData?.role || "",
      registerBalance: userData?.balance || "",
    },
    onSubmit: async () => {
      try {
        const user = {
          name: formik.values.registerName,
          surname: formik.values.registerSurname,
          email: formik.values.registerEmail,
          identityNumber: formik.values.registerIdentityNo,
          role: formik.values.registerRole,
          balance: formik.values.registerBalance,
        };

        const response = await updateUser(userData.id, user);
        console.log(response);
        console.log(user);

        if (response.request.status === 200) {
          setSuccessMessage("Bilgiler başarıyla güncellendi.");
          setSuccessModalOpen(true);
          setTimeout(() => {
            // 2 saniye sonra otomatik kapattım
            setSuccessMessage("");
            setSuccessModalOpen(false);
            onClose(); // Modalı kapat
          }, 2000);
        }
      } catch (err) {
        console.error("Hata oluştu:", err);
        setErrorMessage("Güncelleme sırasında bir hata oluştu.");
        setSuccessModalOpen(true);
        setTimeout(() => {
          // 2 saniye sonra otomatik kapattım
          setErrorMessage("");
          setSuccessModalOpen(false);
        }, 2000);
      }
    },
  });

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            textAlign: "center",
            gap: 3,
            width: 600,
            padding: "10",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            borderRadius: 2,
            fontFamily: "Montserrat",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(to right, #ece9e6, #ffffff)",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            <h1
              style={{
                fontSize: "35px",
                color: "--color-orange",
                paddingTop: "1rem",
                textDecoration: "underline",
              }}
            >
              PRISMA BANK
            </h1>
          </Typography>

          {/* Form Alanları */}
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Ad"
              id="registerName"
              name="registerName"
              value={formik.values.registerName || ""}
              onChange={formik.handleChange}
              type="text"
              className="custom-textfield"
            />
            <TextField
              label="Soyad"
              id="registerSurname"
              name="registerSurname"
              value={formik.values.registerSurname}
              onChange={formik.handleChange}
              type="text"
              className="custom-textfield"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "30px",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              label="T.C Kimlik"
              id="registerIdentityNo"
              name="registerIdentityNo"
              value={formik.values.registerIdentityNo}
              onChange={formik.handleChange}
              type="text"
              className="custom-textfield"
            />
            <FormControl sx={{ width: 237 }}>
              <InputLabel id="registerRole-label">Rol</InputLabel>
              <Select
                labelId="registerRole-label"
                id="registerRole"
                name="registerRole"
                value={formik.values.registerRole || ""}
                onChange={(event) =>
                  formik.setFieldValue("registerRole", event.target.value)
                }
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
          </div>

          <TextField
            sx={{ width: 500, margin: "auto" }}
            label="Mail"
            id="registerEmail"
            name="registerEmail"
            value={formik.values.registerEmail}
            onChange={formik.handleChange}
            type="mail"
            className="custom-textfield"
          />

          <div
            style={{
              display: "flex",
              gap: "30px",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              id="registerBalance"
              label="Balance"
              name="registerBalance"
              value={formik.values.registerBalance}
              onChange={formik.handleChange}
              type="text"
              className="custom-textfield"
            />
          </div>

          {/* Güncelle Butonu */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "var(--color-blue)",
              marginLeft: "2rem",
              marginRight: "2rem",
              marginBottom: "2rem",
            }}
          >
            Bilgileri Güncelle
          </Button>
        </Box>
      </Modal>
      <Modal
        open={successModalOpen}
        onClose={() => {
          setSuccessMessage("");
          setErrorMessage("");
          setSuccessModalOpen(false);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
