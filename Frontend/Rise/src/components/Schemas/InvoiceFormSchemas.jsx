import * as yup from "yup";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const InvoiceFormSchemas = () => {
  const { t } = useTranslation();
  
  return useMemo(() => {
    return yup.object().shape({
      invoiceNo: yup
        .number()
        .required(t("FaturaZorunlu"))
        .typeError(t("FaturaSadeceRakam")),
      invoiceType: yup.string().required(t("FaturaTipiZorunlu")),
      invoiceAmount: yup
        .number()
        .required(t("FaturaTutariZorunlu"))
        .typeError(t("FaturaTutariSadeceRakam"))
        .min(1, t("FaturaTutariMin")),
      autobill: yup.boolean(),
    });
  }, [t]);
};
