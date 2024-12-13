import React, { useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import LogoutButton from "../../Core/LogoutButton";

function User() {
  const { user } = useUser();

  return (
    <div>{`Hoşgeldiniz ${user?.name}, Kullanıcı rolünüz : ${user?.role}`} <LogoutButton /></div>
    
  );
}

export default User;
