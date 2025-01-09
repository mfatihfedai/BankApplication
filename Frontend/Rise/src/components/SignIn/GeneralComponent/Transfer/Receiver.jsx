import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useBanks } from "../../../../context/BankContext";
import { getBanks } from "../../../../service/BankApi";

function Receiver() {
  const { banks, setBanks } = useBanks();

  useEffect(() => {
    async function fetchData() {
      try {
        const banksData  = await getBanks();
        setBanks(banksData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Alıcı Hesap No"
          name="registerName"
          //   value={values.registerName.toLocaleUpperCase()}
          //   onChange={handleChange}
          type="text"
          className="custom-textfield"
        />
        <TextField
          label="Tutar"
          name="registerSurname"
          //   value={values.registerSurname.toLocaleUpperCase()}
          //   onChange={handleChange}
          type="text"
          className="custom-textfield"
        />

        <TextField
          label="Açıklama"
          name="registerEmail"
          //   value={values.registerEmail}
          //   onChange={handleChange}
          type="text"
          className="custom-textfield"
        />

        <TextField
          label="Banka Adı"
          name="registerIdentityNo"
          //   value={values.registerIdentityNo}
          //   onChange={handleChange}
          type="text"
          className="custom-textfield"
        />

        <TextField
          label="Transfer Ücreti"
          name="registerPassword"
          //   value={values.registerPassword}
          //   onChange={handleChange}
          type="password"
          className="custom-textfield"
        />
      
        {banks.map((item, index) => (<p key={index}>{item.bankName}</p>))}



        {/* <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          style={{ backgroundColor: "var(--color-blue)", marginBottom: "1rem" }}
        >
          Gönder
        </Button> */}
      </Box>
    </div>
  );
}

export default Receiver;
