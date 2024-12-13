package bankapp.rise.entity;

import lombok.Getter;

public class Token {
    @Getter
    private static String token;

    public static void saveToken(String newToken) {
        token = newToken;
    }

    public static void removeToken() {
        token = null;
    }

}
