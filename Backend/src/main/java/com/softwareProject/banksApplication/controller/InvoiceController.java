package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
import com.softwareProject.banksApplication.entity.InvoiceInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/invoice")
public class InvoiceController extends BaseController<InvoiceInfo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse> {
    public InvoiceController(IBaseService<InvoiceInfo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse> service) {
        super(service);
    }
}
