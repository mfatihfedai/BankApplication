package com.softwareProject.banksApplication.core.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class OtpAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Kullanıcının oturumuna bakarak OTP doğrulanmış mı kontrol et
        HttpSession session = request.getSession(false);
        boolean isOtpVerified = session != null && Boolean.TRUE.equals(session.getAttribute("otpVerified"));
        String requestURI = request.getRequestURI();

        // Kullanıcı giriş yapmış ama OTP doğrulaması yapılmamışsa
        if (isAuthenticated() && !isOtpVerified
                && !requestURI.startsWith("/auth/verify")
                && !requestURI.startsWith("/auth/generate-otp")) {
            // OTP doğrulama sayfasına yönlendir
            response.sendRedirect("/auth/verify");
            return;
        }

        // Eğer OTP doğrulanmışsa ya da doğrulama sayfasında istek varsa, devam et
        filterChain.doFilter(request, response);
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated();
    }
}

