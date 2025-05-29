import React, { useState } from "react";
import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useFormik } from "formik";
import { createUser } from "../../../../service/UserApi";
import { Select, MenuItem, Alert } from "@mui/material";
import { useNewUserFormSchema } from "../../../Schemas/NewUserFormSchemas";
import { useTranslation } from "react-i18next";

const NewUserModal = ({ open, onClose }) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const newUserFormSchemas = useNewUserFormSchema();
  const { t } = useTranslation();

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
        const response = await createUser(newUser);
        if (response.status === 200) {
          setSuccess(true);
          setSuccessModalOpen(true);
          setTimeout(() => {
            // 2 saniye sonra otomatik kapattım
            setSuccessModalOpen(false);
            onClose(); // Modalı kapat
          }, 3000);
        }
      } catch (error) {
        console.error("Kullanıcı ekleme hatası:", error.message);
        setError(true);
        setSuccessModalOpen(true);
        setTimeout(() => {
          // 2 saniye sonra otomatik kapattım
          setSuccessModalOpen(false);
        }, 3000);
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
            flexWrap: "wrap",
            flexDirection: "column",
            textAlign: "center",
            padding: "32px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 2,
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
                paddingTop: "1rem",
                textDecoration: "underline",
              }}
            >
              PRISMA BANK
            </h1>
          </Typography>
          <div className="information-area">
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
                  className="formUser"
                  label={t("Ad")}
                  id="registerName"
                  name="registerName"
                  value={formik.values.registerName || ""}
                  onChange={formik.handleChange}
                  type="text"
                />
                {formik.errors.registerName && (
                  <Typography className="error">
                    {formik.errors.registerName}
                  </Typography>
                )}
              </div>
              <div>
                <TextField
                  className="formUser"
                  label={t("Soyad")}
                  id="registerSurname"
                  name="registerSurname"
                  value={formik.values.registerSurname}
                  onChange={formik.handleChange}
                  type="text"
                />
                {formik.errors.registerSurname && (
                  <Typography className="error">
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
                width: "100%",
              }}
            >
              <div>
                <TextField
                  className="formUser"
                  label={t("TCKimlik")}
                  id="registerIdentityNo"
                  name="registerIdentityNo"
                  value={formik.values.registerIdentityNo}
                  onChange={formik.handleChange}
                  type="text"
                />
                {formik.errors.registerIdentityNo && (
                  <Typography className="error">
                    {formik.errors.registerIdentityNo}
                  </Typography>
                )}
              </div>
              <div className="identity-role-area">
                <Select
                  className="formUser"
                  id="registerRole"
                  name="registerRole"
                  value={formik.values.registerRole || ""}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
                {formik.errors.registerRole && (
                  <Typography className="error">
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
                  className="formUser"
                  label={t("Email")}
                  id="registerEmail"
                  name="registerEmail"
                  value={formik.values.registerEmail}
                  onChange={formik.handleChange}
                  type="mail"
                />
                {formik.errors.registerEmail && (
                  <Typography className="error">
                    {formik.errors.registerEmail}
                  </Typography>
                )}
              </div>
              <div>
                <TextField
                  className="formUser"
                  id="registerBalance"
                  label={t("Bakiye")}
                  name="registerBalance"
                  value={formik.values.registerBalance}
                  onChange={formik.handleChange}
                  type="text"
                />
                {formik.errors.registerBalance && (
                  <Typography className="error">
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
                  className="formUser"
                  label={t("Sifre")}
                  id="registerPassword"
                  name="registerPassword"
                  value={formik.values.registerPassword}
                  onChange={formik.handleChange}
                  type="password"
                />
                {formik.errors.registerPassword && (
                  <Typography className="error">
                    {formik.errors.registerPassword}
                  </Typography>
                )}
              </div>
              <div>
                <TextField
                  className="formUser"
                  label={t("SifreTekrari")}
                  name="registerPasswordConfirm"
                  value={formik.values.registerPasswordConfirm}
                  onChange={formik.handleChange}
                  type="password"
                />
                {formik.errors.registerPasswordConfirm && (
                  <Typography className="error">
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
                marginLeft: "2rem",
                marginRight: "2rem",
                marginBottom: "2rem",
              }}
              onClick={formik.handleSubmit}
            >
              {t("KullaniciEkle")}
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={successModalOpen}
        onClose={() => {
          setSuccess(false);
          setError(false);
          setSuccessModalOpen(false);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 400,
            borderRadius: "8px",
            boxShadow: 24,
            position: "relative",
            textAlign: "center",
          }}
        >
          {success && <Alert severity="success">{t("KullaniciBasarili")}</Alert>}
          {error && <Alert severity="error">{t("KayitSirasindaHata")}</Alert>}
        </Box>
      </Modal>
    </>
  );
};

export default NewUserModal;
