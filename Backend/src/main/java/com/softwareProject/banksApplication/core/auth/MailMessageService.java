package com.softwareProject.banksApplication.core.auth;

import com.softwareProject.banksApplication.entity.UserInfo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailMessageService {

    @Autowired
    private final JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
    @Async
    public void sendOTP(String name, String surname, String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Thymeleaf context
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("surname", surname);
        context.setVariable("otp", otp);

        // HTML body
        String htmlContent = templateEngine.process("./otp-email.html", context);

        helper.setTo(email);
        helper.setSubject("Bank Application Security Code");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }

    @Async
    public void sendInvoiceNotification(UserInfo user, int invoiceAmount, boolean success) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        Context context = new Context();
        context.setVariable("name", user.getName());
        context.setVariable("surname", user.getSurname());
        context.setVariable("amount", invoiceAmount);
        context.setVariable("balance", user.getBalance());
        context.setVariable("success", success);

        String htmlContent = templateEngine.process("./invoice-notification.html", context);

        helper.setTo(user.getEmail());
        helper.setSubject("Invoice Payment Notification");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }

    @Async
    public void sendForgetPasswordToEmail(UserInfo user, String password) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        Context context = new Context();
        context.setVariable("name", user.getName());
        context.setVariable("surname", user.getSurname());
        context.setVariable("tempPassword", password);

        String htmlContent = templateEngine.process("./forget-password.html", context);

        helper.setTo(user.getEmail());
        helper.setSubject("Temporary Password for Prisma Bank");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }
}
