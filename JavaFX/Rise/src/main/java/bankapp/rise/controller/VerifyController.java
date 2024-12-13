package bankapp.rise.controller;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import javafx.stage.Stage;

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

    private Timer timer;
    private int remainingSeconds = 60;

    @FXML
    public void initialize() {
        startCountdown();
    }

    @FXML
    private void onLoginClick() {
        String otp = txt_otp.getText();

        if (otp.isEmpty()) {
            showAlert("Please enter the OTP.", javafx.scene.control.Alert.AlertType.WARNING);
            return;
        }

        if (isOtpValid(otp)) {
            cancelCountdown();
            proceedToNextScreen();
        } else {
            showAlert("Invalid OTP! Try again.", javafx.scene.control.Alert.AlertType.ERROR);
        }
    }

    private void startCountdown() {
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                Platform.runLater(() -> {
                    if (remainingSeconds <= 0) {
                        cancelCountdown();
                        redirectToLogin();
                    } else {
                        remainingSeconds--;
                        progress.setProgress(1.0 - (remainingSeconds / 60.0));
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

    private void redirectToLogin() {
        cancelCountdown();
        Stage stage = (Stage) txt_otp.getScene().getWindow();
        stage.close(); // Close the current window
        // Load the login scene
        LoginController.showLoginScreen(); // Assuming a static method in LoginController
    }

    private boolean isOtpValid(String otp) {
        // Add your OTP validation logic here
        return "123456".equals(otp); // Example OTP
    }

    private void proceedToNextScreen() {
        cancelCountdown();
        showAlert("OTP Verified! Redirecting...", javafx.scene.control.Alert.AlertType.INFORMATION);
        // Add your logic to proceed to the next screen
    }

    private void showAlert(String message, javafx.scene.control.Alert.AlertType alertType) {
        javafx.scene.control.Alert alert = new javafx.scene.control.Alert(alertType);
        alert.setContentText(message);
        alert.showAndWait();
    }
}
