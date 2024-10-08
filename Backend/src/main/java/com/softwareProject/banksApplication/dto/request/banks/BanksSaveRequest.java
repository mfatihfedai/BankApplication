package com.softwareProject.banksApplication.dto.request.banks;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BanksSaveRequest {
    private String bankName;
    private BigDecimal transferFee;
}
