package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.log.LogSaveRequest;
import com.softwareProject.banksApplication.dto.request.log.LogUpdateRequest;
import com.softwareProject.banksApplication.dto.response.log.LogResponse;
import com.softwareProject.banksApplication.entity.LogInfo;

public interface LogService extends IBaseService<LogInfo, LogSaveRequest, LogUpdateRequest, LogResponse>{
    CursorResponse<LogResponse> cursorResponse(int page, int pageSize, Long id);
}
