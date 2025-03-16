import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import "./transfer.style.css";
import Receiver from "./Receiver";
import { useTranslation } from "react-i18next";

function Transfer() {
  const { user, newUser } = useUser();
  // const [balance, setBalance] = useState(user.balance);
  const { t } = useTranslation();

  return (
    <div className="transfer">
      <div className="header">
        <h1>{t("ParaninCekilecegiHesap")}</h1>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>{t("HesapTuru")}</th>
              <th>{t("HesapNumarasi")}</th>
              <th>{t("GuncelBakiye")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{t("VadesizTL")}</th>
              <th>{user.accountNumber}</th>
              <th>
                {new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                }).format(user.balance)}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="header">
        <h1>{t("AliciBilgileri")}</h1>
      </div>
      <div className="receivers">
        <Receiver />
      </div>
    </div>
  );
}

export default Transfer;
