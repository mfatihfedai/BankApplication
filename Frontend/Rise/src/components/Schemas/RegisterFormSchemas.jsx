import * as yup from "yup";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useRegisterFormSchema = () => {
  const { t } = useTranslation();
  
  return useMemo(() => yup.object().shape({
    registerName: yup.string().required(t("validation.nameRequired")),
    registerSurname: yup.string().required(t("validation.surnameRequired")),
    registerEmail: yup
      .string()
      .email(t("validation.validEmail"))
      .required(t("validation.emailRequired")),
    registerIdentityNo: yup
      .string()
      .required(t("validation.idNumberRequired"))
      .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, t("validation.validIdNumber")),
    registerPassword: yup.string().required(t("validation.passwordRequired")),
    registerPasswordConfirm: yup
      .string()
      .required(t("validation.passwordConfirmRequired"))
      .oneOf([yup.ref("registerPassword")], t("validation.passwordsMustMatch"))
  }), [t]);
};