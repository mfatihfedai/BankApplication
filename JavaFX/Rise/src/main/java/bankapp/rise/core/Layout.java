package bankapp.rise.core;

import bankapp.rise.controller.LoginController;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.Objects;

public class Layout {
    public static void redirectTo(String page, Text text){
        Platform.runLater(() -> {
            try {
                // Mevcut pencereyi kapat
                Stage currentStage = (Stage) text.getScene().getWindow();
                currentStage.close();

                // Yeni pencereyi aç
                Parent root = FXMLLoader.load(Objects.requireNonNull(LoginController.class.getResource("/bankapp/rise/" + page + ".fxml")));
                Scene scene = new Scene(root);
                Stage stage = new Stage();
                stage.setScene(scene);
                stage.setTitle("Rise Bank Application");
                stage.show();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}
