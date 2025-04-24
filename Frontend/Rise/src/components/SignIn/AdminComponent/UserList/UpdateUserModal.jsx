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
import { Select, MenuItem } from "@mui/material";
import { updateUser } from "../../../../service/UserApi";
import { useUpdateUserFormSchema } from "../../../Schemas/UpdateUserFormSchemas";
import { useTranslation } from "react-i18next";

const UpdateUserModal = ({ open, onClose, userData }) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const updateUserFormSchemas = useUpdateUserFormSchema();

  const handleUpdate = async () => {
    try {
      const user = {
        name: formik.values.registerName.toLocaleUpperCase("tr-TR"),
        surname: formik.values.registerSurname.toLocaleUpperCase("tr-TR"),
        email: formik.values.registerEmail,
        identityNumber: formik.values.registerIdentityNo,
        role: formik.values.registerRole,
        balance: formik.values.registerBalance,
      };

      const errors = await formik.validateForm(); //validasyon hatalarında yanlış updatei engelledim
      if (Object.keys(errors).length > 0) {
        console.log("Validation hatalarıııııı:", errors);
        return;
      }
      const response = await updateUser(userData.id, user);
      console.log(user);

      if (response.status === 200) {
        setSuccessMessage(t("KullaniciGuncelleBasarili"));
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
      setErrorMessage(t("GuncellemeHatasi"));
      setSuccessModalOpen(true);
      setTimeout(() => {
        // 2 saniye sonra otomatik kapattım
        setErrorMessage("");
        setSuccessModalOpen(false);
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      registerName: userData?.name || "",
      registerSurname: userData?.surname || "",
      registerEmail: userData?.email || "",
      registerIdentityNo: userData?.identityNumber || "",
      registerRole: userData?.role || "",
      registerBalance: userData?.balance || "",
    },
    validationSchema: updateUserFormSchemas,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleUpdate,
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
            gap: 3,
            padding: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h5" textAlign="center" fontWeight="bold">
            <h1
              style={{
                paddingTop: "1rem",
                textDecoration: "underline",
              }}
            >
              PRISMA BANK
            </h1>
          </Typography>
          <div className="information-area-update">
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
                  label={t("Ad")}
                  id="registerName"
                  name="registerName"
                  value={formik.values.registerName || ""}
                  onChange={formik.handleChange}
                  type="text"
                  className="formUser"
                />
                {formik.errors.registerName && (
                  <Typography className="register-error">
                    {formik.errors.registerName}
                  </Typography>
                )}
              </div>
              <div>
                <TextField
                  label={t("Soyad")}
                  id="registerSurname"
                  name="registerSurname"
                  value={formik.values.registerSurname}
                  onChange={formik.handleChange}
                  type="text"
                  className="formUser"
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
                width: "100%",
              }}
            >
              <div>
                <TextField
                  label={t("TCKimlik")}
                  id="registerIdentityNo"
                  name="registerIdentityNo"
                  value={formik.values.registerIdentityNo}
                  onChange={formik.handleChange}
                  type="text"
                  className="formUser"
                />
                {formik.errors.registerIdentityNo && (
                  <Typography className="register-error">
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
                  label={t("Email")}
                  id="registerEmail"
                  name="registerEmail"
                  value={formik.values.registerEmail}
                  onChange={formik.handleChange}
                  type="mail"
                  className="formUser"
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
                  label={t("Bakiye")}
                  name="registerBalance"
                  value={formik.values.registerBalance}
                  onChange={formik.handleChange}
                  type="text"
                  className="formUser"
                />
                {formik.errors.registerBalance && (
                  <Typography className="register-error">
                    {formik.errors.registerBalance}
                  </Typography>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                marginLeft: "2rem",
                marginRight: "2rem",
                marginBottom: "2rem",
              }}
              onClick={handleUpdate}
            >
              {t("KullaniciGuncelle")}
            </Button>
          </div>
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
            borderRadius: "8px",
            boxShadow: 24,
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
