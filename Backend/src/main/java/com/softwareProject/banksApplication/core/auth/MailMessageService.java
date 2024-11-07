package com.softwareProject.banksApplication.core.auth;

import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailMessageService {

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
        message.setText("Welcome Dear " + name + " " + surname + ".\n" +
                "Your Two Factor Authentication Password is: " + otp);
        mailSender.send(message);
    }

    @Async
    public void sendInvoiceNotification(UserInfo user, int invoiceAmount, boolean success) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Invoice Payment Notification");

        if (success) {
            message.setText("Dear " + user.getName() + " " + user.getSurname() + ",\n\n" +
                    "Your invoice of " + invoiceAmount + " TL has been successfully paid.\n" +
                    "Your remaining balance is: " + user.getBalance() + " TL.");
        } else {
            message.setText("Dear " + user.getName() + " " + user.getSurname() + ",\n\n" +
                    "Your invoice of " + invoiceAmount + " TL could not be paid due to insufficient balance.\n" +
                    "Please check your balance.");
        }

        mailSender.send(message);
    }

    @Async
    public void sendForgetPasswordToEmail(UserInfo user, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Forget Password Confirmation");
        message.setText("Your temporary password is: " + password + "\n" +
                "Please change your temporary password as soon as possible.");

        mailSender.send(message);
    }
}
