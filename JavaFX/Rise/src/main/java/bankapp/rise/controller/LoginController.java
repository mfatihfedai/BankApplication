package bankapp.rise.controller;

import bankapp.rise.entity.LoginResponse;
import bankapp.rise.entity.Token;
import bankapp.rise.entity.User;
import bankapp.rise.model.LoginRequest;
import bankapp.rise.service.ApiService;
import com.fasterxml.jackson.databind.ObjectMapper;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

import okhttp3.Response;

import java.io.IOException;


public class LoginController {
    @FXML
    private TextField text_userLogin;
    @FXML
    private PasswordField text_pass;

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
            public void onFailure(okhttp3.Call call, IOException e) {
                Platform.runLater(() ->
                        showAlert("Login request failed: " + e.getMessage(), Alert.AlertType.ERROR)
                );
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String responseBody = response.body().string();
                    ObjectMapper mapper = new ObjectMapper();
                    LoginResponse loginResponse = mapper.readValue(responseBody, LoginResponse.class);
                    Token.saveToken(loginResponse.getToken());

                    loggedUser = loginResponse.getUser();
                    System.out.println("Login successful! Token: " + Token.getToken());
                    System.out.println("User Info: " + loggedUser.getName() + " " + loggedUser.getSurname());
                    Platform.runLater(() ->
                            showAlert("Login Successful!\nResponse: " + responseBody, Alert.AlertType.INFORMATION)
                    );
                } else {
                    Platform.runLater(() ->
                            showAlert("Invalid login credentials!", Alert.AlertType.ERROR)
                    );
                    //txt_invalid.setVisible(true);

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
