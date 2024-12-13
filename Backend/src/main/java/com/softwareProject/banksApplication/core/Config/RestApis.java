package com.softwareProject.banksApplication.core.Config;

public class RestApis {
    public static final String DEVELOPER = "/dev";
    public static final String TEST = "/test";
    public static final String RELEASE = "/prod";
    public static final String VERSIONS = "/v1";

    public static final String BANKSSERVICE = DEVELOPER+VERSIONS+"/banks";
    public static final String INVOICESERVICE = DEVELOPER+VERSIONS+"/invoices";
    public static final String RECEIPTSERVICE = DEVELOPER+VERSIONS+"/receipt";
    public static final String AUTHSERVICE = "/auth";
    public static final String TRANSFERSERVICE = DEVELOPER+VERSIONS+"/transfer";
    public static final String USERSERVICE = DEVELOPER+VERSIONS+"/user";

    public static final String REGISTER = "/register";
    public static final String LOGIN = "/login";
}
