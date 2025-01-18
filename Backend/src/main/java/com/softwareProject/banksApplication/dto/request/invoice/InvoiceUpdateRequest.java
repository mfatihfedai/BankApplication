package com.softwareProject.banksApplication.dto.request.invoice;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceUpdateRequest {
    private Long id;
    private Long invoiceNo;
    private InvoiceInfo.InvoiceType invoiceType;
    private int invoiceAmount;
    private boolean autobill;
}
