import { useEffect, useState } from "react";
import "./rates.style.css"

function Rate({ currency, rate }) {
  const [currencyName, setCurrencyName] = useState("");

  useEffect(() => {
    switch (currency) {
      case "USD":
        setCurrencyName("Amerikan Doları");
        break;
      case "EUR":
        setCurrencyName("Avrupa Birliği Eurosu");
        break;
      case "CHF":
        setCurrencyName("İsviçre Frangı");
        break;
      case "GBP":
        setCurrencyName("İngiliz Sterlini");
        break;
      default:
        setCurrencyName("");
        break;
    }
  }, [currency]);

  return (
    <>
      <p className="currency-name">{currencyName}</p>
      <p className="currency-info">{currency}: <span>{(1 / rate).toFixed(2)} TL </span></p> 
    </>
  );
}

export default Rate;
