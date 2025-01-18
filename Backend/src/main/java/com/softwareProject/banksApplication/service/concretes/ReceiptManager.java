package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.mapper.ReceiptMapper;
import com.softwareProject.banksApplication.core.utilies.ResultHelper;
import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptSaveRequest;
import com.softwareProject.banksApplication.dto.request.receipt.ReceiptUpdateRequest;
import com.softwareProject.banksApplication.dto.response.receipt.ReceiptResponse;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.ReceiptRepo;
import com.softwareProject.banksApplication.service.abstracts.ReceiptService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReceiptManager extends BaseManager<ReceiptInfo, ReceiptRepo, ReceiptSaveRequest, ReceiptUpdateRequest, ReceiptResponse, ReceiptMapper> implements ReceiptService {
    public ReceiptManager(ReceiptRepo repository, ReceiptMapper mapper) {
        super(repository, mapper);
    }

    public CursorResponse<ReceiptResponse> cursorResponse(int page, int pageSize, Long id){
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<ReceiptInfo> receipts = repository.findByUserId(id, pageable);
        Page<ReceiptResponse> entityToResponse = receipts.map(mapper::entityToResponse);
        return ResultHelper.cursor(entityToResponse);
    }
}
