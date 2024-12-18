import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decryptData } from "./Core/CryptoJS";

const ProtectedRoute = ({ role, children }) => {
  const [logUser, setLogUser] = useState(null); // Başlangıçta null olarak ayarlandı

  // LocalStorage'dan veri al
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = decryptData(savedUser);
      setLogUser(parsedUser); // LocalStorage'dan alınan kullanıcıyı logUser'a set et
    }
  }, []);

  //Yükleme sırasında logUser'ın durumu null olduğu için bir kontrol yapalım. Bu olmazsa eğer null döner dönmez ana sayfaya yönlendirme yapıyor.
  if (logUser === null) {
    // sayaç koyulabilir
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

  // Tüm kontrolleri geçtiyse children(App.jsx'te buluna Admin.jsx veya User.jsx) bileşenleri render et
  return children;
};

export default ProtectedRoute;
