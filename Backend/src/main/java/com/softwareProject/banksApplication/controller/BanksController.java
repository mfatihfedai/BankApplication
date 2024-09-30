package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
import com.softwareProject.banksApplication.dto.request.banks.BanksUpdateRequest;
import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
import com.softwareProject.banksApplication.entity.BanksInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/banks")
public class BanksController extends BaseController<BanksInfo, BanksSaveRequest, BanksUpdateRequest, BanksResponse> {
    public BanksController(IBaseService<BanksInfo, BanksSaveRequest, BanksUpdateRequest, BanksResponse> service) {
        super(service);
    }
}
