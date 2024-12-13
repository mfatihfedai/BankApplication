import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { logoutUser } from "../../service/LogoutApi";
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


function LogoutButton() {
  const { user, setUser } = useUser(); // Eğer user'ı context'ten temizlemeniz gerekirse
  const navigate = useNavigate();

  // Logout işlemi
  const handleLogout = async () => {
    try {
      const response = await logoutUser(user);

      // Kullanıcıyı ve tokenı context'ten ve localStorage'dan temizleme
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null); // Eğer kullanıyorsanız user context'ten de temizleme

      // Ana sayfaya yönlendir
      navigate("/");

      return response;
    } catch (error) {
      console.error("Çıkış yapılamadı:", error.message);
    }
  };

  return (
    <div>
      <Button style={{backgroundColor: "var(--color-blue)"}} onClick={handleLogout} variant="contained" startIcon={<PowerSettingsNewIcon />}>
        Çıkış
      </Button>
    </div>
  );
}

export default LogoutButton;
