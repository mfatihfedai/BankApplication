import { useEffect, useState } from "react";
import "./rates.style.css"

function Rate({ currency, rate }) {
  const [currencyName, setCurrencyName] = useState("");
  const [flagSrc,setFlagSrc] = useState("");

  useEffect(() => {
    switch (currency) {
      case "USD":
        setCurrencyName("Amerikan Doları");
        setFlagSrc("https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg");
        break;
      case "EUR":
        setCurrencyName("Avrupa Birliği Eurosu");
        setFlagSrc("https://ab-ilan.com/wp-content/uploads/2019/08/AB-Bayragi.jpg");
        break;
      case "CHF":
        setCurrencyName("İsviçre Frangı");
        setFlagSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/200px-Flag_of_Switzerland_%28Pantone%29.svg.png");
        break;
      case "GBP":
        setCurrencyName("İngiliz Sterlini");
        setFlagSrc("https://ideacdn.net/idea/dk/71/myassets/products/261/280154233.png?revision=1697143329");
        break;
      default:
        setCurrencyName("");
        setFlagSrc("")

        break;
    }
  }, [currency]);

  return (
    <>
      <p className="currency-name"> <img src={flagSrc} alt="" /> {currencyName}</p>
      <p className="currency-info">{currency}: <span>{(1 / rate).toFixed(2)} TL </span></p> 
    </>
  );
}

export default Rate;
