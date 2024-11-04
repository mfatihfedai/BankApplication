import { Slider, TextField } from "@mui/material";
import React from "react";
import "./credit.style.css";

function CreditDetail() {
  return (
    <div className="credit-detail">
      <TextField
        type="number"
        id="standard-basic"
        label="Tutar"
        variant="standard"
      />

      <TextField
        disabled
        value={"Faiz Oranı: 4.99"}
        id="standard-basic"
        variant="standard"
      />
      <div className="credit-slider">
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          // getAriaValueText={valuetext}
          valueLabelDisplay="off"
          step={1}
          min={1}
          max={48}
        />
        <p>Ay</p>
      </div>
      <div>
        <p>Aylık Ödenecek Tutar: </p>
      </div>
    </div>
  );
}

export default CreditDetail;
