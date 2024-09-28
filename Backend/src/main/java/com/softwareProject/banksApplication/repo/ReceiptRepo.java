package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.ReceiptInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptRepo extends JpaRepository<ReceiptInfo, Long> {
}
