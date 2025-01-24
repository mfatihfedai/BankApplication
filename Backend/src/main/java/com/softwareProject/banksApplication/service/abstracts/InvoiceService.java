package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
import com.softwareProject.banksApplication.entity.InvoiceInfo;

import java.util.List;

public interface InvoiceService extends IBaseService<InvoiceInfo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse>{
    InvoiceResponse create(InvoiceSaveRequest saveRequest, Long id);
    List<InvoiceInfo> getByAutobillList(Long userId);
    List<InvoiceInfo> getLastFourInvoiceAmount(Long invoiceNo, Long id);
    InvoiceResponse update(Long id, boolean autobill);
}
