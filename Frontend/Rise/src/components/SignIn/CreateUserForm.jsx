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


const CreateUserForm = () => {

  async function submit(){
    try{
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
      console.log(response);
    }catch(err){
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
        boxShadow: 1,
        fontFamily: "Montserrat",
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Hoşgeldiniz
      </Typography>
      <TextField
        label="Ad"
        name="registerName"
        value={values.registerName}
        onChange={handleChange}
        type="text"
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
      >
        Başvur
      </Button>
    </Box>
  );
};

export default CreateUserForm;
