package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
import com.softwareProject.banksApplication.entity.InvoiceInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import com.softwareProject.banksApplication.service.abstracts.InvoiceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/invoice")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PreAuthorize("#user.id == authentication.principal.id or hasRole('ADMIN')")
    @PostMapping("/create")
    public InvoiceResponse createInvoice(@RequestBody InvoiceSaveRequest saveRequest, @AuthenticationPrincipal UserInfo user) {
        return this.invoiceService.create(saveRequest, user.getId());
    }

    @PreAuthorize("#user.id == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping("/autobill")
    public List<InvoiceInfo> autobill(@AuthenticationPrincipal UserInfo user) {
        return this.invoiceService.getByAutobillList(user.getId());
    }

    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<InvoiceResponse> update(@PathVariable("id") Long id, @RequestBody InvoiceUpdateRequest updaterequest) {
        return ResponseEntity.ok(this.invoiceService.update(id, updaterequest));
    }

    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<InvoiceInfo> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.invoiceService.getById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public CursorResponse<InvoiceResponse> cursorResponse(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        return this.invoiceService.cursor(page, pageSize);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.invoiceService.delete(id));
    }
}
