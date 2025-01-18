import React, { useEffect, useState } from "react";
import DashboardHeader from "../../General/DashboardHeader";
import MenuItems from "../../General/MenuItems";
import { adminList } from "../../Core/MenuLists";
import { useAdminMenu } from "../../../context/AdminMenuContext";
import "./admin.style.css";
import Home from "../GeneralComponent/Home/Home";
import Invoice from "../GeneralComponent/Invoice/Invoice";
import AutomaticPayment from "../GeneralComponent/AutomaticPayment/AutomaticPayment";
import PersonalInfo from "../GeneralComponent/PersonalInfo/PersonalInfo";
import Receipt from "../GeneralComponent/Receipt/Receipt";
import Transfer from "../GeneralComponent/Transfer/Transfer";
import LogsInfo from "../GeneralComponent/LogsInfo/LogsInfo";



function Admin() {
  const { componentName } = useAdminMenu();

  return (
    <>
      <DashboardHeader />
      <div className = "admin-parent">
        <div className="list-item">
          <MenuItems list={adminList} />
        </div>
        <div className="component-item">
          {componentName == "Home" && <Home />}
          {componentName == "Invoice" && <Invoice />}
          {componentName == "AutomaticPayment" && <AutomaticPayment />}
          {componentName == "PersonalInfo" && <PersonalInfo />}
          {componentName == "Receipt" && <Receipt />}
          {componentName == "Transfer" && <Transfer />}
          {componentName == "LogsInfo" && <LogsInfo />}
        </div>
      </div>
    </>
  );
}

export default Admin;
