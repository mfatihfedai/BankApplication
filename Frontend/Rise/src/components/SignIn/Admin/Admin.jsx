import React, { useEffect, useState } from "react";
import DashboardHeader from "../../General/DashboardHeader";
import MenuItems from "../../General/MenuItems";
import { adminList } from "../../Core/MenuLists";


function Admin() {
  return (
    <>
      <DashboardHeader />
      <div >
        <MenuItems list={adminList} />
      </div>
    </>
  );
}

export default Admin;
