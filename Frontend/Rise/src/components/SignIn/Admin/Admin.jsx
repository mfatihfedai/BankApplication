import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import LogoutButton from "../../Core/LogoutButton";

function Admin() {
  const { user } = useUser();

  return (
    <div>
      {`Hoşgeldiniz ${user?.name}, Kullanıcı rolünüz : ${user?.role}`}
      <LogoutButton />
    </div>
  );
}

export default Admin;
