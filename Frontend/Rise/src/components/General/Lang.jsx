import React from "react";
import { useTranslation } from "react-i18next";

function Lang() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (e) => {
    const langKey = e.target.value;
    i18n.changeLanguage(langKey);
  };

  return (
    <div>
      <select onChange={changeLanguage}>
        <option value="tr">Türkçe</option>
        <option value="en">İngilizce</option>
      </select>
    </div>
  );
}

export default Lang;
