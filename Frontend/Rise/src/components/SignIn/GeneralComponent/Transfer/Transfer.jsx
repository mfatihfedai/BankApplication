import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import "./transfer.style.css";
import Receiver from "./Receiver";
import { getUserById } from "../../../../service/UserApi";
import { useAdminMenu } from "../../../../context/AdminMenuContext";
import Logo from "../../../../assets/LogoNonBackground.png";

function Transfer() {
  const { user, newUser } = useUser();
  const [balance, setBalance] = useState(user.balance);
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    setLoading(true);
    try {
      const response = await getUserById(user.id);
      setBalance(response.data.balance);
      newUser(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    );
  }

  return (
    <div className="transfer">
      <div className="header">
        <h1>Paranın Çekileceği Hesap</h1>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Hesap Türü</th>
              <th>Hesap Numarası</th>
              <th>Güncel Bakiye</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Vadesiz TL</th>
              <th>{user.accountNumber}</th>
              <th>{new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(balance)}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="header">
        <h1>Alıcı Bilgileri</h1>
      </div>
      <div className="receivers">
        <Receiver />
      </div>
    </div>
  );
}

export default Transfer;
