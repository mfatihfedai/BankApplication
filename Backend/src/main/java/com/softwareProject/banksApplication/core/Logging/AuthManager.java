package com.softwareProject.banksApplication.core.Logging;

import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.concretes.LogManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthManager {
    private final LogManager logService;

    public void onSuccessfulLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserInfo user = (UserInfo) authentication.getPrincipal();
        logService.logUserLogin(user);
    }

    public void onSuccessfulLogout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserInfo user = (UserInfo) authentication.getPrincipal();
        logService.logUserLogout(user);
    }
}
