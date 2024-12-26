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

export const adminList = [ // buraya ikon ve headeer eklediğimizde otomatik buton oluşacak
    {
      header: "Anasayfa",
      startIcon: <HomeIcon />
    },
    {
      header: "Kullanıcı Listesi",
      startIcon: <PeopleIcon />
    },
    {
      header: "Bankalar",
      startIcon: <AccountBalanceIcon />
    },
    {
      header: "Kullanıcı Hareketleri",
      startIcon: <RecentActorsIcon />
    },
    {
      header: "EFT / Havale",
      startIcon: <SendIcon />
    },
    {
      header: "Fatura Öde",
      startIcon: <ReceiptIcon />
    },
    {
      header: "Hesap Hareketleri",
      startIcon: <DescriptionIcon />
    },
    {
      header: "Kişisel Bilgilerim",
      startIcon: <InfoIcon />
    },
    {
      header: "Giriş Kayıtlarım",
      startIcon: <ExitToAppIcon />
    },
    {
      header: "Fatura Talimaltlarım",
      startIcon: <RequestPageIcon />
    },
  ];

  export const userList = [ // user menu itemleri girilecek ve MenuItems.jsx içine bu liste prop olarak gönderilecek
    {
      header: "Anasayfa",
      startIcon: <HomeIcon />
    },
    {
      header: "EFT / Havale",
      startIcon: <SendIcon />
    },
    {
      header: "Fatura Öde",
      startIcon: <ReceiptIcon />
    },
    {
      header: "Hesap Hareketleri",
      startIcon: <DescriptionIcon />
    },
    {
      header: "Kişisel Bilgilerim",
      startIcon: <InfoIcon />
    },
    {
      header: "Giriş Kayıtlarım",
      startIcon: <ExitToAppIcon />
    },
    {
      header: "Fatura Talimaltlarım",
      startIcon: <RequestPageIcon />
    },
  ];