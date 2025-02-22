package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.TransferInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransferMapper extends BaseMapper<TransferInfo, TransferSaveRequest, TransferUpdateRequest, TransferResponse>{
}
