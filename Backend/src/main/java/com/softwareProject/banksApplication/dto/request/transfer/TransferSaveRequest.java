package com.softwareProject.banksApplication.dto.request.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferSaveRequest {
    private int receiverAccountNo;
    private LocalDateTime transferTime;
    private int transferAmount;
    private String message;
    private String bankName;
    private int transferFee;
}
