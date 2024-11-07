package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
import com.softwareProject.banksApplication.dto.request.banks.BanksUpdateRequest;
import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
import com.softwareProject.banksApplication.entity.BanksInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BanksMapper extends  BaseMapper<BanksInfo, BanksSaveRequest, BanksUpdateRequest, BanksResponse>{
}
