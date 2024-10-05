package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.core.Logging.LogManager;
import com.softwareProject.banksApplication.core.auth.CustomUserDetails;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.core.auth.MailMessageService;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class TwoFactorAuthController {

    private final MailMessageService mailMessageService;
    private final LogManager logManager;

    private final Map<String, String> otpStorage = new HashMap<>();  // Simple in-memory storage for OTPs
    private final UserService userService;

    @GetMapping("/generate-otp/{id}")
    public String generateOtp(@PathVariable Long id) {
        UserInfo userr = userService.getById(id);
        String email = userr.getEmail();
        String username = userr.getName();
        String surname = userr.getSurname();

        //twoFactorAuthService ile yeni bir OTP üretilir ve mail olarak gönderilir.
        String otp = mailMessageService.generateOTP();
        mailMessageService.sendOTP(username, surname, email, otp);
        //Localdeki HashMap e username ve otp bilgileri kaydedilir
        otpStorage.put(username, otp);  // Save OTP for the user
        System.out.println(username + " " + email + " " + otp);

        return "redirect:/auth/verify";  // Redirect to OTP verification page
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String otp, HttpServletRequest request, Authentication authentication) {
        String username = authentication.getName();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        UserInfo userInfo = customUserDetails.getUserInfo();
        String role = customUserDetails.getRole();
        String storedOtp = otpStorage.get(username);

        if (storedOtp != null && storedOtp.equals(otp)) {

            otpStorage.remove(username);  // OTP is valid, remove it from storage
            logManager.logUserLogin(userInfo);

            if (Objects.equals(role, "ADMIN")){
                HttpSession session = request.getSession();
                session.setAttribute("otpVerified", true);
                return "redirect:/swagger-ui/index.html";
            } else {
                HttpSession session = request.getSession();
                session.setAttribute("otpVerified", true);
                return "redirect:/auth/dashboard";  // Redirect to user's dashboard
            }
        } else {
            return "redirect:/verify-otp?error";  // Redirect back to OTP page with error
        }
    }
    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";  // Return the HTML page for OTP input
    }

    @GetMapping("/verify")
    public String showOtpPage() {
        return "verify";  // Return the HTML page for OTP input
    }
}
