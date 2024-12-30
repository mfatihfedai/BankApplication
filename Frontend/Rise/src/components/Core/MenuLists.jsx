import HomeIcon from "@mui/icons-material/Home";
import RecentActorsIcon from '@mui/icons-material/RecentActors'; 
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import SendIcon from '@mui/icons-material/Send';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RequestPageIcon from '@mui/icons-material/RequestPage';

export const adminList = [ // buraya ikon ve header eklediğimizde otomatik buton oluşacak
    {
      header: "Anasayfa",
      startIcon: <HomeIcon />,
      returnComponent : "Home"
    },
    {
      header: "Kullanıcı Listesi",
      startIcon: <PeopleIcon />,
      returnComponent : "UserList"
    },
    {
      header: "Bankalar",
      startIcon: <AccountBalanceIcon />,
      returnComponent : "Banks"
    },
    {
      header: "Kullanıcı Hareketleri",
      startIcon: <RecentActorsIcon />,
      returnComponent : "UserActivities"

    },
    {
      header: "EFT / Havale",
      startIcon: <SendIcon />,
      returnComponent : "Transfer"
    },
    {
      header: "Fatura Öde",
      startIcon: <ReceiptIcon />,
      returnComponent : "Receipt"
    },
    {
      header: "Hesap Hareketleri",
      startIcon: <DescriptionIcon />,
      returnComponent : "AccountActivities"

    },
    {
      header: "Kişisel Bilgilerim",
      startIcon: <InfoIcon />,
      returnComponent : "PersonalInfo"

    },
    {
      header: "Giriş Kayıtlarım",
      startIcon: <ExitToAppIcon />,
      returnComponent : "LogsInfo"
    },
    {
      header: "Otomatik Ödeme Talimatlarım",
      startIcon: <RequestPageIcon />,
      returnComponent: "AutomaticPayment"
    },
  ];

  export const userList = [ // user menu itemleri girilecek ve MenuItems.jsx içine bu liste prop olarak gönderilecek
    {
      header: "Anasayfa",
      startIcon: <HomeIcon />,
      returnComponent : "Home"
    },
    {
      header: "EFT / Havale",
      startIcon: <SendIcon />,
      returnComponent : "Transfer"
    },
    {
      header: "Fatura Öde",
      startIcon: <ReceiptIcon />,
      returnComponent : "Receipt"
    },
    {
      header: "Hesap Hareketleri",
      startIcon: <DescriptionIcon />,
      returnComponent : "AccountActivities"

    },
    {
      header: "Kişisel Bilgilerim",
      startIcon: <InfoIcon />,
      returnComponent : "PersonalInfo"

    },
    {
      header: "Giriş Kayıtlarım",
      startIcon: <ExitToAppIcon />,
      returnComponent : "LogsInfo"
    },
    {
      header: "Otomatik Ödeme Talimatlarım",
      startIcon: <RequestPageIcon />,
      returnComponent: "AutomaticPayment"
    },
  ];