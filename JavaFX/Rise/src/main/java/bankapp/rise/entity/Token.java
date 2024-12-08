package bankapp.rise.entity;



public class Token {
    private static String token;

    public static void saveToken(String newToken) {
        token = newToken;
    }

    public static String getToken(){
        return token;
    }

    public static void removeToken() {
        token = null;
    }

}
