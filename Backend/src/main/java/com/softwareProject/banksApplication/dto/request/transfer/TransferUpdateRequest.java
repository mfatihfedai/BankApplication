package com.softwareProject.banksApplication.dto.request.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferUpdateRequest {
    private Long id;
    private Long receiverAccountNo;
    private double transferAmount;
    private String message;
    private String bankName;
    private float transferFee;
}
