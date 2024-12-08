module bankapp.rise {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.web;

    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;
    requires net.synedra.validatorfx;
    requires org.kordamp.ikonli.javafx;
    requires org.kordamp.bootstrapfx.core;
    requires eu.hansolo.tilesfx;
    requires okhttp3;
    requires static lombok;
    requires com.fasterxml.jackson.annotation;
    requires com.fasterxml.jackson.databind;
    exports bankapp.rise.entity to com.fasterxml.jackson.databind;

    opens bankapp.rise to javafx.fxml;
    exports bankapp.rise;
    exports bankapp.rise.controller;
    opens bankapp.rise.controller to javafx.fxml;
}