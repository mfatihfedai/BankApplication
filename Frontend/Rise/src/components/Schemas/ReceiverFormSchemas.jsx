import * as yup from 'yup';

export const receiverFormSchemas = yup.object().shape({
    receiverAccountNo : yup.string().required("Lütfen bir hesap numarası giriniz.*"),
    transferAmount : yup.string().required("Geçerli bir değer giriniz.*"), // string değil number olacak ve 0 an büyük olacak
    transferMessage : yup.string()
})