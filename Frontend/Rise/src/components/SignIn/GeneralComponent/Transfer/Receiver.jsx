import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useBanks } from "../../../../context/BankContext";
import { getBanks } from "../../../../service/BankApi";
import { createTransfer } from "../../../../service/TransferApi";
import { useFormik } from "formik";
import { receiverFormSchemas } from "../../../Schemas/ReceiverFormSchemas";
import { useAdminMenu } from "../../../../context/AdminMenuContext";
import { useUser } from "../../../../context/UserContext";

function Receiver() {

  const {user} = useUser();
  const {setComponentName} = useAdminMenu();
  
  async function submit() {
      try {
        const transfer = {
          receiverAccountNo: values.receiverAccountNo,
          transferAmount: values.transferAmount,
          message: `${values.transferMessage}: ${user.name} ${user.surname} tarafından gönderildi`,
          bankName: values.bankName,
          transferFee: values.transferFee,
          isReceiver: false
        };
        const response = await createTransfer(transfer);
        console.log(response);
        // başarılı modal
        setComponentName("Home");
      } catch (err) {
        console.log(err.response.data.data);
        // başarısız modal
        setState("err.response.data.data")
      }
    }
  
    const { values, errors, handleChange, handleSubmit } = useFormik({
      initialValues: {
        receiverAccountNo: "",
        transferAmount: "",
        transferMessage: "",
        bankName: "Prisma Bank",
        transferFee: 1.00,
      },
      validationSchema: receiverFormSchemas,
      validateOnBlur: false, // Odak kaybında doğrulamayı devre dışı bırak  Nihan did it!
      validateOnChange: false, // Değişikliklerde doğrulamayı devre dışı bırak   Nihan did it!
      onSubmit: submit,
    });
  
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
        disabled
          label="Banka Adı"
          name="bankName"
          value={values.bankName}
          onChange={handleChange}
          type="text"
          className="custom-textfield"
        />

        <TextField
        disabled
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
