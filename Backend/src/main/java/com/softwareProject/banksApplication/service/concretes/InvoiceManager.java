//package com.softwareProject.banksApplication.service.concretes;
//
//import com.softwareProject.banksApplication.core.mapper.InvoiceMapper;
//import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
//import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
//import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
//import com.softwareProject.banksApplication.entity.InvoiceInfo;
//import com.softwareProject.banksApplication.repo.InvoiceRepo;
//import org.springframework.stereotype.Service;
//
//@Service
//public class InvoiceManager extends BaseManager<InvoiceInfo, InvoiceRepo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse, InvoiceMapper>{
//    public InvoiceManager(InvoiceRepo repository, InvoiceMapper mapper) {
//        super(repository, mapper);
//    }
//
//    @Override
//    protected Long extractId(InvoiceUpdateRequest updateDto) {
//        return updateDto.getId();
//    }
//}
