import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import LogoutButton from "./LogoutButton";
import "./dashboardHeader.style.css";
import LinearProgressBar from "../General/LinearProgressBar";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { decryptData } from "../Core/CryptoJS";

function DashboardHeader() {
  const { user } = useUser();
  const [formattedDate, setFormattedDate] = useState("");
  const [rawDate, setRawDate] = useState();

  useEffect(() => {
    const lastLoginTimeEncrypt = localStorage.getItem("lastLoginTime");
    const lastLoginTime = decryptData(lastLoginTimeEncrypt);
    const date = new Date(lastLoginTime);
    setFormattedDate(format(date, "d MMMM yyyy HH:mm", { locale: tr }));
    setRawDate(date);
  }, [formattedDate]);

  console.log(formattedDate);
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-role">{`${user?.role}`}</div>
      <div className="dashboard-header-welcome">
        <p>Sayın {`${user?.name} ${user?.surname}`}</p>
        {rawDate?.getFullYear() === 1970 ? (
          <p>Last Login: İlk Giriş</p>
        ) : (
          <p>Last Login: {formattedDate}</p>
        )}
      </div>
      <div className="dashboard-header-logout-button">
        <div style={{ marginBottom: "10px" }}>
          <LinearProgressBar initialSecond={300} />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
