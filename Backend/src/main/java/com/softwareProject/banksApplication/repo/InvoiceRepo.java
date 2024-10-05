package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepo extends JpaRepository<InvoiceInfo, Long> {
    List<InvoiceInfo> findByAutobillTrue();
    List<InvoiceInfo> findByAutobillTrueAndReceiptInfo_UserInfo_Id(Long userId);
}
