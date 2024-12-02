import React, { useEffect } from "react";
import { useUser } from "../../../context/UserContext";

function Admin() {
  const { user, setUser } = useUser();
  console.log(user);

  // useEffect(() => {
  //   const savedData = localStorage.getItem("data");
  //   if (savedData) {
  //     setUser(JSON.parse(savedData));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(user));
  // }, [user]);

  return (
    <div>{`Hoşgeldiniz ${user?.name}, Kullanıcı rolünüz : ${user?.role}`}</div>
  );
}

export default Admin;
