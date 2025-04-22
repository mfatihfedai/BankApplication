import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
  Button,
  Modal,
  TextField,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getUserById, updateUser } from "../../../../service/UserApi";
import { useUser } from "../../../../context/UserContext";
import { useAdminMenu } from "../../../../context/AdminMenuContext";
import { useTranslation } from "react-i18next";

function PersonalInfo() {
  const { user, newUser } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { componentName } = useAdminMenu();
  const { t } = useTranslation();

  useEffect(() => {
    setFormData({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!formData.password) {
      setErrorMessage(t("ParolaniziGirmelisiniz"));
      return;
    }

    try {
      const updateRequest = {
        id: user.id,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
      };
      const response = await updateUser(user.id, updateRequest);
      if (response.status === 200) {
        setTimeout(() => {
          setSuccessMessage("");
          setModalOpen(false);
        }, 2000);
        setSuccessMessage("Bilgiler başarıyla güncellendi.");
        const response = await getUserById(user.id);
        newUser(response.data);

        const updatedUser = {
          ...user,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
        };
        newUser(updatedUser);
      }
    } catch (error) {
      setErrorMessage("Bilgiler güncellenirken bir hata oluştu.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex", // BURALARI COMPONENTNAME'E GÖRE DÜZELT
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          background:" var(--color-box-background)",
          color: "var(--color-text)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 3,
            }}
          >
            <Avatar sx={{ bgcolor: "var(--color-primary)", width: 80, height: 80, mb: 2 }}>
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {user.name} {user.surname}
            </Typography>
            <Typography variant="body1">
              {user.role}
            </Typography>
          </Box>
          <Divider
            sx={{
              mb: 3,
              backgroundColor: "var(--color-text)",
            }}
          />
          <Grid
            container
            spacing={2}
            sx={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(5, 1fr)",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body2">
                Email:
              </Typography>
              <Typography variant="body1" style={{ wordBreak: "break-word" }}>
                {user.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                {t("TC")}:
              </Typography>
              <Typography variant="body1">{user.identityNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                {t("HesapNumarasi")}:
              </Typography>
              <Typography variant="body1">{user.accountNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                {t("Bakiye")}:
              </Typography>
              <Typography variant="body1">{user.balance} ₺</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  display: componentName == "Home" ? "none" : "block",
                }}
                onClick={() => setModalOpen(true)}
              >
                {t("BilgileriGuncelle")}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Update Modal */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setErrorMessage("");
          setSuccessMessage("");
        }}
        aria-labelledby="update-modal"
        aria-describedby="update-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="update-modal"
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            {t("BilgileriGuncelle")}
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <TextField
            label={t("Ad")}
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label={t("Soyad")}
            name="surname"
            fullWidth
            margin="normal"
            value={formData.surname}
            onChange={handleInputChange}
          />
          <TextField
            label={t("Email")}
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label={t("Sifre")}
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleUpdate}
          >
            {t("KullaniciGuncelle")}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default PersonalInfo;
