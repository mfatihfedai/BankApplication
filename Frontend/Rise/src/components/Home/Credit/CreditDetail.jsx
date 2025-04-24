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
import { useTranslation } from "react-i18next";

function CreditDetail() {
  const [amount, setAmount] = useState(""); 
  const [formattedAmount, setFormattedAmount] = useState(""); 
  const [months, setMonths] = useState(30); 
  const [creditType, setCreditType] = useState("Tüketici Kredisi"); 
  const [openModal, setOpenModal] = useState(false); 
  const { t } = useTranslation();

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
      <FormControl
      sx={{ 
        marginBottom: -1, 
        width: "100%",
        }}>
        <Select
          labelId="credit-type-label"
          value={creditType}
          onChange={handleCreditTypeChange}
          sx={{
            color: "var(--color-text)",
            background: "var(--color-box-background)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MenuItem value="Tüketici Kredisi">{t("TuketiciKredisi")}</MenuItem>
          <MenuItem value="Taşıt Kredisi">{t("TasitKredisi")}</MenuItem>
          <MenuItem value="Konut Kredisi">{t("KonutKredisi")}</MenuItem>
        </Select>
      </FormControl>

      {/* Tutar Input */}
      <TextField
        type="text"
        id="standard-basic"
        value={formattedAmount}
        onChange={handleAmountChange}
        onBlur={() => setFormattedAmount(formatAmount(amount))}
        InputProps={{
          startAdornment: (
            <div style={{ color: "var(--color-text)", marginRight:"4rem" }}>{t("Tutar")}:</div>
          ),
          endAdornment: (
            <InputAdornment
              position="right"
            ><span style={{color:"var(--color-text)", fontWeight:"500"}}>TL</span></InputAdornment>
            
          ),
        }}
        fullWidth
        sx={{
          background: "var(--color-box-background)",
          borderRadius: "6px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: -1,
          "& .MuiInputBase-root": {
            fontWeight:"500",
          },
        }}
      />

      {/* Faiz Oranı */}
      <TextField
        style={{ 
          background: "var(--color-box-background)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
        }}
        id="standard-basic"
        sx={{
          marginBottom: -1,
          "& .MuiOutlinedInput-root": {
            fontWeight:"500",
          },
        }}
        InputProps={{
          startAdornment: (
            <span style={{width:"100%", textWrap:"nowrap", color: "var(--color-text)" }}>{t("FaizOrani")}:</span>
          ),
          endAdornment: (
            <span style={{ fontWeight:"500", color: "var(--color-text)" }}>
              {interestRate.toFixed(2)}%
            </span>
          ),
        }}
      />

      {/* Kredi Vadesi */}
      <Box className="credit-slider-box" style={{ marginBottom: -1 }}
        sx={{
          background: "var(--color-box-background)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid",
          borderColor: "var(--color-textfield-border)" 
        }}>
        <div className="credit-slider">
          <Slider
            aria-label="Months"
            value={months}
            onChange={handleSliderChange}
            valueLabelDisplay="off"
            color="var(--color-text)"
            step={1}
            min={1}
            max={maxMonthsValue}
          />
          <div 
          style={{ 
            display: 'inline-block',
            marginLeft:"5px", 
            textAlign: "right", 
            textWrap:"nowrap" , 
            transition: 'none', 
            color: "var(--color-text)",
            display: "flex",
            alignItems: "center",
            }}>
            {months} <span>{t("Ay")}</span>
          </div>
        </div>
      </Box>

      {/* Aylık Ödeme */}     
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          border: "1px solid", 
          padding: "8px",
          marginBottom: -1,
          background: "var(--color-box-background)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {t("AylikOdenecekTutar")}
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
      <Dialog open={openModal} onClose={handleCloseModal}
        sx={{
          ".MuiPaper-root": {
            backgroundColor: "var(--color-background)",
          },
        }}
      >
        <DialogTitle color="var(--color-text)">{t("IslemHatasi")}</DialogTitle>
        <DialogContent
          sx={{
            color: "var(--color-text)",
          }}
        >
          <p>{t("FazlaTutarIcinSube")}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>
            {t("Tamam")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreditDetail;
