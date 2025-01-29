import React, { useState } from "react";
import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useFormik } from "formik";
import { createUser } from "../../../../service/UserApi";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { registerFormSchemas } from "../../../Schemas/RegisterFormSchemas";

const NewUserModal = ({ open, onClose }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submit = async () => {
    try {
      const newUser = {
        name: registerName.value,
        surname: registerSurname.value,
        email: registerEmail.value,
        identityNumber: registerIdentityNo.value,
        password: registerPassword.value,
        role: registerRole.value,
        balance: registerBalance.value,
      };
      console.log(newUser);
      const response = await createUser(newUser);
      console.log(newUser);

      if (response.request.status === 200) {
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error("Hata oluştu:", err);
    }
  };
  const formik = useFormik({
    initialValues: {
      registerName: "",
      registerSurname: "",
      registerEmail: "",
      registerIdentityNo: "",
      registerPassword: "",
      registerRole: "",
      registerBalance: "",
    },
    validationSchema: registerFormSchemas,
    onSubmit: submit,
  });

  return (
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

        {/* Form Fields */}
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
          {formik.errors.registerName && (
            <Typography className="register-error">
              {formik.errors.registerName}
            </Typography>
          )}
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

          {formik.errors.registerIdentityNo && (
            <Typography className="register-error">
              {formik.errors.registerIdentityNo}
            </Typography>
          )}
          <FormControl sx={{ width: 237 }}>
            <InputLabel>Rol</InputLabel>
            <Select
              id="registerRole"
              name="registerRole"
              value={formik.values.registerRole || ""}
              onChange={formik.handleChange}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
          </FormControl>
          {formik.errors.registerRole && (
            <Typography className="register-error">
              {formik.errors.registerRole}
            </Typography>
          )}
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
        {formik.errors.registerEmail && (
          <Typography className="register-error">
            {formik.errors.registerEmail}
          </Typography>
        )}
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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

          <TextField
            id="registerBalance"
            label="Balance"
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

        {/* Submit Button */}
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
          onClick={submit}
        >
          Kullanıcı Ekle
        </Button>
      </Box>
    </Modal>
  );
};

export default NewUserModal;
