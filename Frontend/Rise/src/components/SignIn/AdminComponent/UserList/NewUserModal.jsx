import React, { useState } from "react";
import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useFormik } from "formik";
import { createUser } from "../../../../service/UserApi";
import { Select, MenuItem, Alert } from "@mui/material";
import { newUserFormSchemas } from "../../../Schemas/NewUserFormSchemas";

const NewUserModal = ({ open, onClose }) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      registerName: "",
      registerSurname: "",
      registerEmail: "",
      registerIdentityNo: "",
      registerPassword: "",
      registerPasswordConfirm: "",
      registerRole: "",
      registerBalance: "",
    },
    validationSchema: newUserFormSchemas,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      try {
        const newUser = {
          name: values.registerName.toLocaleUpperCase("tr-TR"),
          surname: values.registerSurname.toLocaleUpperCase("tr-TR"),
          email: values.registerEmail,
          identityNumber: values.registerIdentityNo,
          password: values.registerPassword,
          role: values.registerRole,
          balance: values.registerBalance,
        };
        console.log(newUser);

        const response = await createUser(newUser);
        console.log(response);
        if (response.status === 200) {
          setSuccessMessage("Kullanıcı başarıyla eklendi.");
          setSuccessModalOpen(true);
          setTimeout(() => {
            // 2 saniye sonra otomatik kapattım
            setSuccessMessage("");
            setSuccessModalOpen(false);
            onClose(); // Modalı kapat
          }, 2000);
        }
      } catch (error) {
        console.error("Kullanıcı ekleme hatası:", error.message);
        setErrorMessage("Kayıt sırasında bir hata oluştu.");
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
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <TextField
                label="Ad"
                id="registerName"
                name="registerName"
                value={formik.values.registerName || ""}
                onChange={formik.handleChange}
                type="text"
                className="custom-textfield"
              />
              {formik.errors.registerName && (
                <Typography className="register-error">
                  {formik.errors.registerName}
                </Typography>
              )}
            </div>
            <div>
              <TextField
                label="Soyad"
                id="registerSurname"
                name="registerSurname"
                value={formik.values.registerSurname}
                onChange={formik.handleChange}
                type="text"
                className="custom-textfield"
              />
              {formik.errors.registerSurname && (
                <Typography className="register-error">
                  {formik.errors.registerSurname}
                </Typography>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <TextField
                label="T.C Kimlik Numarası"
                id="registerIdentityNo"
                name="registerIdentityNo"
                value={formik.values.registerIdentityNo}
                onChange={formik.handleChange}
                type="text"
                className="custom-textfield"
              />

              {formik.errors.registerIdentityNo && (
                <Typography className="register-error">
                  {formik.errors.registerIdentityNo}
                </Typography>
              )}
            </div>
            <div style={{ textAlign: "left", width: "40%" }}>
              <Select
                id="registerRole"
                name="registerRole"
                sx={{
                  width: "100%",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--color-blue)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--color-blue)",
                  },
                }}
                value={formik.values.registerRole || ""}
                onChange={formik.handleChange}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
              {formik.errors.registerRole && (
                <Typography className="register-error">
                  {formik.errors.registerRole}
                </Typography>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <TextField
                label="Mail"
                id="registerEmail"
                name="registerEmail"
                value={formik.values.registerEmail}
                onChange={formik.handleChange}
                type="mail"
                className="custom-textfield"
              />
              {formik.errors.registerEmail && (
                <Typography className="register-error">
                  {formik.errors.registerEmail}
                </Typography>
              )}
            </div>
            <div>
              <TextField
                id="registerBalance"
                label="Bakiye"
                name="registerBalance"
                value={formik.values.registerBalance}
                onChange={formik.handleChange}
                type="text"
                className="custom-textfield"
              />
              {formik.errors.registerBalance && (
                <Typography className="register-error">
                  {formik.errors.registerBalance}
                </Typography>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <TextField
                label="Şifre"
                id="registerPassword"
                name="registerPassword"
                value={formik.values.registerPassword}
                onChange={formik.handleChange}
                type="password"
                className="custom-textfield"
              />
              {formik.errors.registerPassword && (
                <Typography className="register-error">
                  {formik.errors.registerPassword}
                </Typography>
              )}
            </div>
            <div>
              <TextField
                label="Şifre Tekrarı"
                name="registerPasswordConfirm"
                value={formik.values.registerPasswordConfirm}
                onChange={formik.handleChange}
                type="password"
                className="custom-textfield"
              />
              {formik.errors.registerPasswordConfirm && (
                <Typography className="register-error">
                  {formik.errors.registerPasswordConfirm}
                </Typography>
              )}
            </div>
          </div>
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
            onClick={formik.handleSubmit}
          >
            Kullanıcı Ekle
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

export default NewUserModal;
