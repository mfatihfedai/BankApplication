//package com.softwareProject.banksApplication.service.concretes;
//
//import com.softwareProject.banksApplication.core.mapper.BanksMapper;
//import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
//import com.softwareProject.banksApplication.dto.request.banks.BanksUpdateRequest;
//import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
//import com.softwareProject.banksApplication.entity.BanksInfo;
//import com.softwareProject.banksApplication.repo.BanksRepo;
//import org.springframework.stereotype.Service;
//
//@Service
//public class BanksManager extends BaseManager<BanksInfo, BanksRepo, BanksSaveRequest, BanksUpdateRequest, BanksResponse>{
//    public BanksManager(BanksRepo repository) {
//        super(repository);
//    }
//
//    @Override
//    protected BanksInfo saveRequestToEntity(BanksSaveRequest saveRequest) {
//        return null;
//    }
//
//    @Override
//    protected BanksInfo updateRequestToEntity(BanksUpdateRequest updateRequest, BanksInfo existingEntity) {
//        return null;
//    }
//
//    @Override
//    protected BanksResponse entityToResponse(BanksInfo entity) {
//        return null;
//    }
//
//    @Override
//    protected Long extractId(BanksUpdateRequest updateDto) {
//        return updateDto.getId();
//    }
//}
