package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserInfo, Long> {
    UserInfo findByName(String username);
    Optional<UserInfo> findByEmailOrIdentityNumber(String email, Long identityNumber);
    Optional<UserInfo> findByAccountNumber(Long accountNumber);
}
