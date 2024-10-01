package com.softwareProject.banksApplication.repo;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepo extends JpaRepository<InvoiceInfo, Long> {
}
