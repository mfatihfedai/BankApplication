import * as yup from 'yup';

export const registerFormSchemas = yup.object().shape({
    registerName : yup.string().required("İsim alanı zorunludur.*"),
    registerSurname : yup.string().required("Soyisim zorunludur.*"),
    registerEmail : yup.string().email("Geçerli bir email adresi giriniz.*").required("Email adresi zorunludur.*"),
    registerIdentityNo : yup.string().required("TC No zorunludur.").matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, "Geçerli bir T.C Kimlik Numarası giriniz."), //^[1-9]{1}[0-9]{9}[02468]{1}$
    registerPassword: yup.string().required("Şifre zorunludur.*"),
    registerPasswordConfirm: yup.string().required("Şifre tekrarı zorunludur.*").oneOf([yup.ref("registerPassword", yup.registerPassword)], "Şifreler eşleşmiyor.*"),
    registerTerm: yup.boolean().required("Lütfen kullanım şartlarını onaylayınız.*").oneOf([true], "Lütfen kullanım şartlarını onaylayınız.*")
})