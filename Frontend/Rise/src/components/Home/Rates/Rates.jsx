import {useState, useEffect} from 'react'
import { getRates } from '../../../service/RateApi';
import Rate from './Rate';
import "./rates.style.css"


function Rates() {
  const [allRates, setAllRates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getRates();
        if(rates){
          setAllRates(Object.entries(rates));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  const filteredRates = allRates.filter(([currency]) => 
    currency === 'USD' || currency === 'EUR' || currency === 'GBP' || currency === 'CHF'
  ); 

  // console.log(filteredRates);
 
  //üst menü tekrar oluşturulacak aynı şekilde altıı boş kalacak

  return (
    <div className='rates'>
      <h1 className="rates-header">Güncel Kurlar</h1>
      {/* <h1>Fiyatlar ve Oranlar</h1> */} 
      <ul className='currency-list'>
        {filteredRates?.map(([currency, rate]) => (
          <li className='currency-list-item' key={currency}>
            <Rate currency={currency} rate = {rate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rates