package com.softwareProject.banksApplication.dto.response.banks;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BanksResponse {
    private int id;
    private String bankName;
    private int transferFee;
}
