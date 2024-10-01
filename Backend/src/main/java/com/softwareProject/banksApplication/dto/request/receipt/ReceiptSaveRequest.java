package com.softwareProject.banksApplication.dto.request.receipt;

import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptSaveRequest {
    private UserInfo userInfo;
}
