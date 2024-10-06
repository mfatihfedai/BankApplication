//package com.softwareProject.banksApplication.core.Logging;
//
//import com.softwareProject.banksApplication.entity.LogInfo;
//import com.softwareProject.banksApplication.entity.UserInfo;
//import com.softwareProject.banksApplication.repo.LogRepo;
//import com.softwareProject.banksApplication.repo.UserRepo;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.context.ApplicationListener;
//import org.springframework.security.authentication.event.LogoutSuccessEvent;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//
//@Component
//@RequiredArgsConstructor
//public class LogoutEventListener implements ApplicationListener<LogoutSuccessEvent> {
//    private final UserRepo userRepo;
//    private final LogRepo logRepo;
//    private static final Logger log = LoggerFactory.getLogger(LogoutEventListener.class);
//
//    @Override
//    public void onApplicationEvent(LogoutSuccessEvent event) {
//        String username = event.getAuthentication().getName();
//        UserInfo user = userRepo.findByName(username);
//
//        if (user != null) {
//            LogInfo logInfo = logRepo.findFirstByUserInfoOrderByLoginTimeDesc(user);
//            if (logInfo != null && logInfo.getLogoutTime() == null) {
//                logInfo.setLogoutTime(LocalDateTime.now());
//                logRepo.save(logInfo);  // Update the logout info
//                log.info("User {} logged out at {}", username, LocalDateTime.now());
//            }
//        }
//    }
//}
