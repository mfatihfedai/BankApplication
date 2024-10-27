package com.softwareProject.banksApplication.core.utilies;

public class Msg {
    public static final String CREATED = "Created";
    public static final String VALIDATE_ERROR = "Validate Error";
    public static final String OK = "Successful";
    public static final String NOT_FOUND = "Data Not Found.";
    public static final String DATA_ALREADY_EXIST = "Data Already Exist.";
    public static String getEntityForMsg(Class<?> entity){
        return "Data Already Exist in " + entity.getSimpleName() + " Table";
    }
}
