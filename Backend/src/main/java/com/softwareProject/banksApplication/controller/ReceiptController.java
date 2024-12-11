package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.response.receipt.ReceiptResponse;
import com.softwareProject.banksApplication.service.abstracts.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static com.softwareProject.banksApplication.core.Config.RestApis.RECEIPTSERVICE;

@RestController
@RequiredArgsConstructor
@RequestMapping(RECEIPTSERVICE)
public class ReceiptController {
    private final ReceiptService receiptService;
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public CursorResponse<ReceiptResponse> cursorResponse(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        return this.receiptService.cursor(page, pageSize);
    }
}
