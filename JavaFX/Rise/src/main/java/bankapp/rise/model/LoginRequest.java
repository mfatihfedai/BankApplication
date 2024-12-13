package bankapp.rise.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String identityNo;
    private String password;

    public LoginRequest(String identityNo, String password) {
        this.identityNo = identityNo;
        this.password = password;
    }
}
