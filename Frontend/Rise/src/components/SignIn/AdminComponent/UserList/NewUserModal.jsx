import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { createUser } from "../../../../service/UserApi";
import { useNavigate } from "react-router-dom";

const NewUserModal = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submit = async (values) => {
    try {
      const registerUser = {
        name: values.registerName.toLocaleUpperCase(),
        surname: values.registerSurname.toLocaleUpperCase(),
        email: values.registerEmail,
        identityNumber: values.registerIdentityNo,
        password: values.registerPassword,
        role: values.registerRole,
        balance: values.registerBalance,
      };

      const response = await createUser(registerUser);

      if (response.request.status === 200) {
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error("Hata oluştu:", err);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      registerName: "",
      registerSurname: "",
      registerEmail: "",
      registerIdentityNo: "",
      registerPassword: "",
      registerRole: "",
      registerBalance: "",
    },

    onSubmit: submit,
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
        <TextField
          label="Ad"
          name="registerName"
          value={values.registerName}
          onChange={(e) =>
            handleChange({
              target: {
                name: "registerName",
                value: e.target.value.toLocaleUpperCase(),
              },
            })
          }
          type="text"
          className="custom-textfield"
        />
        {errors.registerName && (
          <Typography className="register-error">
            {errors.registerName}
          </Typography>
        )}

        {/* Diğer Alanlar */}
        <TextField
          label="Soyad"
          name="registerSurname"
          value={values.registerSurname}
          onChange={(e) =>
            handleChange({
              target: {
                name: "registerSurname",
                value: e.target.value.toLocaleUpperCase(),
              },
            })
          }
          type="text"
          className="custom-textfield"
        />
        {/* ... */}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ backgroundColor: "var(--color-blue)", marginBottom: "1rem" }}
        >
          Kullanıcı Ekle
        </Button>
        <InfoModal
          open={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/");
          }}
          title="Başarılı"
          content="Kayıt İşleminiz Başarılı Şekilde Gerçekleşti"
        />
      </Box>
    </>
  );
};

export default NewUserModal;
