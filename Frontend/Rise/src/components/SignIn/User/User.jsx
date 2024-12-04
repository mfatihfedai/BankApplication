import React, { useEffect } from "react";
import { useUser } from "../../../context/UserContext";

function User() {
  const { user } = useUser();
  console.log(user);

  return (
    <div>{`Hoşgeldiniz ${user?.name}, Kullanıcı rolünüz : ${user?.role}`}</div>
  );
}

export default User;
