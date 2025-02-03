import * as yup from "yup";

export const invoiceFormSchemas = yup.object().shape({
  invoiceNo: yup
    .number()
    .required("Fatura numarası zorunludur")
    .typeError("Fatura numarası yalnızca rakamlardan oluşmalıdır"),
  invoiceType: yup.string().required("Fatura tipi seçilmelidir"),
  invoiceAmount: yup
    .number()
    .required("Fatura tutarı zorunludur")
    .typeError("Fatura tutarı sayısal olmalıdır")
    .min(1, "Fatura tutarı 1'den küçük olamaz"),
  autobill: yup.boolean(),
});
