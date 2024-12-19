import React from "react";
import { useUser } from "../../context/UserContext";
import LogoutButton from "./LogoutButton";
import "./dashboardHeader.style.css";
import LinearProgressBar from "../General/LinearProgressBar";
import { FormattedDate } from "./FormattedDate";

function DashboardHeader() {
  const { user, lastLoginTime } = useUser();
  console.log(user);

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-role">{`${user?.role}`}</div>
      <div className="dashboard-header-welcome">
        <p>Sayın {`${user?.name} ${user?.surname}`}</p>
        <p>
          Son Girişiniz: <FormattedDate dateString={`${lastLoginTime}`} />{" "}
        </p>
        {/* <p>Hesap No: {`${user?.accountNumber}`}</p> */}
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
