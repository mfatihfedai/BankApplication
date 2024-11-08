package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.core.Logging.LogManager;
import com.softwareProject.banksApplication.core.auth.CustomUserDetails;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.core.auth.MailMessageService;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import static com.softwareProject.banksApplication.core.Config.RestApis.*;

@Controller
@RequestMapping(AUTHSERVICE)
@RequiredArgsConstructor
public class TwoFactorAuthController {

    private final MailMessageService mailMessageService;
    private final LogManager logManager;
    @Autowired
    private final AuthenticationManager authenticationManager;

    private final Map<String, String> otpStorage = new HashMap<>();  // Simple in-memory storage for OTPs
    private final UserService userService;

    @PostMapping(LOGIN)
    public String login(@RequestParam String identityNo, @RequestParam String password) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(identityNo, password);

        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // If authentication is successful, redirect to OTP generation page
        if (authentication.isAuthenticated()) {
            System.out.println("Authenticated");
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Long id = ((CustomUserDetails) userDetails).getId();
            return "redirect:/auth/generate-otp/" + id;
        } else {
            System.out.println("NOT Authenticated");
            return "Invalid credentials";
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            UserInfo user = ((CustomUserDetails) authentication.getPrincipal()).getUserInfo();
            logManager.logUserLogout(user);  // Log logout event
        }
        // Invalidate session and delete cookies
        request.getSession().invalidate();
        response.setHeader("Location", "/login?logout");
    }

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
    public String verifyOtp(@RequestBody String otp, HttpServletRequest request, Authentication authentication) {
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
