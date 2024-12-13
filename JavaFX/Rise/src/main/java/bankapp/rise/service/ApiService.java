package bankapp.rise.service;


import bankapp.rise.core.RestApis;
import bankapp.rise.core.SessionManager;
import bankapp.rise.model.LoginRequest;
import okhttp3.*;
import org.jetbrains.annotations.NotNull;

public class ApiService {
    private static final OkHttpClient client = new OkHttpClient();

    public void login(LoginRequest request, Callback callback){
        RequestBody formBody = new FormBody.Builder()
                .add("identityNo", request.getIdentityNo())
                .add("password", request.getPassword())
                .build();

        Request httpRequest = new Request.Builder()
                .url(RestApis.LOGIN)
                .post(formBody)
                .build();
        client.newCall(httpRequest).enqueue(callback);
    }

    public void verify(String otp, Callback callback){
        RequestBody formBody = new FormBody.Builder()
                .add("otp", otp)
                .add("id", String.valueOf(SessionManager.getInstance().getUser().getId()))
                .build();

        Request httpRequest = new Request.Builder()
                .url(RestApis.VERIFY)
                .post(formBody)
                .build();
        client.newCall(httpRequest).enqueue(callback);
    }

    public void logout(Callback callback){
        Request httpRequest = new Request.Builder()
                .url(RestApis.LOGOUT)
                .post(RequestBody.create("", null))
                .addHeader("Authorization", "Bearer " + SessionManager.getInstance().getToken())
                .build();

        SessionManager.getInstance().setUser(null);
        SessionManager.getInstance().setToken(null);
        client.newCall(httpRequest).enqueue(callback);
    }
}
