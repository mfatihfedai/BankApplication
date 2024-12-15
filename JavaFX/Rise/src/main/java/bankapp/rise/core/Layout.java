package bankapp.rise.core;

import bankapp.rise.controller.LoginController;
import bankapp.rise.service.ApiService;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import okhttp3.Call;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.Objects;

public class Layout {
    public static void redirectTo(String page, Text text){
        ApiService apiService = new ApiService();
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

                stage.setOnCloseRequest(event -> {
                  apiService.logout(new okhttp3.Callback() {
                      @Override
                      public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                      }

                      @Override
                      public void onFailure(@NotNull Call call, @NotNull IOException e) {
                      }
                  });
                });
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}
