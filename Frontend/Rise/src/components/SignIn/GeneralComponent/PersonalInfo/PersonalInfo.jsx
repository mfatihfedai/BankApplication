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
import { decryptData, encryptData } from "../../../Core/CryptoJS";
import { getUserById, updateUser } from "../../../../service/UserApi";
import Logo from "../../../../assets/LogoNonBackground.png";
import "../../../Core/logo.css";
import { useUser } from "../../../../context/UserContext";

function PersonalInfo() {
  const { user,newUser } = useUser();

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
      setErrorMessage("Parolanızı girmelisiniz.");
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
        display: "flex",
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
            <Avatar sx={{ bgcolor: "#00333D", width: 80, height: 80, mb: 2 }}>
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {user.name} {user.surname}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.role}
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Grid
            container
            spacing={2}
            sx={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(5, 1fr)",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Email:
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                TC Kimlik Numarası:
              </Typography>
              <Typography variant="body1">{user.identityNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Hesap Numarası:
              </Typography>
              <Typography variant="body1">{user.accountNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Bakiye:
              </Typography>
              <Typography variant="body1">{user.balance} ₺</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#00333D" }}
                onClick={() => setModalOpen(true)}
              >
                Bilgileri Güncelle
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
            bgcolor: "white",
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
            Bilgileri Güncelle
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <TextField
            label="Ad"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Soyad"
            name="surname"
            fullWidth
            margin="normal"
            value={formData.surname}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Şifre"
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
            sx={{ mt: 2, backgroundColor: "#00333D" }}
            onClick={handleUpdate}
          >
            Güncelle
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default PersonalInfo;
