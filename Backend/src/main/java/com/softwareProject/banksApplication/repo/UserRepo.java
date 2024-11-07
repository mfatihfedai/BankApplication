package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserInfo, Long> {
    UserInfo findByName(String username);
    UserInfo findByEmail(String email);
    Optional<UserInfo> findByEmailOrIdentityNumber(String email, Long identityNumber);
    Optional<UserInfo> findByAccountNumber(Long accountNumber);
    Optional<UserInfo> findByIdentityNumber(Long identityNumber);
    @Query("SELECT u FROM UserInfo u WHERE " +
            "LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.surname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "CAST(u.identityNumber AS string) LIKE CONCAT('%', :keyword, '%') OR " +
            "CAST(u.accountNumber AS string) LIKE CONCAT('%', :keyword, '%')")
    List<UserInfo> searchByKeyword(@Param("keyword") String keyword);
//    List<UserInfo> findByNameContainingIgnoreCaseOrSurnameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrIdentityNumberToStringContainingOrAccountNumberToStringContaining(String name, String surname, String email, String identityNumber, String accountNumber);
}
