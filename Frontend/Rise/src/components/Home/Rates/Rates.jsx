import {useState, useEffect} from 'react'
import { getRates } from '../../../service/RateApi';
import Rate from './Rate';

function Rates() {
  const [allRates, setAllRates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getRates();
        setAllRates(Object.entries(rates));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const filteredRates = allRates.filter(([currency]) => 
    currency === 'USD' || currency === 'EUR' || currency === 'GBP' || currency === 'CHF'
  ); 

  return (
    <div>
      <h1>Fiyatlar ve Oranlar</h1>
      <ul>
        {filteredRates.map(([currency, rate]) => (
          <li key={currency}>
            <Rate currency={currency} rate = {rate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rates