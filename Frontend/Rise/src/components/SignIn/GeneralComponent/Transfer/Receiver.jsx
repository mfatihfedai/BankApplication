import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useBanks } from "../../../../context/BankContext";
import { getBanks } from "../../../../service/BankApi";
import { createTransfer } from "../../../../service/TransferApi";
import { useFormik } from "formik";
import { receiverFormSchemas } from "../../../Schemas/ReceiverFormSchemas";

function Receiver() {
  const { banks, setBanks } = useBanks();

  async function submit() {
      try {
        const transfer = {
          receiverAccountNo: values.receiverAccountNo,
          transferAmount: values.transferAmount,
          message: values.transferMessage,
          bankName: values.bankName,
          transferFee: values.transferFee,
        };
        const response = await createTransfer(transfer);
        console.log(transfer);
        console.log(response)
        if (response.status === 200) {
          console.log(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    const { values, errors, handleChange, handleSubmit } = useFormik({
      initialValues: {
        receiverAccountNo: "",
        transferAmount: "",
        transferMessage: "",
        bankName: "",
        transferFee: "",
      },
      validationSchema: receiverFormSchemas,
      validateOnBlur: false, // Odak kaybında doğrulamayı devre dışı bırak  Nihan did it!
      validateOnChange: false, // Değişikliklerde doğrulamayı devre dışı bırak   Nihan did it!
      onSubmit: submit,
    });

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const banksData  = await getBanks();
  //       setBanks(banksData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);
  
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
          name="receiverAccountNo"
            value={values.receiverAccountNo}
            onChange={handleChange}
          type="text"
          className="custom-textfield"
        />
        <TextField
          label="Tutar"
          name="transferAmount"
            value={values.transferAmount}
            onChange={handleChange}
          type="number"
          className="custom-textfield"
        />

        <TextField
          label="Açıklama"
          name="transferMessage"
            value={values.transferMessage}
            onChange={handleChange}
          type="text"
          className="custom-textfield"
        />

        <TextField
          label="Banka Adı"
          name="bankName"
            value={values.bankName}
            onChange={handleChange}
          type="text"
          className="custom-textfield"
        />

        <TextField
          label="Transfer Ücreti"
          name="transferFee"
            value={values.transferFee}
            onChange={handleChange}
          type="number"
          className="custom-textfield"
        />
      
        {/* {banks.map((item, index) => (<p key={index}>{item.bankName}</p>))} */}



        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          style={{ backgroundColor: "var(--color-blue)", marginBottom: "1rem" }}
        >
          Gönder
        </Button>
      </Box>
    </div>
  );
}

export default Receiver;
