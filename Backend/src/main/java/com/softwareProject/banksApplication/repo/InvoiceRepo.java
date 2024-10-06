package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepo extends JpaRepository<InvoiceInfo, Long> {
    @Query("SELECT i FROM InvoiceInfo i " +
            "WHERE i.payDate = (SELECT MAX(ii.payDate) FROM InvoiceInfo ii WHERE ii.invoiceNo = i.invoiceNo) " +
            "AND i.autobill = true")
    List<InvoiceInfo> findLatestAutobillInvoices();

    @Query("SELECT i FROM InvoiceInfo i " +
            "WHERE i.payDate = (SELECT MAX(ii.payDate) FROM InvoiceInfo ii WHERE ii.invoiceNo = i.invoiceNo AND ii.receiptInfo.userInfo.id = :userId) " +
            "AND i.autobill = true " +
            "AND i.receiptInfo.userInfo.id = :userId")
    List<InvoiceInfo> findLatestAutobillInvoicesForUser(@Param("userId") Long userId);
}
