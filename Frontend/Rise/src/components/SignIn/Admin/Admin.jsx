import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { logoutUser } from "../../../service/LogoutApi";
import { useNavigate } from "react-router";

function Admin() {
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
      {`Hoşgeldiniz ${user?.name}, Kullanıcı rolünüz : ${user?.role}`}
      <button onClick={handleLogout}>Güvenli Çıkış</button>
    </div>
  );
}

export default Admin;
