import React from 'react'
import { useState } from 'react'
import Link from '@mui/material/Link';
import './credit.style.css'
import CreditDetail from './CreditDetail';
import DepositDetail from './DepositDetail';

function Credit() {

  const [isCredit, setIsCredit] = useState(true);

  return (
    <>
    <div className='credit'>
      <h1 className='credit-header'>Kredi Hesaplama</h1>
      <div className='credit-deposit'>
        <Link className={`credit-link ${isCredit ? 'active' : ''}`}  onClick={() => setIsCredit(true)}></Link>
        <Link className={`credit-link ${isCredit ? '' : 'active'}`}  onClick={() => setIsCredit(false)}></Link>
      </div>
      <div className='credit-info'>
        {isCredit ? <CreditDetail /> : <DepositDetail />}
      </div>
    </div>
    </>
  )
}

export default Credit