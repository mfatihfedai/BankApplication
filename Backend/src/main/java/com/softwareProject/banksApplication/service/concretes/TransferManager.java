package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.mapper.TransferMapper;
import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.TransferInfo;
import com.softwareProject.banksApplication.repo.TransferRepo;
import com.softwareProject.banksApplication.service.abstracts.TransferService;
import org.springframework.stereotype.Service;

@Service
public class TransferManager extends BaseManager<TransferInfo, TransferRepo, TransferSaveRequest, TransferUpdateRequest, TransferResponse, TransferMapper> implements TransferService {
    public TransferManager(TransferRepo repository, TransferMapper mapper) {
        super(repository, mapper);
    }
}
