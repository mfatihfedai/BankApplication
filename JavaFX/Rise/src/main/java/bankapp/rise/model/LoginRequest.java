package bankapp.rise.model;


public class LoginRequest {
    private String identityNo;
    private String password;

    public LoginRequest(String identityNo, String password) {
        this.identityNo = identityNo;
        this.password = password;
    }

    public String getIdentityNo() {
        return identityNo;
    }

    public void setIdentityNo(String identityNo) {
        this.identityNo = identityNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
