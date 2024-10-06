package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.TransferInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import com.softwareProject.banksApplication.service.abstracts.TransferService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/transfer")
public class TransferController extends BaseController<TransferInfo, TransferSaveRequest, TransferUpdateRequest, TransferResponse> {
    private final TransferService transferService;
    public TransferController(IBaseService<TransferInfo, TransferSaveRequest, TransferUpdateRequest, TransferResponse> service, TransferService transferService) {
        super(service);
        this.transferService = transferService;
    }

    //@PreAuthorize("#user.id == authentication.principal.id or hasRole('ADMIN')")
    @PostMapping("/create")
    public TransferResponse create(@RequestBody TransferSaveRequest saveRequest,
                                   //@AuthenticationPrincipal
                                   UserInfo user) {
        return this.transferService.create(saveRequest, user.getId());
    }
}
