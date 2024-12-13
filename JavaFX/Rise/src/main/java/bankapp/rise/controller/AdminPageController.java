package bankapp.rise.controller;

import bankapp.rise.core.Layout;
import bankapp.rise.service.ApiService;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.text.Text;
import okhttp3.Call;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;

public class AdminPageController {
    @FXML
    private Button btn_logout;
    @FXML
    private Text txt_head;

    private final ApiService apiService = new ApiService();

    @FXML
    private void onLogoutClicked(){
        apiService.logout(new okhttp3.Callback() {

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) {
                Layout.redirectTo("loginPage", txt_head);
            }
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {

            }
        });
    }
}
