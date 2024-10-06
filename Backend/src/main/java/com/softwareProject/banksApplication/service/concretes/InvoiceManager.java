package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.exception.NotValidException;
import com.softwareProject.banksApplication.core.mapper.InvoiceMapper;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
import com.softwareProject.banksApplication.entity.InvoiceInfo;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.InvoiceRepo;
import com.softwareProject.banksApplication.service.abstracts.InvoiceService;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class InvoiceManager extends BaseManager<InvoiceInfo, InvoiceRepo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse, InvoiceMapper> implements InvoiceService {
    private final UserService userService;
    public InvoiceManager(InvoiceRepo repository, InvoiceMapper mapper, UserService userService) {
        super(repository, mapper);
        this.userService = userService;
    }

    @Override
    @Transactional
    public InvoiceResponse create(InvoiceSaveRequest saveRequest, Long userId) {
        UserInfo user = userService.getById(userId);
        ReceiptInfo receiptInfo = user.getReceiptInfo();
        InvoiceInfo invoiceInfo = mapper.saveRequestToEntity(saveRequest);
        invoiceInfo.setReceiptInfo(receiptInfo);
        if(checkBalance(invoiceInfo)) {
            throw new NotValidException("Not enough balance");
        }
        invoiceInfo.setPayDate(LocalDateTime.now());
        reduceBalance(invoiceInfo);
        this.repository.save(invoiceInfo);
        return mapper.entityToResponse(invoiceInfo);
    }

    private boolean checkBalance(InvoiceInfo invoiceInfo){
        return invoiceInfo.getInvoiceAmount() > invoiceInfo.getReceiptInfo().getUserInfo().getBalance();
    }

    private void reduceBalance(InvoiceInfo invoiceInfo){
        invoiceInfo.getReceiptInfo().getUserInfo().setBalance(
                invoiceInfo.getReceiptInfo().getUserInfo().getBalance() - invoiceInfo.getInvoiceAmount());
        this.userService.save(invoiceInfo.getReceiptInfo().getUserInfo());
    }

    @Override
    public List<InvoiceInfo> getByAutobillList(Long userId) {
        return repository.findLatestAutobillInvoicesForUser(userId);
    }
}
