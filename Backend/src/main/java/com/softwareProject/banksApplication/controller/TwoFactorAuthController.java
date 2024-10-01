package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.core.Logging.LogManager;
import com.softwareProject.banksApplication.core.auth.CustomUserDetails;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.core.auth.TwoFactorAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class TwoFactorAuthController {

    private final TwoFactorAuthService twoFactorAuthService;
    private final LogManager logManager;

    private final Map<String, String> otpStorage = new HashMap<>();  // Simple in-memory storage for OTPs

    @PostMapping("/generate-otp")
    public String generateOtp(Authentication authentication) {
        String username = authentication.getName();

        String otp = twoFactorAuthService.generateOTP();

        // Assuming the user has an email attribute
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = ((CustomUserDetails) userDetails).getMail();
        twoFactorAuthService.sendOTP(email, otp);

        otpStorage.put(username, otp);  // Save OTP for the user

        return "redirect:/verify";  // Redirect to OTP verification page
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String otp, Authentication authentication) {
        String username = authentication.getName();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        UserInfo userInfo = customUserDetails.getUserInfo();
        String role = customUserDetails.getRole();
        otpStorage.put(username, otp);
        String storedOtp = otpStorage.get(username);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(username);  // OTP is valid, remove it from storage
            logManager.logUserLogin(userInfo);
            if (Objects.equals(role, "ADMIN")){
                return "redirect:/swagger-ui/index.html";
            } else {
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
