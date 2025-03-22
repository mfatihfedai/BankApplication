import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    tr: {
        translation: {
            Cikis:"ÇIKIŞ",
            SonBesHareket:"Son 5 Hareket",
            Tarih:"Tarih",
            Aciklama:"Açıklama", 
            Tutar:"Tutar",
            Anasayfa:"Anasayfa",
            KullaniciListesi: "Kullanıcı Listesi",
            Bankalar: "Bankalar",
            KullaniciHareketleri: "Kullanıcı Hareketleri",
            Eft: "EFT / Havale",
            FaturaOde: "Fatura Öde",
            HesapHareketleri: "Hesap Hareketleri",
            KisiselBilgilerim: "Kişisel Bilgilerim",
            GirisKayitlarim: "Giriş Kayıtlarım",
            OtomatikOdemeTalimatlarim: "Otomatik Ödeme Talimatlarım",
            BilgileriGuncelle:"BİLGİLERİ GÜNCELLE",
            Sayin: "Sayın",
            SonGiris: "Son Giriş",
            // KİŞİSEL BİLGİLERİM
            TC: "TC Kimlik Numarası",
            Bakiye: "Bakiye",
            HesapNumarasi: "Hesap Numarası",
            SonIslemTarihi: "Son İşlem Tarihi",
            // OTOMATİK ÖDEME TALİMATLARIM
            FaturaTipi: "Fatura Tipi",
            FaturaNumarasi: "Fatura Numarası",
            SonOdenenTutar :"Son Ödenen Tutar(₺)",
            OtomatikOdeme:"Otomatik Ödeme",
            Duzenle:"Düzenle",
            // GİRİŞ KAYITLARIM
            GirisTarihi:"Giriş Tarihi",
            CikisTarihi:"Çıkış Tarihi",
            // HESAP HAREKETLERİM
            IslemTarihi: "İşlem Tarihi",
            Kanal: "Kanal",
            Aciklama: "Açıklama",
            IslemTutari: "İşlem Tutarı",
            Dekont: "Dekont",
            HesapDetaylari: "Hesap Detayları",
            IslemTarihi: "İşlem Tarihi",
            GonderenHesapNo: "Gönderen Hesap No",
            GonderilenMiktar: "Gönderilen Miktar",
            Aciklama: "Açıklama",
            // FATURA ÖDE
            FaturaOde: "Fatura Öde",
            FaturaNumarasi: "Fatura Numarası",
            FaturaTipi: "Fatura Tipi",
            FaturaTutari: "Fatura Tutarı (₺)",
            OtomatikOdeme: "Otomatik Ödeme Talimatı",
            FaturayiOde: "Faturayı Öde",
            FaturaOdeme: "Fatura Ödeme",
            Basarili: "Başarılı",
            Basarisiz: "Başarısız",
            // KULLANICI LİSTESİ
            KullaniciListesi: "Kullanıcı Listesi",
            YeniKullanici: "Yeni Kullanıcı",
            KullaniciAra: "Kullanıcı Ara...",
            Ara: "Ara",
            TcKimlik: "TC Kimlik Numarası",
            IsimSoyisim: "İsim Soyisim",
            HesapNumarasi: "Hesap Numarası",
            Rol: "Rol",
            Islemler: "İşlemler",
            Bilinmiyor: "Bilinmiyor",
            Geri: "Geri",
            Ileri: "İleri",
            SilmeOnayi: "Bu kullanıcıyı silmek istediğinizden emin misiniz?",
            Sil: "Sil",
            Iptal: "İptal",      
            // BANKALAR
            BankaYonetimi: "Banka Yönetimi",
            YeniBanka: "Yeni Banka",
            BankaAdi: "Banka Adı",
            TransferUcreti: "Transfer Ücreti",
            Duzenle: "Düzenle",
            BankaAdiZorunlu: "Banka adı zorunludur.",
            TransferUcretiZorunlu: "Transfer ücreti zorunludur.",
            BankaBasariylaGuncellendi: "Banka başarıyla güncellendi.",
            BankaGuncellenirkenHata: "Banka güncellenirken bir hata oluştu.",
            BankaBasariylaEklendi: "Banka başarıyla eklendi.",
            BankaEklenirkenHata: "Banka eklenirken bir hata oluştu.",
            BankaBasariylaSilindi: "Banka başarıyla silindi.",  
            // Kullanıcı hareketleri
            GirisKayitlariTablosu: "Giriş Kayıtları Tablosu",
            GirisKayitlariGrafigi: "Giriş Kayıtları Grafiği",
            İsimSoyisim: "İsim Soyisim",   
            // EFT
            AliciHesapNo: "Alıcı Hesap No",
            Gonder: "Gönder",
            LutfenHesapNumarasiniDogruGirin: "Lütfen hesap numarasını doğru girdiğinizden emin olun.",
            YetersizBakiye: "Yetersiz bakiye",
            KendiHesapNumarasinaHavale: "Kendi hesap numaranıza havale yapamazsınız.",
            ParaGondermeBasari: "Para gönderme işlemi başarıyla gerçekleştirildi",
            HesapTuru: "Hesap Türü",
            GuncelBakiye: "Güncel Bakiye",
            VadesizTL: "Vadesiz TL",
            ParaninCekilecegiHesap: "Paranın Çekileceği Hesap",
            AliciBilgileri: "Alıcı Bilgileri"
        }
    }
}

i18n
  .use(initReactI18next) //burada middleware olarak kullanmamız bizim context oluşturmamızla aynı işlevi yapıyor. i18n contextimiz var gibi davranacak. React dışından konfigüre edilip react içine enjekte edilme sebebi bazı alert gibi fonks. ihtiyaç duyabiliyor. React dışı tüketebilmek için.
  .init({
    resources,
    lng: "tr", 
   
});