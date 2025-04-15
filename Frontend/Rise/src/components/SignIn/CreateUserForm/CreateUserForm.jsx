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
import { useRegisterFormSchema } from "../../Schemas/RegisterFormSchemas";
import { createUser } from "../../../service/UserApi";
import { useNavigate } from "react-router-dom";
import InfoModal from "./InfoModal";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from "react-i18next";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [isKvkkChecked, setIsKvkkChecked] = useState(false);
  const [isInfoChecked, setIsInfoChecked] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { t } = useTranslation();
  const registerFormSchemas = useRegisterFormSchema();

  const handleModalResult = (type, result) => {
    if (type === "info") {
      setIsInfoChecked(result);
    }
    if (type === "kvkk") {
      setIsKvkkChecked(result);
    }
    setOpenModal(null);
  };

  async function submit() {
    if (!isKvkkChecked || !isInfoChecked) {
      setShowWarningModal(true);
      return;
    }
    try {
      const registerUser = {
        name: values.registerName.toLocaleUpperCase("tr-TR"),
        surname: values.registerSurname.toLocaleUpperCase("tr-TR"),
        email: values.registerEmail,
        identityNumber: values.registerIdentityNo,
        password: values.registerPassword,
        role: "USER",
        balance: 0,
      };
      const response = await createUser(registerUser);
      if (response.request.status === 200) {
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleMainPage = () => {
    navigate("/")
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      registerName: "",
      registerSurname: "",
      registerEmail: "",
      registerIdentityNo: "",
      registerPassword: "",
      registerPasswordConfirm: "",
    },
    validationSchema: registerFormSchemas,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: submit,
  });

  return (
    <>
      <Box
        component="form"
        sx={{
          maxWidth: 600,
          gap: 2,
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          padding: "16px",
          border: "1px solid var(--color-box-border)",
          background: "var(--color-box-background)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ArrowBackIosNewIcon
          onClick={handleMainPage}
          className="back-icon"
        />
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          className="MuiTypography-root"
        >
          <h1 className="MuiTypography-h1">
            {t("PrismaBank")}
          </h1>
          {t("HosGeldiniz")}
        </Typography>
        <div>
          <TextField
            label={t("Ad")}
            name="registerName"
            value={values.registerName.toLocaleUpperCase()}
            onChange={handleChange}
            type="text"
          />
          {errors.registerName && (
            <Typography className="error">
              {errors.registerName}
            </Typography>
          )}
        </div>
        <div>
          <TextField
            label={t("Soyad")}
            name="registerSurname"
            value={values.registerSurname.toLocaleUpperCase()}
            onChange={handleChange}
            type="text"
          />
          {errors.registerSurname && (
            <Typography className="error">
              {errors.registerSurname}
            </Typography>
          )}
        </div>
        <div>
          <TextField
          label={t("Email")}
          name="registerEmail"
          value={values.registerEmail}
          onChange={handleChange}
          type="text"
          />
          {errors.registerEmail && (
            <Typography className="error">
              {errors.registerEmail}
            </Typography>
          )}
        </div>
        <div>
          <TextField
            label={t("TCKimlik")}
            name="registerIdentityNo"
            value={values.registerIdentityNo}
            onChange={handleChange}
            type="text"
          />
          {errors.registerIdentityNo && (
            <Typography className="error">
              {errors.registerIdentityNo}
            </Typography>
          )}
        </div>
        <div>
          <TextField
            label={t("Sifre")}
            name="registerPassword"
            value={values.registerPassword}
            onChange={handleChange}
            type="password"
          />
          {errors.registerPassword && (
            <Typography className="error">
              {errors.registerPassword}
            </Typography>
          )}
        </div>
        <div>
          <TextField
            label={t("SifreTekrari")}
            name="registerPasswordConfirm"
            value={values.registerPasswordConfirm}
            onChange={handleChange}
            type="password"
          />
          {errors.registerPasswordConfirm && (
            <Typography className="error">
              {errors.registerPasswordConfirm}
            </Typography>
          )}
        </div>
        <div>
          <FormControlLabel
            label={t("AydinlatmaMetni")}
            control={
              <Checkbox
                value={isInfoChecked}
                name="registerInfo"
                checked={isInfoChecked}
                onClick={() => setOpenModal("info")}
              />
            }
          />
          {errors.isInfoChecked && (
            <Typography className="error">
              {errors.isInfoChecked}
            </Typography>
          )}
        </div>
        <div>
          <FormControlLabel
            label={t("KVKKMetni")}
            control={
              <Checkbox
                value={isKvkkChecked}
                name="registerKVKK"
                checked={isKvkkChecked}
                onClick={() => setOpenModal("kvkk")}
              />
            }
          />
          {errors.isKvkkChecked && (
            <Typography className="error">
              {errors.isKvkkChecked}
            </Typography>
          )}
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          fullWidth
        >
          {t("Basvur")}
        </Button>
        <InfoModal
          open={openModal === "info"}
          onClose={(result) => handleModalResult("info", result)}
          title={t("AydinlatmaMetniBaslik")}
          content={t("AydinlatmaMetniIcerik")}
        />
        <InfoModal
          open={openModal === "kvkk"}
          onClose={(result) => handleModalResult("kvkk", result)}
          title={t("KVKKMetniBaslik")}
          content={t("KVKKMetniIcerik")}
        />
        <InfoModal
          open={showWarningModal}
          onClose={() => setShowWarningModal(false)}
          title={t("Uyari")}
          content={t("UyariIcerik")}
        />
        <InfoModal
          open={showSuccessModal}
          onClose={() => navigate("/")}
          title={t("Basarili")}
          content={t("BasariliIcerik")}
        />
      </Box>
    </>
  );
};

export default CreateUserForm;