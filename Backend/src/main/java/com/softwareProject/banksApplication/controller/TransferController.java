package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.TransferInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/transfer")
public class TransferController extends BaseController<TransferInfo, TransferSaveRequest, TransferUpdateRequest, TransferResponse> {
    public TransferController(IBaseService<TransferInfo, TransferSaveRequest, TransferUpdateRequest, TransferResponse> service) {
        super(service);
    }
}
