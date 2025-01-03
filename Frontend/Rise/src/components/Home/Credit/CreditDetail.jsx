import { useState, useCallback, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function CreditDetail() {
  const [amount, setAmount] = useState(""); 
  const [formattedAmount, setFormattedAmount] = useState(""); 
  const [months, setMonths] = useState(30); // Varsayılan ay
  const [creditType, setCreditType] = useState("Tüketici Kredisi"); 
  const [openModal, setOpenModal] = useState(false); // Modalın default durumu

  const interestRates = {
    "Tüketici Kredisi": 3.99,
    "Taşıt Kredisi": 5.05,
    "Konut Kredisi": 3.09,
  };
  const interestRate = interestRates[creditType];

  const maxMonths = {
    "Tüketici Kredisi": 36,
    "Taşıt Kredisi": 48,
    "Konut Kredisi": 120,
  };
  const maxMonthsValue = maxMonths[creditType];

  useEffect(() => {
    setMonths(30); // Her kredi türü değiştiğinde slider'ı 30'a sıfırlandı
  }, [creditType]);

  const handleSliderChange = useCallback((e, newValue) => {
    setMonths(newValue);
  }, []);

  // Tutarın para birimini belirledik
  const formatAmount = (value) => {
    return value.toLocaleString("tr-TR");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Sadece sayıları aldık
    const numericValue = Number(rawValue);

    if (numericValue > 400000) {
      setAmount(400000); // Amount'u 400.000 ile sabitledk
      setFormattedAmount(formatAmount(400000)); 
      setOpenModal(true); 
    } else {
      setAmount(numericValue);
      setFormattedAmount(formatAmount(numericValue)); 
    }
  };

  // Kredi türü değiştiğinde faiz oranını ve max ay sayısı güncelledik
  const handleCreditTypeChange = (e) => {
    setCreditType(e.target.value);
  };

  // Aylık ödeme hesaplama
  const monthlyPayment =
    amount > 0 && months > 0
      ? ((amount * (1 + interestRate / 100)) / months).toFixed(2)
      : 0;

  // Modalı kapatma fonksiyonu
  const handleCloseModal = () => {
    setOpenModal(false);
    setAmount(0); // Modal kapatıldığında amount 0 ladık
    setFormattedAmount(""); 
  };

  return (
    <div className="credit-detail">
      {/* Kredi Türü Combobox */}
      <FormControl style={{ width: "300px", borderRadius: '6px' }}>
        <Select
          labelId="credit-type-label"
          value={creditType}
          onChange={handleCreditTypeChange}
        >
          <MenuItem value="Tüketici Kredisi">Tüketici Kredisi</MenuItem>
          <MenuItem value="Taşıt Kredisi">Taşıt Kredisi</MenuItem>
          <MenuItem value="Konut Kredisi">Konut Kredisi</MenuItem>
        </Select>
      </FormControl>

      {/* Tutar Input */}
      <TextField
        type="text"
        id="standard-basic"
        label="Tutar"
        variant="outlined"
        value={formattedAmount}
        onChange={handleAmountChange}
        onBlur={() => setFormattedAmount(formatAmount(amount))}
        InputProps={{
          endAdornment: <InputAdornment position="end">TL</InputAdornment>, // TL sona ekledik
        }}
        fullWidth
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '5px', // Border kenarına ovallik verdik
          },
          marginBottom: 3,
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "var(--color-blue)", // Hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-blue)", // Focus
            },
          },
        }} 
      />

      {/* Faiz Oranı */}
      <TextField style={{ width: "300px", borderRadius: '6px', color: "black" }}   
        value  ={`Faiz Oranı: ${interestRate.toFixed(2)}%`}
        id="standard-basic"
        sx={{
          marginBottom: 3,
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "var(--color-blue)", // Hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-blue)", // Focus
            },
          },
        }}
      />

      {/* Kredi Vadesi */}
      <div className="credit-slider">
        <Slider
          aria-label="Months"
          value={months}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          step={1}
          min={1}
          max={maxMonthsValue} 

          sx={
            {
              color :"var(--color-blue)"
            }
          }

        />
        <div style={{ display: 'inline-block', transition: 'none' }}>
          {months} <span style={{ marginLeft: '5px' }}>Ay</span>
        </div>
      </div>

      {/* Aylık Ödeme */}
     
      <div style={{ textAlign: 'center',  }}>
      <p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
    Aylık Ödenecek Tutar:
  </p>
  <p style={{ fontSize: '20px',  textAlign: 'center' }}>
    {monthlyPayment} TL
  </p>
      </div>

      {/* Hata Modalı */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Hata</DialogTitle>
        <DialogContent>
          <p>400.000 fazla tutar için şubemize geliniz</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Tamam
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreditDetail;
