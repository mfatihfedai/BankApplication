package bankapp.rise.controller;

import bankapp.rise.core.Layout;
import bankapp.rise.core.SessionManager;
import bankapp.rise.entity.LoginResponse;
import bankapp.rise.entity.User;
import bankapp.rise.service.ApiService;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import okhttp3.Call;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.Objects;
import java.util.Timer;
import java.util.TimerTask;

public class VerifyController {
    @FXML
    private TextField txt_otp;
    @FXML
    private Button btn_login;
    @FXML
    private ProgressBar progress;
    @FXML
    private Text remain_time;
    @FXML
    private Text txt_invalid;

    private Timer timer;
    private int remainingSeconds = 60;
    private int seconds = 0;

    private final ApiService apiService = new ApiService();

    @FXML
    public void initialize() {
        startCountdown();
    }

    @FXML
    private void onLoginClick() {
        String otp = txt_otp.getText();

        apiService.verify(otp, new okhttp3.Callback() {
            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) {
                if(response.isSuccessful()) {
                    if (SessionManager.getInstance().getUser().getRole().equals("ADMIN")) {
                        Layout.redirectTo("adminPage", txt_invalid);
                    }
                    else {
                        Layout.redirectTo("userPage", txt_invalid);
                    }
                }
            }
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                txt_invalid.setVisible(true);
            }
        });
    }

    private void startCountdown() {
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                Platform.runLater(() -> {
                    if (remainingSeconds <= 0) {
                        cancelCountdown();
                        SessionManager.getInstance().setToken(null);
                        SessionManager.getInstance().setUser(null);
                        Layout.redirectTo("loginView", txt_invalid);
                    } else {
                        remainingSeconds--;
                        seconds++;
                        progress.setProgress(1.0 - (seconds / 60.0));
                        remain_time.setText(String.valueOf(remainingSeconds));
                    }
                });
            }
        }, 0, 1000);
    }
    private void cancelCountdown() {
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
    }
}
