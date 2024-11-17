import React, { useEffect, useState } from 'react'
import { getBanks } from '../../service/UserApi';

function Dashboard() {

    const [bank, setBank] = useState([]);


   useEffect(()=> {
    async function fetchData(){
            try{
              const banks = await getBanks();
              console.log(banks);
              setBank(banks);
            }catch(err){
              console.log(err.message);
            }
          }
          fetchData();
   },[])

  return (
    <div>
      DAshno
    </div>
  )
}

export default Dashboard