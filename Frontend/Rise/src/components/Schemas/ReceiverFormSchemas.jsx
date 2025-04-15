import * as yup from "yup";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useReceiverFormSchema = () => {
  const { t } = useTranslation();
  
  return useMemo(() => yup.object().shape({
    receiverAccountNo: yup.number().required(t("validation.accountNumberRequired")),
    transferAmount: yup
      .number()
      .positive(t("validation.positiveValue"))
      .required(t("validation.amountRequired")),
    transferMessage: yup.string(),
    bankName: yup.string(),
    transferFee: yup.number().positive(t("validation.positiveValue"))
  }), [t]);
};