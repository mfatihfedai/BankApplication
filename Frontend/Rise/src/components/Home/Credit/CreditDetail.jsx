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
import { Box } from "@mui/material";

function CreditDetail() {
  const [amount, setAmount] = useState(""); 
  const [formattedAmount, setFormattedAmount] = useState(""); 
  const [months, setMonths] = useState(30); 
  const [creditType, setCreditType] = useState("Tüketici Kredisi"); 
  const [openModal, setOpenModal] = useState(false); 

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
    setMonths(30);
  }, [creditType]);

  const handleSliderChange = useCallback((e, newValue) => {
    setMonths(newValue);
  }, []);

  const formatAmount = (value) => {
    return value.toLocaleString("tr-TR");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = Number(rawValue);

    if (numericValue > 400000) {
      setAmount(400000); 
      setFormattedAmount(formatAmount(400000)); 
      setOpenModal(true); 
    } else {
      setAmount(numericValue);
      setFormattedAmount(formatAmount(numericValue)); 
    }
  };

  const handleCreditTypeChange = (e) => {
    setCreditType(e.target.value);
  };

  const monthlyPayment =
    amount > 0 && months > 0
      ? ((amount * (1 + interestRate / 100)) / months).toFixed(2)
      : 0;

  const handleCloseModal = () => {
    setOpenModal(false);
    setAmount(0); 
    setFormattedAmount(""); 
  };

  return (
    <div className="credit-detail" style={{ marginTop: "50px", marginBottom: "50px" }}>
      {/* Kredi Türü Combobox */}
      <FormControl style={{ width: "300px", borderRadius: '6px' }} sx={{ marginBottom: -1 }}>
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
        style={{ width: "300px", borderRadius: "6px", color: "black"}}
        type="text"
        id="standard-basic"
        variant="outlined"
        value={formattedAmount}
        onChange={handleAmountChange}
        onBlur={() => setFormattedAmount(formatAmount(amount))}
        InputProps={{
          startAdornment: (
            <div style={{width:"100%", fontSize: "18px", color: "black", marginRight:"4rem" }}>Tutar:</div>
          ),
          endAdornment: (
            <InputAdornment
              position="right"
            ><span style={{color:"black", fontWeight:"500"}}>TL</span></InputAdornment>
            
          ),
        }}
        fullWidth
        sx={{
          marginBottom: -1,
          "& .MuiInputBase-root": {
            fontFamily: "Montserrat, sans-serif",
            fontWeight:"500",
            borderRadius: "5px",
          },
        }}
      />

      {/* Faiz Oranı */}
      <TextField
        style={{ width: "300px", borderRadius: "6px", color: "black" }}
        id="standard-basic"
        disabled
        sx={{
          marginBottom: -1,
          "& .MuiOutlinedInput-root": {
            fontWeight:"500",
            "&:hover fieldset": {
              borderColor: "var(--color-blue)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-blue)",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <span style={{width:"100%", fontSize: "18px", color: "black" }}>Faiz Oranı:</span>
          ),
          endAdornment: (
            <span style={{ fontSize: "20px",fontWeight:"500", color: "black" }}>
              {interestRate.toFixed(2)}%
            </span>
          ),
        }}
      />

      {/* Kredi Vadesi */}
      <div className="credit-slider-box" style={{ marginBottom: -1 }}>
        <div className="credit-slider">
          <Slider
            aria-label="Months"
            value={months}
            onChange={handleSliderChange}
            valueLabelDisplay="off"
            color="var(--color-blue)"
            step={1}
            min={1}
            max={maxMonthsValue}
          />
          <div style={{ display: 'inline-block', transition: 'none', width: '97px', color: "black" }}>
            {months} <span>Ay</span>
          </div>
        </div>
      </div>

      {/* Aylık Ödeme */}     
      <Box
        sx={{
          textAlign: "center",
          width: "300px",
          borderRadius: "6px",
          border: "2px solid", 
          borderColor: "var(--color-blue)",
          padding: "8px",
          marginBottom: -1,
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Aylık Ödenecek Tutar:
        </p>
        <p
          style={{
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          {monthlyPayment} TL
        </p>
      </Box>

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
