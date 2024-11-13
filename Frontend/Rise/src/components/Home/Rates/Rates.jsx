import {useState, useEffect} from 'react'
import { getRates } from '../../../service/RateApi';
import Rate from './Rate';
import "./rates.style.css"

function Rates() {
  const [allRates, setAllRates] = useState([]);
  // const [lastList, setLastList] = useState(null);

  // const [currentData, setCurrentData] = useState(null); // Güncel veri
  const [previousData, setPreviousData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getRates();
        // setAllRates(Object.entries(rates));

        setPreviousData(allRates); // Mevcut veriyi eski veri olarak ata
        setAllRates(Object.entries(rates));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {

  },[allRates])

  const filteredRates = allRates.filter(([currency]) => 
    currency === 'USD' || currency === 'EUR' || currency === 'GBP' || currency === 'CHF'
  ); 

  // console.log(filteredRates);
 
  //üst menü tekrar oluşturulacak aynı şekilde altıı boş kalacak

  return (
    <div className='rates'>
      {/* <h1>Fiyatlar ve Oranlar</h1> */} 
      <ul className='currency-list'>
        {filteredRates.map(([currency, rate]) => (
          <li className='currency-list-item' key={currency}>
            <Rate currency={currency} rate = {rate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rates