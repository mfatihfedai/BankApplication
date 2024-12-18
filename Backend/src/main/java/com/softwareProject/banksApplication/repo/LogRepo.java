package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogRepo extends JpaRepository<LogInfo, Long> {
    LogInfo findFirstByUserInfoOrderByLoginTimeDesc(UserInfo userInfo);

    @Query(value = """
        SELECT * FROM logs l
        WHERE l.log_user_id = :userId
        ORDER BY l.login_time DESC
        LIMIT 1 OFFSET 1
        """, nativeQuery = true)
    Optional<LogInfo> findLastLoginTime(@Param("userId") Long userId);
}
