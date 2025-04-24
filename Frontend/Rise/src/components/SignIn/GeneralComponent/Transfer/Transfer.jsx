import React from "react";
import { useUser } from "../../../../context/UserContext";
import "./transfer.style.css";
import Receiver from "./Receiver";
import { useTranslation } from "react-i18next";
import GeneralTable from "../../../General/GeneralTable";

function Transfer() {
  const { user } = useUser();
  const { t } = useTranslation();

  // Tablo verileri
  const data = [
    {
      hesapTuru: t("VadesizTL"),
      hesapNumarasi: user.accountNumber,
      guncelBakiye: new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(user.balance),
    },
  ];

  // Tablo sütunları
  const columns = [
    { field: "hesapTuru", headerName: t("HesapTuru"), flex: 1, sortable: false },
    { field: "hesapNumarasi", headerName: t("HesapNumarasi"), flex: 1, sortable: false },
    { field: "guncelBakiye", headerName: t("GuncelBakiye"), flex: 1, sortable: false },
  ];

  return (
    <>
      <div className="contents">
        <h1>{t("ParaninCekilecegiHesap")}</h1>
        <div className="table">
          <GeneralTable data={data} columns={columns} />
        </div>
        <div>
          <h1>{t("AliciBilgileri")}</h1>
        </div>
        <div className="receivers">
          <Receiver />
        </div>
      </div>
    </>
  );
}

export default Transfer;