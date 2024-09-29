//package com.softwareProject.banksApplication.service.concretes;
//
//import com.softwareProject.banksApplication.core.mapper.TransferMapper;
//import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
//import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
//import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
//import com.softwareProject.banksApplication.entity.TransferInfo;
//import com.softwareProject.banksApplication.repo.TransferRepo;
//import org.springframework.stereotype.Service;
//
//@Service
//public class TransferManager extends BaseManager<TransferInfo, TransferRepo, TransferSaveRequest, TransferUpdateRequest, TransferResponse, TransferMapper>{
//    public TransferManager(TransferRepo repository, TransferMapper mapper) {
//        super(repository, mapper);
//    }
//
//    @Override
//    protected Long extractId(TransferUpdateRequest updateDto) {
//        return updateDto.getId();
//    }
//}
