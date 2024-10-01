package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
import com.softwareProject.banksApplication.entity.InvoiceInfo;

public interface InvoiceService extends IBaseService<InvoiceInfo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse>{
}
