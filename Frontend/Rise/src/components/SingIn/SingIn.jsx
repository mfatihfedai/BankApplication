import React, { useState } from "react";
 import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import "./signIn.style.css"
import axios from "axios";

const SingIn = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        customerNumber: customerNumber,
        password: password,
      });

      // Giriş başarılıysa yanıt verilerinden token’ı alıp saklıyoruz
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Giriş başarılı");
        // Yönlendirme veya korumalı bir sayfaya geçiş yapılabilir
      }
    } catch (error) {
      setErrorMessage("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Müşteri Numarası"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
export default SingIn;
