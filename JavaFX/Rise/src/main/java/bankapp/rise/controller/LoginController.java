package bankapp.rise.controller;

import bankapp.rise.core.Layout;
import bankapp.rise.core.SessionManager;
import bankapp.rise.entity.LoginResponse;
import bankapp.rise.entity.Token;
import bankapp.rise.entity.User;
import bankapp.rise.model.LoginRequest;
import bankapp.rise.service.ApiService;
import com.fasterxml.jackson.databind.ObjectMapper;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

import javafx.scene.text.Text;
import javafx.stage.Stage;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.Objects;


public class LoginController {
    @FXML
    private TextField text_userLogin;
    @FXML
    private PasswordField text_pass;
    @FXML
    private Text txt_invalid;
    @FXML
    private Text rise_bank;

    private final ApiService apiService = new ApiService();
    private static User loggedUser;

    @FXML
    public void loginButtonClick() {
        String identityNo = text_userLogin.getText();
        String password = text_pass.getText();

        if (identityNo.isEmpty() || password.isEmpty()) {
            showAlert("Please fill in all fields!", Alert.AlertType.WARNING);
            return;
        }

        LoginRequest request = new LoginRequest(identityNo, password);

        // API servisine login isteği gönderiliyor
        apiService.login(request, new okhttp3.Callback() {
            @Override
            public void onFailure(@NotNull okhttp3.Call call, @NotNull IOException e) {
                Platform.runLater(() ->
                        showAlert("Login request failed: " + e.getMessage(), Alert.AlertType.ERROR)
                );
                text_userLogin.setVisible(true);
            }

            @Override
            public void onResponse(@NotNull okhttp3.Call call, @NotNull Response response) throws IOException {
                if (response.isSuccessful()) {
                    String responseBody = response.body().string();
                    ObjectMapper mapper = new ObjectMapper();
                    LoginResponse loginResponse = mapper.readValue(responseBody, LoginResponse.class);
                    Token.saveToken(loginResponse.getToken());
                    SessionManager.getInstance().setUser(loginResponse.getUser());
                    SessionManager.getInstance().setToken(loginResponse.getToken());
                    Layout.redirectTo("verify", rise_bank);
                } else {
                    Platform.runLater(() ->
                            showAlert("Invalid login credentials!", Alert.AlertType.ERROR)
                    );
                    txt_invalid.setVisible(true);
                }
            }
        });
    }

    private void showAlert(String message, Alert.AlertType alertType) {
        Alert alert = new Alert(alertType);
        alert.setContentText(message);
        alert.showAndWait();
    }
}
