package com.softwareProject.banksApplication.dto.request.invoice;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceUpdateRequest {
    private Long id;
    private Long invoiceNo;
    private InvoiceInfo.InvoiceType invoiceType;
    private BigDecimal invoiceAmount;
    private boolean autobill;
}
