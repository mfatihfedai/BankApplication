import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

function CreditDetail() {
  const [amount, setAmount] = useState(0);
  const [months, setMonths] = useState(30);
  const interestRate = 4.99;

  // Calculate monthly payment
  const monthlyPayment = amount > 0 && months > 0 
    ? ((amount * (1 + interestRate / 100)) / months).toFixed(2)
    : 0;

  return (
    <div className="credit-detail">
      <TextField
        type="number"
        id="standard-basic"
        label="Tutar"
        variant="standard"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <TextField
        disabled
        value={`Faiz Oranı: ${interestRate}`}
        id="standard-basic"
        variant="standard"
      />

<div className="credit-slider">
  <Slider
    aria-label="Months"
    value={months}
    onChange={(e, newValue) => setMonths(newValue)}
    valueLabelDisplay="off"
    step={1}
    min={1}
    max={48}
  />
  <p>{months} Ay</p>
</div>

      <div>
        <p>Aylık Ödenecek Tutar: {monthlyPayment} TL</p>
      </div>
    </div>
  );
}

export default CreditDetail;
