import * as yup from "yup";

export const updateUserFormSchemas = yup.object().shape({
  registerName: yup.string().required("Kullanıcı adı zorunludur."),
  registerSurname: yup.string().required("Kullanıcı soyadı zorunludur."),
  registerEmail: yup
    .string()
    .email("Geçerli bir e-mail adresi giriniz.")
    .required("E-mail adresi zorunludur."),
  registerIdentityNo: yup
    .string()
    .required("TC No zorunludur.")
    .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, "Geçerli bir TC No giriniz."),
  registerRole: yup.string().required("Kullanıcı rolü seçilmelidir."),
  registerBalance: yup
    .number()
    .required("Bakiye bilgisi zorunludur.")
    .positive("Geçerli bir değer giriniz.")
    .typeError("Bakiye tutarı sayısal olmalıdır."),
});
