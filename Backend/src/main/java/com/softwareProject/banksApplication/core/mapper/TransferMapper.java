package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.TransferInfo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TransferMapper{
    TransferMapper INSTANCE = Mappers.getMapper(TransferMapper.class);
    TransferInfo saveRequestToEntity(TransferSaveRequest request);
    TransferInfo updateRequestToEntity(TransferUpdateRequest request);
    TransferResponse entityToResponse(TransferInfo entity);
}
