import React, { useState } from "react";
import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useFormik } from "formik";
import { createUser } from "../../../../service/UserApi";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { registerFormSchemas } from "../../../Schemas/RegisterFormSchemas";

const NewUserModal = ({ open, onClose }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submit = async (values) => {
    try {
      const newUser = {
        name: values.registerName,
        surname: values.registerSurname,
        email: values.registerEmail,
        identityNumber: values.registerIdentityNo,
        password: values.registerPassword,
        role: values.registerRole,
        balance: values.registerBalance,
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

  const {
    values,
    errors,
    handleChange,
    onSubmit,
    handleSubmit,
    setFieldValue,
  } = useFormik({
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
    validateOnChange: false,

    onSubmit: submit,
  });

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          padding: 3,
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
            name="registerName"
            value={values.registerName}
            onChange={handleChange}
            type="text"
            className="custom-textfield"
          />
          {errors.registerName && (
            <Typography className="register-error">
              {errors.registerName}
            </Typography>
          )}
          <TextField
            label="Soyad"
            name="registerSurname"
            value={values.registerSurname}
            onChange={handleChange}
            type="text"
            className="custom-textfield"
          />
          {errors.registerSurname && (
            <Typography className="register-error">
              {errors.registerSurname}
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
            name="registerIdentityNo"
            value={values.registerIdentityNo}
            onChange={handleChange}
            type="text"
            className="custom-textfield"
          />

          {errors.registerIdentityNo && (
            <Typography className="register-error">
              {errors.registerIdentityNo}
            </Typography>
          )}
          <FormControl sx={{ width: 237 }}>
            <InputLabel>Rol</InputLabel>
            <Select
              name="registerRole"
              value={values.registerRole}
              onChange={(e) => setFieldValue("registerRole", e.target.value)}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
          </FormControl>
          {errors.registerRole && (
            <Typography className="register-error">
              {errors.registerRole}
            </Typography>
          )}

          {errors.registerRole && (
            <Typography className="register-error">
              {errors.registerRole}
            </Typography>
          )}
        </div>
        <TextField
          sx={{ width: 500, margin: "auto" }}
          label="Mail"
          name="registerEmail"
          value={values.registerEmail}
          onChange={handleChange}
          type="mail"
          className="custom-textfield"
        />
        {errors.registerEmail && (
          <Typography className="register-error">
            {errors.registerEmail}
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
            name="registerPassword"
            value={values.registerPassword}
            onChange={handleChange}
            type="password"
            className="custom-textfield"
          />
          {errors.registerPassword && (
            <Typography className="register-error">
              {errors.registerPassword}
            </Typography>
          )}

          <TextField
            label="Balance"
            name="registerBalance"
            value={values.registerBalance}
            onChange={handleChange}
            type="text"
            className="custom-textfield"
          />
          {errors.registerBalance && (
            <Typography className="register-error">
              {errors.registerBalance}
            </Typography>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ backgroundColor: "var(--color-blue)", marginBottom: "1rem" }}
          onClick={submit}
        >
          Kullanıcı Ekle
        </Button>
      </Box>
    </Modal>
  );
};

export default NewUserModal;
