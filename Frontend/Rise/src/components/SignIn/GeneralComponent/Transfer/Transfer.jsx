import React from "react";
import { useUser } from "../../../../context/UserContext";
import "./transfer.style.css";
import Receiver from "./Receiver";

function Transfer() {
  // başlandı

  const { user } = useUser();

  return (
    <div className="transfer">
      <div className="transfer-header">
        <h1>Paranın Çekileceği Hesabım</h1>
      </div>
      <div className="sender">
        <div className="sender-headers">
          <h1 className="sender-header">Hesap Tipi</h1>
          <h1 className="sender-header">Hesap No</h1>
          <h1 className="sender-header">Bakiye</h1>
        </div>
        <div className="sender-infos">
          <p className="sender-info">Vadesiz TL</p>
          <p className="sender-info">{user.accountNumber}</p>
          <p className="sender-info">{user.balance.toFixed(2)}</p>
        </div>
      </div>
      <div className="transfer-header">
        <h1>Alıcı Bilgileri</h1>
      </div>
      <div className="receivers">
        <Receiver />
      </div>
    </div>
  );
}

export default Transfer;
