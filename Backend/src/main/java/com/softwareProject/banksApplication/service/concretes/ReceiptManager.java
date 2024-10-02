package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.mapper.ReceiptMapper;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptSaveRequest;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptUpdateRequest;
import com.softwareProject.banksApplication.dto.response.receipt.ReceiptResponse;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import com.softwareProject.banksApplication.repo.ReceiptRepo;
import com.softwareProject.banksApplication.service.abstracts.ReceiptService;
import org.springframework.stereotype.Service;

@Service
public class ReceiptManager extends BaseManager<ReceiptInfo, ReceiptRepo, ReceiptSaveRequest, ReceiptUpdateRequest, ReceiptResponse, ReceiptMapper> implements ReceiptService {
    public ReceiptManager(ReceiptRepo repository, ReceiptMapper mapper) {
        super(repository, mapper);
    }
}
