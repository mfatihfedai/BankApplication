import { useEffect, useState } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./rates.style.css";
import { useTranslation } from "react-i18next";

function Rate({ currency, rate }) {

  const [flagSrc, setFlagSrc] = useState("");
  const [isIncrease,setisIncrease] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    switch (currency) {
      case "USD":
        setFlagSrc(
          "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg"
        );
        setisIncrease(true);
        break;
      case "EUR":
        setFlagSrc(
          "https://ab-ilan.com/wp-content/uploads/2019/08/AB-Bayragi.jpg"
        );
        setisIncrease(false)
        break;
      case "CHF":
        setFlagSrc(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/200px-Flag_of_Switzerland_%28Pantone%29.svg.png"
        );
        setisIncrease(false);
        break;
      case "GBP":
        setFlagSrc(
          "https://ideacdn.net/idea/dk/71/myassets/products/261/280154233.png?revision=1697143329"
        );
        setisIncrease(true);
        break;
      default:
        setFlagSrc("");
        setisIncrease("");
        break;
    }
  }, [currency]);

  return (
    <>
      <p className="currency-name">
        <img src={flagSrc} alt="" /> <b>{t(currency)}</b> <span>{isIncrease ? <ArrowDropUpIcon style={{color : "green"}} /> :<ArrowDropDownIcon style={{color : "red"}}/>}</span>
      </p>
      <div className="currency-trade">
        <div className="currency-bank">
          <p className="currency-buy">
            {t("BankaSatis")} <div>{((1 / rate) * 1.02).toFixed(4)} TL </div>
          </p>
        </div>
        <div className="currency-bank">
          <p className="currency-sell">
           {t("BankaAlis")} <div>{((1 / rate) * 0.98).toFixed(4)} TL </div>
          </p>
        </div>
      </div>
    </>
  );
}

export default Rate;
