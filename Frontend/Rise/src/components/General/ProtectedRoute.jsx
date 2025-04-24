import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { logoutUser } from "../../service/LogoutApi";
import { Modal } from "antd";


const ProtectedRoute = ({ role, children }) => {
  const { user, setUser } = useUser();
  const [logUserRole, setLogUserRole] = useState(user.role);
  const [logUser, setLogUser] = useState(null); // Başlangıçta null olarak ayarlandı
  const [isModalVisible, setIsModalVisible] = useState(false);
  // TANRİM BENİ BAŞTAN YARAT;

 // Logout işlemi
  const handleLogout = async () => {
    try {
      const response = await logoutUser(user);

      // Kullanıcıyı ve tokenı context'ten ve localStorage'dan temizleme
      localStorage.removeItem("token");
      localStorage.removeItem("lastLoginTime");
      setUser(null); // Eğer kullanıyorsanız user context'ten de temizleme

      return response;
    } catch (error) {
      console.error("Çıkış yapılamadı:", error.message);
    }
  };

  //Yükleme sırasında logUser'ın durumu null olduğu için bir kontrol yapalım. Bu olmazsa eğer null döner dönmez ana sayfaya yönlendirme yapıyor.
  // if (user.type == undefined) {
  //   console.log(user)
  //   // Modal'ı göster
  //   setIsModalVisible(true);
    
  //   // 3 saniye sonra modal'ı kapat ve logout işlemini gerçekleştir
  //   setTimeout(() => {
  //     setIsModalVisible(false);
  //     handleLogout();
  //   }, 3000);

  //   return (
  //     <>
  //       <Modal
  //         title="Çıkış Yapılıyor"
  //         open={isModalVisible}
  //         footer={null}
  //         closable={false}
  //       >
  //         <p>Hesabınızdan çıkış yapıldı, anasayfaya yönlendiriliyorsunuz...</p>
  //       </Modal>
  //       <Navigate to="/" replace />
  //     </>
  //   );
  // }

  // Kullanıcı yoksa ana sayfaya yönlendir
  if (!user) {
    console.log("Kullanıcı yok, yönlendiriliyor...");
    return <Navigate to="/" replace />;
  }

  if (user === undefined) {
    console.log("Undefined");
    return <Navigate to="/" replace />;
  }

  // Tüm kontrolleri geçtiyse children(App.jsx'te buluna Admin.jsx veya User.jsx) bileşenleri render et
  return children;
};

export default ProtectedRoute;
