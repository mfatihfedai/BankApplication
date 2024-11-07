package com.softwareProject.banksApplication.dto.response.banks;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BanksResponse {
    private Long id;
    private String bankName;
    private BigDecimal transferFee;
}
