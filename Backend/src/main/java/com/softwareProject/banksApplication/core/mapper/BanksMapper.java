package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
import com.softwareProject.banksApplication.dto.request.banks.BanksUpdateRequest;
import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
import com.softwareProject.banksApplication.entity.BanksInfo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BanksMapper {
    BanksMapper INSTANCE = Mappers.getMapper(BanksMapper.class);
    BanksInfo saveRequestToEntity(BanksSaveRequest request);
    BanksInfo updateRequestToEntity(BanksUpdateRequest request);
    BanksResponse entityToResponse(BanksInfo banks);
}
