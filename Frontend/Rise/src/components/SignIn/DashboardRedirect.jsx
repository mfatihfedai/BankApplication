import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const DashboardRedirect = () => { // gerek yok silinecek
  const navigate = useNavigate();
  const { user } = useUser();
  
  useEffect(() => {
    console.log("dashboard redirect çalıştı");
    if (user?.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (user?.role === "USER") {
      navigate("/user-dashboard");
    }
    //  else {
    //   navigate("/"); // Eğer rol bilinmiyorsa ana sayfaya yönlendirme
    // }
  }, [user, navigate]);

  return null; // Bu bileşen hiçbir şey render etmez, sadece yönlendirme yapar
};

export default DashboardRedirect;
