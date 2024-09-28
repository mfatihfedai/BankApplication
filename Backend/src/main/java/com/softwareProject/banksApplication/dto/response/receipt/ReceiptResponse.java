package com.softwareProject.banksApplication.dto.response.receipt;

import com.softwareProject.banksApplication.entity.InvoiceInfo;
import com.softwareProject.banksApplication.entity.TransferInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptResponse {
    private Long id;
    private UserInfo userInfo;
    private List<InvoiceInfo> invoiceInfoList;
    private List<TransferInfo> transferList;
}
