package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.exception.NotFoundException;
import com.softwareProject.banksApplication.core.mapper.LogMapper;
import com.softwareProject.banksApplication.core.utilies.ResultHelper;
import com.softwareProject.banksApplication.dto.request.log.LogSaveRequest;
import com.softwareProject.banksApplication.dto.request.log.LogUpdateRequest;
import com.softwareProject.banksApplication.dto.response.log.LogResponse;
import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.LogRepo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LogManager  {
    private final LogRepo logInfoRepository;
    private static final Logger logger = LoggerFactory.getLogger(LogManager.class);

    public void logUserLogin(UserInfo user) {
        LogInfo logInfo = new LogInfo();
        logInfo.setUserInfo(user);
        logInfo.setLoginTime(LocalDateTime.now());

        logInfoRepository.save(logInfo);
        logger.info("User {} logged in at {}", user.getName(), logInfo.getLoginTime());
    }

    public void logUserLogout(UserInfo user) {
        LogInfo logInfo = logInfoRepository.findFirstByUserInfoOrderByLoginTimeDesc(user);
        if(logInfo != null) {
            logInfo.setLogoutTime(LocalDateTime.now());
            logInfoRepository.save(logInfo);
            logger.info("User {} logged out at {}", user.getName(), logInfo.getLogoutTime());

        } else {
            ResultHelper.NotFoundError("No login record found for user");
        }
    }
}
