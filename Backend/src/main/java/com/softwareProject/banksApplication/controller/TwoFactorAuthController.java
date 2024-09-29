package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.concretes.TwoFactorAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
public class TwoFactorAuthController {

    @Autowired
    private TwoFactorAuthService twoFactorAuthService;

    private Map<String, String> otpStorage = new HashMap<>();  // Simple in-memory storage for OTPs

    @PostMapping("/generate-otp")
    public String generateOtp(Authentication authentication) {
        String username = authentication.getName();
        String otp = twoFactorAuthService.generateOTP();

        // Assuming the user has an email attribute
        String email = ((UserInfo) authentication.getPrincipal()).getMail();
        twoFactorAuthService.sendOTP(email, otp);

        otpStorage.put(username, otp);  // Save OTP for the user

        return "redirect:/verify-otp";  // Redirect to OTP verification page
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String otp, Authentication authentication) {
        String username = authentication.getName();
        String storedOtp = otpStorage.get(username);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(username);  // OTP is valid, remove it from storage
            return "redirect:/dashboard";  // Redirect to user's dashboard
        } else {
            return "redirect:/verify-otp?error";  // Redirect back to OTP page with error
        }
    }
}
