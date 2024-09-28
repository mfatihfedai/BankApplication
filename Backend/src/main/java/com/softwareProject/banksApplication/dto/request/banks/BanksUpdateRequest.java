package com.softwareProject.banksApplication.dto.request.banks;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BanksUpdateRequest {
    private Long id;
    private String bankName;
    private int transferFee;
}
