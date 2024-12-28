import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { registerFormSchemas } from "../Schemas/RegisterFormSchemas";
import "./createUserForm.style.css";
import { createUser } from "../../service/UserApi";
import { useNavigate } from "react-router-dom";
import Logo from "../Home/Logo/Logo";

const CreateUserForm = () => {
  const navigate = useNavigate();

  async function submit() {
    try {
      const registerUser = {
        name: values.registerName,
        surname: values.registerSurname,
        email: values.registerEmail,
        identityNumber: values.registerIdentityNo,
        password: values.registerPassword,
        role: "USER",
        balance: 0,
      };
      const response = await createUser(registerUser);
      if (response.request.status === 200) {
        // bir modal ekleyelim
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      registerName: "",
      registerSurname: "",
      registerEmail: "",
      registerIdentityNo: "",
      registerPassword: "",
      registerPasswordConfirm: "",
      registerTerm: "",
    },
    validationSchema: registerFormSchemas,
    validateOnBlur: false, // Odak kaybında doğrulamayı devre dışı bırak  Nihan did it!
    validateOnChange: false, // Değişikliklerde doğrulamayı devre dışı bırak   Nihan did it!
    onSubmit: submit,
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        fontFamily: "Montserrat",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(to right, #ece9e6, #ffffff)",
      }}
    >
      <Typography
        style={{ fontWeight: "bold" }}
        variant="h5"
        textAlign="center"
        gutterBottom
      >
        <Logo />
        Hoş Geldiniz
      </Typography>
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
      <TextField
        label="Email"
        name="registerEmail"
        value={values.registerEmail}
        onChange={handleChange}
        type="text"
        className="custom-textfield"
      />
      {errors.registerEmail && (
        <Typography className="register-error">
          {errors.registerEmail}
        </Typography>
      )}
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
        label="Şifre Tekrarı"
        name="registerPasswordConfirm"
        value={values.registerPasswordConfirm}
        onChange={handleChange}
        type="password"
        className="custom-textfield"
      />
      {errors.registerPasswordConfirm && (
        <Typography className="register-error">
          {errors.registerPasswordConfirm}
        </Typography>
      )}
      <FormControlLabel
        label="Bu başvuru ile İnternet Bankacılığı´na tanımlı olan hesap ve ürünlerimin tanımlanacağını kabul ediyorum."
        control={
          <Checkbox
            value={values.registerTerm}
            name="registerTerm"
            onChange={handleChange}
          />
        }
      />
      {errors.registerTerm && (
        <Typography className="register-error">
          {errors.registerTerm}
        </Typography>
      )}
      <Button
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        style={{ backgroundColor: "var(--color-blue)", marginBottom: "1rem" }}
      >
        Başvur
      </Button>
    </Box>
  );
};

export default CreateUserForm;
