package com.softwareProject.banksApplication.dto.request.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferSaveRequest {
    private Long receiverAccountNo;
    private BigDecimal transferAmount;
    private String message;
    private String bankName;
    private BigDecimal transferFee;
    private boolean isReceiver;
}
