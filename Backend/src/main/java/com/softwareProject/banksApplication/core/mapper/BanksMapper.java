package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
import com.softwareProject.banksApplication.entity.BanksInfo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface BanksMapper {
    BanksInfo asEntity(BanksSaveRequest banksSaveRequest);
    BanksResponse asOutput(BanksInfo banksInfo);
    List<BanksResponse> asOutput(List<BanksInfo> banksInfoList);
    void update(@MappingTarget BanksInfo banksInfo, BanksSaveRequest banksSaveRequest);
}
