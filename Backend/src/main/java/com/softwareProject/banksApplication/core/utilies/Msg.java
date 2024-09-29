package com.softwareProject.banksApplication.core.utilies;

public class Msg {
    public static final String CREATED = "Kayıt eklendi.";
    public static final String VALIDATE_ERROR = "Veri Doğrulama Hatası.";
    public static final String OK = "İşlem Başarılı.";
    public static final String NOT_FOUND = "Veri Bulunamadı.";
    public static String getEntityForMsg(Class<?> entity){
        return entity.getSimpleName() + " Tablosunda Aynı Veri Bulunmaktadır.";
    }
}
