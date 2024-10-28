import { useEffect, useState } from "react";

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
      <div>{currencyName}</div>
      {currency}: {(1 / rate).toFixed(2)} TL
    </>
  );
}

export default Rate;
