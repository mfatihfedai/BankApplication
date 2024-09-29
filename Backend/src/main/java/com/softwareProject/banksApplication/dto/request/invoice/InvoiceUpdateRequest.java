package com.softwareProject.banksApplication.dto.request.invoice;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceUpdateRequest {
    private Long id;
    private int invoiceNo;
    private InvoiceInfo.InvoiceType invoiceType;
    private int invoiceAmount;
    private LocalDate payDate;
    private boolean autobill;
}
