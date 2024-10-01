package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogRepo extends JpaRepository<LogInfo, Long> {
    LogInfo findFirstByUserInfoOrderByLoginTimeDesc(UserInfo userInfo);
}
