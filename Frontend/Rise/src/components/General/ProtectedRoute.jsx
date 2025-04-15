import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { decryptData } from "../Core/CryptoJS";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useUser();
  const [logUserRole, setLogUserRole] = useState(user.role);
  const [logUser, setLogUser] = useState(null); // Başlangıçta null olarak ayarlandı
  // TANRİM BENİ BAŞTAN YARAT;

  console.log(user);
  // LocalStorage'dan veri al
  // IF PROJECT COMPLETE, REMOVE THIS PART
  // useEffect(() => {
  //   const savedUser = localStorage.getItem("user");
  //   console.log("Protected Router Çalışıyor");
  //   if (savedUser) {
  //     const parsedUser = decryptData(savedUser);
  //     setLogUser(parsedUser); // LocalStorage'dan alınan kullanıcıyı logUser'a set et
  //   }
  // }, []);


  //Yükleme sırasında logUser'ın durumu null olduğu için bir kontrol yapalım. Bu olmazsa eğer null döner dönmez ana sayfaya yönlendirme yapıyor.
  if (user == {}) {
    // sayaç koyulabilir
    return <div>Loading...</div>; // Kullanıcı bilgisi yükleniyor önemli*
  }

  // Kullanıcı yoksa ana sayfaya yönlendir
  if (!user) {
    console.log("Kullanıcı yok, yönlendiriliyor...");
    return <Navigate to="/" replace />;
  }

  if (user === undefined) {
    console.log("Undifined");
    return <Navigate to="/" replace />;
  }


  // Rol eşleşmiyorsa ana sayfaya yönlendir
  // if (!logUser) {
  //   console.log("Rol uyuşmuyor. Yönlendiriliyor...");
  //   // MODAL ÇIKIP GÜVENLİ ÇIKIŞ YAPILDI DİYECEK
  //   return <Navigate to="/" replace />;
  // }

  // Tüm kontrolleri geçtiyse children(App.jsx'te buluna Admin.jsx veya User.jsx) bileşenleri render et
  return children;
};

export default ProtectedRoute;
