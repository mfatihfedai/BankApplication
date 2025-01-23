import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import "./transfer.style.css";
import Receiver from "./Receiver";

function Transfer() {
  const { user, newUser } = useUser();
  // const [balance, setBalance] = useState(user.balance);
  

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
              <th>{new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(user.balance)}</th>
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
