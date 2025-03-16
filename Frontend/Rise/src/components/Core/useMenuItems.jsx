import HomeIcon from "@mui/icons-material/Home";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from "@mui/icons-material/Send";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { useTranslation } from "react-i18next";

export const useMenuItems = () => {
  const { t } = useTranslation();

  const adminList = [
    { header: t("Anasayfa"), startIcon: <HomeIcon/>, returnComponent: "Home" },
    { header: t("KullaniciListesi"), startIcon: <PeopleIcon />, returnComponent: "UserList" },
    { header: t("Bankalar"), startIcon: <AccountBalanceIcon />, returnComponent: "Banks" },
    { header: t("KullaniciHareketleri"), startIcon: <RecentActorsIcon />, returnComponent: "UserActivities" },
    { header: t("Eft"), startIcon: <SendIcon />, returnComponent: "Transfer" },
    { header: t("FaturaOde"), startIcon: <ReceiptIcon />, returnComponent: "Invoice" },
    { header: t("HesapHareketleri"), startIcon: <DescriptionIcon />, returnComponent: "Receipt" },
    { header: t("KisiselBilgilerim"), startIcon: <InfoIcon />, returnComponent: "PersonalInfo" },
    { header: t("GirisKayitlarim"), startIcon: <ExitToAppIcon />, returnComponent: "LogsInfo" },
    { header: t("OtomatikOdemeTalimatlarim"), startIcon: <RequestPageIcon />, returnComponent: "AutomaticPayment" },
  ];

  const userList = [
    { header: t("Anasayfa"), startIcon: <HomeIcon />, returnComponent: "Home" },
    { header: t("Eft"), startIcon: <SendIcon />, returnComponent: "Transfer" },
    { header: t("FaturaOde"), startIcon: <ReceiptIcon />, returnComponent: "Invoice" },
    { header: t("HesapHareketleri"), startIcon: <DescriptionIcon />, returnComponent: "Receipt" },
    { header: t("KisiselBilgilerim"), startIcon: <InfoIcon />, returnComponent: "PersonalInfo" },
    { header: t("GirisKayitlarim"), startIcon: <ExitToAppIcon />, returnComponent: "LogsInfo" },
    { header: t("OtomatikOdemeTalimatlarim"), startIcon: <RequestPageIcon />, returnComponent: "AutomaticPayment" },
  ];

  return { adminList, userList };
};