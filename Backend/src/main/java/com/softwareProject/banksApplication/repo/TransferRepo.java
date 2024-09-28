package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.TransferInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepo extends JpaRepository<TransferInfo, Long> {
}
