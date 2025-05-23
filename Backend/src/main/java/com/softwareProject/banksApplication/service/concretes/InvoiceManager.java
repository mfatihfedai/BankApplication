package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.exception.NotFoundException;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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

    @Transactional
    public InvoiceResponse update(Long id, boolean autobill) {
        InvoiceInfo oldInvoice = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice not found"));
        oldInvoice.setAutobill(autobill);
        repository.save(oldInvoice);
        return mapper.entityToResponse(oldInvoice);
    }

    private boolean checkBalance(InvoiceInfo invoiceInfo) {
        return invoiceInfo.getInvoiceAmount()
                .compareTo(invoiceInfo.getReceiptInfo().getUserInfo().getBalance()) > 0;
    }


    private void reduceBalance(InvoiceInfo invoiceInfo) {
        BigDecimal newBalance = invoiceInfo.getReceiptInfo().getUserInfo().getBalance()
                .subtract(invoiceInfo.getInvoiceAmount());

        invoiceInfo.getReceiptInfo().getUserInfo().setBalance(newBalance);
        this.userService.save(invoiceInfo.getReceiptInfo().getUserInfo());
    }

    @Override
    public List<InvoiceInfo> getByAutobillList(Long userId) {
        return repository.findLatestAutobillInvoicesForUser(userId);
    }

    @Override
    public List<InvoiceInfo> getLastFourInvoiceAmount(Long invoiceNo, Long id) {
        return repository.findLastFourInvoiceAmount(invoiceNo, id);
    }
}
