package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.TransferInfo;

public interface TransferService extends IBaseService<TransferInfo, TransferSaveRequest, TransferUpdateRequest, TransferResponse>{
}
