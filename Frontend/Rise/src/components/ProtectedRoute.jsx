import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ role, children }) => {
  const [logUser, setLogUser] = useState(null); // Başlangıçta null olarak ayarlandı
  const secretKey = "a2b4c6d8e10f12g14h16i18j20k22";

  const decryptData = (encryptedUser) => {
    const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  useEffect(() => {
      // LocalStorage'dan veri al
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = decryptData(savedUser);
        setLogUser(parsedUser); // LocalStorage'dan alınan kullanıcıyı logUser'a set et
    }
  }, []);

  console.log("ProtectedRoute çalıştı");
  console.log("logUser --> ", logUser);
  console.log("role --> ", role);

  // Yükleme sırasında logUser'ın durumu null olduğu için bir kontrol yapalım.
  // Bu olmazsa eğer null döner dönmez ana sayfaya yönlendirme yapıyor. 
  if (logUser === null) {
    return <div>Loading...</div>; // Kullanıcı bilgisi yükleniyor önemli*
  }

  // Kullanıcı yoksa ana sayfaya yönlendir
  if (!logUser) {
    console.log("Kullanıcı yok, yönlendiriliyor...");
    return <Navigate to="/" replace />;
  }

  // Rol eşleşmiyorsa ana sayfaya yönlendir
  if (logUser?.role !== role) {
    console.log("Rol uyuşmuyor. Yönlendiriliyor...");
    return <Navigate to="/" replace />;
  }

  // Tüm kontrolleri geçtiyse çocuk bileşenleri render et
  return children;
};

export default ProtectedRoute;
