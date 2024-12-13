package bankapp.rise.core;

public class RestApis {
    public static final String BASE_URL = "http://localhost:8080";
    public static final String DEVELOPER = "/dev";
    public static final String VERSIONS = "/v1";
    // Auth
    public static final String AUTH = BASE_URL+"/auth";
    public static final String LOGIN = AUTH+"/login";
    public static final String VERIFY = AUTH+"/verify-otp";
    public static final String LOGOUT = AUTH+"/logout";

    public static final String BANKSSERVICE = BASE_URL+DEVELOPER+VERSIONS+"/banks";
    public static final String INVOICESERVICE = BASE_URL+DEVELOPER+VERSIONS+"/invoices";
    public static final String RECEIPTSERVICE = BASE_URL+DEVELOPER+VERSIONS+"/receipt";
    public static final String TRANSFERSERVICE = BASE_URL+DEVELOPER+VERSIONS+"/transfer";
    public static final String USERSERVICE = BASE_URL+DEVELOPER+VERSIONS+"/user";

}
