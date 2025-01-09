import * as yup from 'yup';

export const receiverFormSchemas = yup.object().shape({
    receiverAccountNo : yup.string().required("Lütfen bir hesap numarası giriniz.*"),
    transferAmount : yup.number().positive("Geçerli bir değer giriniz.*").required("Geçerli bir değer giriniz.*"),
    transferMessage : yup.string(),
    bankName: yup.string(),
    transferFee: yup.number().positive()
})