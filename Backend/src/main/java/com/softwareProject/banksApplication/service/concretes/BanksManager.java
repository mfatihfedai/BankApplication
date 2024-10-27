package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.mapper.BanksMapper;
import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
import com.softwareProject.banksApplication.dto.request.banks.BanksUpdateRequest;
import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
import com.softwareProject.banksApplication.entity.BanksInfo;
import com.softwareProject.banksApplication.repo.BanksRepo;
import com.softwareProject.banksApplication.service.abstracts.BanksService;
import org.springframework.stereotype.Service;

@Service
public class BanksManager extends BaseManager<BanksInfo, BanksRepo, BanksSaveRequest, BanksUpdateRequest, BanksResponse, BanksMapper> implements BanksService {

    public BanksManager(BanksRepo repository, BanksMapper mapper) {
        super(repository, mapper);
    }
}
