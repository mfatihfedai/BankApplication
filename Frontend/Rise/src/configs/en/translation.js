import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            Cikis:"EXIT",
            SonBesHareket:"Recent 5 Transactions",
            Tarih:"Date",
            Aciklama:"Explanation", 
            Tutar:"Amount",
            Anasayfa: "Home",
            KullaniciListesi: "User List",
            Bankalar: "Banks",
            KullaniciHareketleri: "User Transactions",
            Eft: "EFT / Money Transfer",
            FaturaOde: "Pay Bill",
            HesapHareketleri: "Account Transactions",
            KisiselBilgilerim: "My Personal Informatıon",
            GirisKayitlarim: "My Login Records",
            OtomatikOdemeTalimatlarim: "My Automatic Payment Orders",
            BilgileriGuncelle: "UPDATE INFORMATION",
            Sayin: "Dear",
            SonGiris: "Last Login",
            // USER INFORMATION
            TC: "Turkish Identity Number",
            Bakiye: "Balance",
            HesapNumarasi: "Account Number",
            SonIslemTarihi: "Last Transaction Date",
            // AUTOMATIC PAYMENT ORDERS
            FaturaTipi: "Invoice Type",
            FaturaNumarasi: "Invoice Number",
            SonOdenenTutar: "Last Paid Amount (₺)",
            OtomatikOdeme:"Auto Payment",
            Duzenle: "Edit",
            // LOGIN RECORDS
            GirisTarihi:"Login Date",
            CikisTarihi:"Logout Date",
            // ACCOUNT TRANSACTIONS
            IslemTarihi: "Transaction Date",
            Kanal: "Channel",
            Aciklama: "Description",
            IslemTutari: "Transaction Amount",
            Dekont: "Receipt",
            HesapDetaylari: "Account Details",
            IslemTarihi: "Transaction Date",
            GonderenHesapNo: "Sender Account No",
            GonderilenMiktar: "Transferred Amount",
            Aciklama: "Description",
            // INVOICE PAY
            FaturaOde: "Pay Invoice",
            FaturaNumarasi: "Invoice Number",
            FaturaTipi: "Invoice Type",
            FaturaTutari: "Invoice Amount (₺)",
            OtomatikOdeme: "Auto Payment Instruction",
            FaturayiOde: "Pay Invoice",
            FaturaOdeme: "Invoice Payment",
            Basarili: "Successful",
            Basarisiz: "Failed",
            //USER LIST
            KullaniciListesi: "User List",
            YeniKullanici: "New User",
            KullaniciAra: "Search User...",
            Ara: "Search",
            TcKimlik: "ID Number",
            IsimSoyisim: "Full Name",
            HesapNumarasi: "Account Number",
            Rol: "Role",
            Islemler: "Actions",
            Bilinmiyor: "Unknown",
            Geri: "Back",
            Ileri: "Next",
            SilmeOnayi: "Are you sure you want to delete this user?",
            Sil: "Delete",
            Iptal: "Cancel",
            // BANKS
            BankaYonetimi: "Bank Management",
            YeniBanka: "New Bank",
            BankaAdi: "Bank Name",
            TransferUcreti: "Transfer Fee",
            Duzenle: "Edit",
            BankaAdiZorunlu: "Bank name is required.",
            TransferUcretiZorunlu: "Transfer fee is required.",
            BankaBasariylaGuncellendi: "Bank updated successfully.",
            BankaGuncellenirkenHata: "An error occurred while updating the bank.",
            BankaBasariylaEklendi: "Bank added successfully.",
            BankaEklenirkenHata: "An error occurred while adding the bank.",
            BankaBasariylaSilindi: "Bank deleted successfully." ,
            // USER MOVEMENTS
            GirisKayitlariTablosu: "Login Records Table",
            GirisKayitlariGrafigi: "Login Records Chart",
            İsimSoyisim: "Full Name",
            // TRANSFER
            AliciHesapNo: "Receiver Account No",
            Gonder: "Send",
            LutfenHesapNumarasiniDogruGirin: "Please make sure the account number is entered correctly.",
            YetersizBakiye: "Insufficient balance",
            KendiHesapNumarasinaHavale: "You cannot send money to your own account.",
            ParaGondermeBasari: "Transfer successfully completed",
            HesapTuru: "Account Type",
            GuncelBakiye: "Current Balance",
            VadesizTL: "Current TL",
            ParaninCekilecegiHesap: "Account for Withdrawal",
            AliciBilgileri: "Receiver Information"

        }
    }
}

i18n
  .use(initReactI18next) //burada middleware olarak kullanmamız bizim context oluşturmamızla aynı işlevi yapıyor. i18n contextimiz var gibi davranacak. React dışından konfigüre edilip react içine enjekte edilme sebebi bazı alert gibi fonks. ihtiyaç duyabiliyor. React dışı tüketebilmek için.
  .init({
    resources,
    lng: "tr", 
   
});