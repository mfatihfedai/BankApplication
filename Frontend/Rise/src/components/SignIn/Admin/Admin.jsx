import React, { useEffect, useState } from "react";
import DashboardHeader from "../../General/DashboardHeader";
import MenuItems from "../../General/MenuItems";
import { useAdminMenu } from "../../../context/AdminMenuContext";
import "./admin.style.css";
import Home from "../GeneralComponent/Home/Home";
import Invoice from "../GeneralComponent/Invoice/Invoice";
import AutomaticPayment from "../GeneralComponent/AutomaticPayment/AutomaticPayment";
import PersonalInfo from "../GeneralComponent/PersonalInfo/PersonalInfo";
import Receipt from "../GeneralComponent/Receipt/Receipt";
import Transfer from "../GeneralComponent/Transfer/Transfer";
import LogsInfo from "../GeneralComponent/LogsInfo/LogsInfo";
import UserList from "../AdminComponent/UserList/UserList";
import UserActivities from "../AdminComponent/UserActivities/UserActivities";
import Banks from "../AdminComponent/Banks/Banks";
import { useMenuItems } from "../../Core/useMenuItems";
import CircularMenu from "../../Home/MenuBar/CircularMenu";

function Admin() {
  const { componentName } = useAdminMenu();
  const { adminList } = useMenuItems();
  const [menuOpen, setMenuOpen] = useState(false); // Menü aç/kapat

  return (
    <>
      <DashboardHeader />
      <div className="admin-parent">
        <button
          className="hamburger-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menü (Mobilde Açılır/Kapanır) */}
        <div className={`list-item ${menuOpen ? "open" : ""}`}>
          <MenuItems setMenuOpen={setMenuOpen} list={adminList} />
        </div>

        <div className="component-item">
          {componentName === "Home" && <Home />}
          {componentName === "UserList" && <UserList />}
          {componentName === "Banks" && <Banks />}
          {componentName === "UserActivities" && <UserActivities />}
          {componentName === "Invoice" && <Invoice />}
          {componentName === "AutomaticPayment" && <AutomaticPayment />}
          {componentName === "PersonalInfo" && <PersonalInfo />}
          {componentName === "Receipt" && <Receipt />}
          {componentName === "Transfer" && <Transfer />}
          {componentName === "LogsInfo" && <LogsInfo />}
        </div>
      </div>

      <div className="circular-menu">
        <CircularMenu userType="admin" />
      </div>

      {/* <DashboardHeader />
      <div className="admin-parent">
        <button onClick={} className="hamburger-menu">Hamburger</button>
        <div className="list-item">
          <MenuItems list={adminList} />
        </div>
        <div className="component-item">
          {componentName == "Home" && <Home />}
          {componentName == "UserList" && <UserList />}
          {componentName == "Banks" && <Banks />}
          {componentName == "UserActivities" && <UserActivities />}
          {componentName == "Invoice" && <Invoice />}
          {componentName == "AutomaticPayment" && <AutomaticPayment />}
          {componentName == "PersonalInfo" && <PersonalInfo />}
          {componentName == "Receipt" && <Receipt />}
          {componentName == "Transfer" && <Transfer />}
          {componentName == "LogsInfo" && <LogsInfo />}
        </div>
      </div> */}
    </>
  );
}

export default Admin;
