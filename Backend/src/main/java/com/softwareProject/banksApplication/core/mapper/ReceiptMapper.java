package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.receipt.ReceiptSaveRequest;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptUpdateRequest;
import com.softwareProject.banksApplication.dto.response.receipt.ReceiptResponse;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReceiptMapper {
    ReceiptMapper INSTANCE = Mappers.getMapper(ReceiptMapper.class);
    ReceiptMapper receiptSaveRequestToReceipt(ReceiptSaveRequest receiptSaveRequest);
    ReceiptMapper receiptUpdateRequestToReceipt(ReceiptUpdateRequest receiptUpdateRequest);
    ReceiptResponse receiptToReceiptResponse(ReceiptInfo receipt);
}
