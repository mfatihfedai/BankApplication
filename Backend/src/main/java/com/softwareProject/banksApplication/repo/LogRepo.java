package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LogRepo extends JpaRepository<LogInfo, Long> {
    LogInfo findFirstByUserInfoOrderByLoginTimeDesc(UserInfo userInfo);

    @Query(value = """
        SELECT * FROM logs l
        WHERE l.log_user_id = :userId
        ORDER BY l.login_time DESC
        LIMIT 1
        """, nativeQuery = true)
    Optional<LogInfo> findLastLoginTime(@Param("userId") Long userId);

    @Query("SELECT l FROM LogInfo l WHERE l.userInfo.id = :userId")
    Page<LogInfo> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT l FROM LogInfo l WHERE l.userInfo IN :users")
    Page<LogInfo> findByUsers(@Param("users") List<UserInfo> users, Pageable pageable);

    @Query(value = """
    SELECT 
        CAST(l.loginTime AS localdate ) AS loginDate, 
        COUNT(l) AS totalLogins, 
        COUNT(DISTINCT l.userInfo) AS uniqueUsers 
    FROM LogInfo l 
    WHERE l.userInfo IN :users 
    GROUP BY CAST(l.loginTime AS date)
    """)
    Page<Object[]> findDailyLoginCountsByUsers(
            @Param("users") List<UserInfo> users,
            Pageable pageable
    );

    @Query(value = """
    SELECT 
        CAST(l.loginTime AS localdate ) AS loginDate, 
        COUNT(l) AS totalLogins, 
        COUNT(DISTINCT l.userInfo) AS uniqueUsers 
    FROM LogInfo l 
    WHERE l.userInfo IN :users 
    GROUP BY CAST(l.loginTime AS date)
    """)
    List<Object[]> findDailyLoginCountsByUsers(@Param("users") List<UserInfo> users);
}
