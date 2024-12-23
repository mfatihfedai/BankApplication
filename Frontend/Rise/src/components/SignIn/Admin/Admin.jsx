import React, { useEffect, useState } from "react";
import DashboardHeader from "../../General/DashboardHeader";
import MenuItems from "../../General/MenuItems";
import { adminList } from "../../Core/MenuLists";
import { useAdminMenu } from "../../../context/AdminMenuContext";
import Home from "./Home/Home";
import Users from "./Users/Users";
import "./admin.style.css"

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
          {componentName == "Anasayfa" && <Home />}
          {componentName == "Kullanıcılar" && <Users />}
        </div>
      </div>
    </>
  );
}

export default Admin;
