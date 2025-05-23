package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.mapper.LogMapper;
import com.softwareProject.banksApplication.core.utilies.ResultHelper;
import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.log.LogSaveRequest;
import com.softwareProject.banksApplication.dto.request.log.LogUpdateRequest;
import com.softwareProject.banksApplication.dto.response.log.LogResponse;
import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.LogRepo;
import com.softwareProject.banksApplication.service.abstracts.LogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class LogManager extends BaseManager<LogInfo, LogRepo, LogSaveRequest, LogUpdateRequest, LogResponse, LogMapper> implements LogService {
    private final LogRepo logInfoRepository;
    private static final Logger logger = LoggerFactory.getLogger(LogManager.class);

    public LogManager(LogRepo repository, LogMapper mapper, LogRepo logInfoRepository) {
        super(repository, mapper);
        this.logInfoRepository = logInfoRepository;
    }

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

    public LocalDateTime getLastLogTime(Long userId) {
        Optional<LogInfo> findLastLoginTime = repository.findLastLoginTime(userId);
        return findLastLoginTime.map(LogInfo::getLoginTime).orElse(null);
    }

    @Override
    public CursorResponse<LogResponse> cursorResponse(int page, int pageSize, Long id) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("loginTime").descending());
        Page<LogInfo> logs = repository.findByUserId(id, pageable);
        Page<LogResponse> entityToResponse = logs.map(mapper::entityToResponse);
        return ResultHelper.cursor(entityToResponse);
    }
}
