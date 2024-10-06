package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
import com.softwareProject.banksApplication.entity.InvoiceInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import com.softwareProject.banksApplication.service.abstracts.InvoiceService;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/invoice")
public class InvoiceController extends BaseController<InvoiceInfo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse> {
    private final InvoiceService invoiceService;
    public InvoiceController(IBaseService<InvoiceInfo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse> service, InvoiceService invoiceService) {
        super(service);
        this.invoiceService = invoiceService;
    }

    //@PreAuthorize("#user.id == authentication.principal.id or hasRole('ADMIN')")
    @PostMapping("/create")
    public InvoiceResponse createInvoice(@RequestBody InvoiceSaveRequest saveRequest,
                                         //@AuthenticationPrincipal
                                         UserInfo user) {
        return this.invoiceService.create(saveRequest, user.getId());
    }

    //@PreAuthorize("#user.id == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping("/autobill")
    public List<InvoiceInfo> autobill(//@AuthenticationPrincipal
                                      UserInfo user) {
        return this.invoiceService.getByAutobillList(user.getId());
    }
}
