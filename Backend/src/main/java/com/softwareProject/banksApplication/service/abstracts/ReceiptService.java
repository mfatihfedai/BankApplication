package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptSaveRequest;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptUpdateRequest;
import com.softwareProject.banksApplication.dto.response.receipt.ReceiptResponse;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import com.softwareProject.banksApplication.entity.UserInfo;

public interface ReceiptService extends IBaseService<ReceiptInfo, ReceiptSaveRequest, ReceiptUpdateRequest, ReceiptResponse>{
    CursorResponse<ReceiptResponse> cursorResponse(int page, int pageSize, Long id);
}
