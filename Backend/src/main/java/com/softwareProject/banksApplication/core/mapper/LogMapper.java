package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.log.LogSaveRequest;
import com.softwareProject.banksApplication.dto.request.log.LogUpdateRequest;
import com.softwareProject.banksApplication.dto.response.log.LogResponse;
import com.softwareProject.banksApplication.entity.LogInfo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LogMapper extends BaseMapper<LogInfo, LogSaveRequest, LogUpdateRequest, LogResponse>{
}
