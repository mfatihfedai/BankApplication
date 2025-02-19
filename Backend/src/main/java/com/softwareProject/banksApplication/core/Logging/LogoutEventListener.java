package com.softwareProject.banksApplication.core.Logging;

import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.LogRepo;
import com.softwareProject.banksApplication.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.security.core.session.SessionDestroyedEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class LogoutEventListener {
    private final UserRepo userRepo;
    private final LogRepo logRepo;
    private static final Logger log = LoggerFactory.getLogger(LogoutEventListener.class);

    // Dinamik logout işlemleri için
    @EventListener
    public void handleLogoutSuccess(LogoutSuccessEvent event) {
        recordLogoutTime(event.getAuthentication().getName());
    }

    // Oturum süresi dolduğunda çalışır
    @EventListener
    public void handleSessionDestroyed(SessionDestroyedEvent event) {
        event.getSecurityContexts().forEach(securityContext -> {
            if (securityContext.getAuthentication() != null) {
                String username = securityContext.getAuthentication().getName();
                recordLogoutTime(username);
            }
        });
    }

    // Ortak logout zaman kaydetme işlemi
    private void recordLogoutTime(String username) {
        UserInfo user = userRepo.findByName(username);
        if (user != null) {
            LogInfo logInfo = logRepo.findFirstByUserInfoOrderByLoginTimeDesc(user);
            if (logInfo != null && logInfo.getLogoutTime() == null) {
                logInfo.setLogoutTime(LocalDateTime.now());
                logRepo.save(logInfo);
                log.info("User {} logged out at {}", username, LocalDateTime.now());
            }
        }
    }
}
