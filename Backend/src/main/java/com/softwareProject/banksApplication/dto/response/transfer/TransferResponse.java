package com.softwareProject.banksApplication.dto.response.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferResponse {
    private Long id;
    private Long receiverAccountNo;
    private LocalDateTime transferTime;
    private double transferAmount;
    private String message;
    private String bankName;
    private float transferFee;
}
