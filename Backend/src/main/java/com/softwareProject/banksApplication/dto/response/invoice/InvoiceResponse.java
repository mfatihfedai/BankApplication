package com.softwareProject.banksApplication.dto.response.invoice;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponse {
    private int id;
    private int invoiceNo;
    private InvoiceInfo.InvoiceType invoiceType;
    private int invoiceAmount;
    private LocalDateTime payDate;
    private boolean autobill;
    private ReceiptInfo receiptInfo;
}
