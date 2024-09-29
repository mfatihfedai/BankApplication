package com.softwareProject.banksApplication.core.Logging;

import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.LogRepo;
import com.softwareProject.banksApplication.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AuthEventListener implements ApplicationListener<AuthenticationSuccessEvent> {
    private final UserRepo userRepo;
    private final LogRepo logRepo;
    private static final Logger log = LoggerFactory.getLogger(AuthEventListener.class);
    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        Authentication authentication = event.getAuthentication();
        String username = authentication.getName();
        UserInfo user = userRepo.findByName(username);

        if (user != null) {
            LogInfo logInfo = new LogInfo();
            logInfo.setUserInfo(user);
            logInfo.setLoginTime(LocalDateTime.now());
            logRepo.save(logInfo);  // Save the login info
            log.info("User {} logged in at {}", username, LocalDateTime.now());
        }
    }
}
