package com.softwareProject.banksApplication.dto.request.banks;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BanksSaveRequest {
    private String bankName;
    private int transferFee;
}
