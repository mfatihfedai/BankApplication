package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.ReceiptInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptRepo extends JpaRepository<ReceiptInfo, Long> {

    @Query("SELECT r FROM ReceiptInfo r WHERE r.userInfo.id = :userId")
    Page<ReceiptInfo> findByUserId(@Param("userId") Long userId, Pageable pageable);
}
