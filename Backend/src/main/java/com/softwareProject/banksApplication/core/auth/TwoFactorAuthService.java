package com.softwareProject.banksApplication.core.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class TwoFactorAuthService {

    private final JavaMailSender mailSender;

    public String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
    @Async
    public void sendOTP(String name, String surname, String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Bank Application Code");
        message.setText("Welcome " + name + " " + surname + ". Your Two Factor Authentication Password is: " + otp);
        mailSender.send(message);
    }
}
