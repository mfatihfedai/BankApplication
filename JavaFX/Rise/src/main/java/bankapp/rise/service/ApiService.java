package bankapp.rise.service;


import bankapp.rise.core.Constants;
import bankapp.rise.model.LoginRequest;
import okhttp3.*;

public class ApiService {
    private static final OkHttpClient client = new OkHttpClient();

    public void login(LoginRequest request, Callback callback){
        RequestBody formBody = new FormBody.Builder()
                .add("identityNo", request.getIdentityNo())
                .add("password", request.getPassword())
                .build();

        Request httpRequest = new Request.Builder()
                .url(Constants.BASE_URL + "/login")
                .post(formBody)
                .build();

        client.newCall(httpRequest).enqueue(callback);
    }

}
