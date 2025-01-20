import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { logoutUser } from "../../service/LogoutApi";
import Button from "@mui/material/Button";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAdminMenu } from "../../context/AdminMenuContext";

function LogoutButton() {
  const { user, setUser } = useUser(); // Eğer user'ı context'ten temizlemeniz gerekirse
  const navigate = useNavigate();
  const { setComponentName } = useAdminMenu();

  // Logout işlemi
  const handleLogout = async () => {
    try {
      const response = await logoutUser(user);

      // Kullanıcıyı ve tokenı context'ten ve localStorage'dan temizleme
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("lastLoginTime");
      setUser(null); // Eğer kullanıyorsanız user context'ten de temizleme

      // Ana sayfaya yönlendir
      navigate("/");
      setComponentName("Home");

      return response;
    } catch (error) {
      console.error("Çıkış yapılamadı:", error.message);
    }
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: "var(--color-red)" }}
        onClick={handleLogout}
        variant="contained"
        startIcon={<PowerSettingsNewIcon />}
      >
        Çıkış
      </Button>
    </div>
  );
}

export default LogoutButton;
