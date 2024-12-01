import React, { useEffect, useState } from 'react'
import { getBanks } from '../../service/UserApi';

function Dashboard() {

    const [bank, setBank] = useState([]);

   useEffect(()=> {
    async function fetchData(){
            try{
              const banks = await getBanks();
              console.log(banks);
              setBank(banks.data.items);
              console.log(bank);
            }catch(err){
              console.log(err.message);
            }
          }
          fetchData();
   },[])
    return (
      <div>
      {/* Eğer bank boşsa bir mesaj gösterebilirsiniz */}
      {bank.length === 0 ? (
        <p>Loading banks...</p>
      ) : (
        <div>
          banks:
          {bank?.map((item, index) => (
            <p key={index}>{item.bankName} : {item.transferFee}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard