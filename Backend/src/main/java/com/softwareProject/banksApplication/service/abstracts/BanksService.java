package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
import com.softwareProject.banksApplication.dto.request.banks.BanksUpdateRequest;
import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
import com.softwareProject.banksApplication.entity.BanksInfo;

public interface BanksService extends IBaseService<BanksInfo, BanksSaveRequest, BanksUpdateRequest, BanksResponse>{
}
