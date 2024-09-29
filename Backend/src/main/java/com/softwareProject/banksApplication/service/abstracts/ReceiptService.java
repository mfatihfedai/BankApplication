package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.request.receipt.ReceiptSaveRequest;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptUpdateRequest;
import com.softwareProject.banksApplication.dto.response.receipt.ReceiptResponse;
import com.softwareProject.banksApplication.entity.ReceiptInfo;

public interface ReceiptService extends IBaseService<ReceiptInfo, ReceiptSaveRequest, ReceiptUpdateRequest, ReceiptResponse>{
}
