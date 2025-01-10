package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.core.auth.CustomUserDetails;
import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.TransferInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.softwareProject.banksApplication.core.Config.RestApis.TRANSFERSERVICE;

@RestController
@RequestMapping(TRANSFERSERVICE)
@RequiredArgsConstructor
public class TransferController {
    private final TransferService transferService;

    @PostMapping
    @PreAuthorize("#user.id == authentication.principal.id or hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public TransferResponse create(@RequestBody TransferSaveRequest saveRequest, @AuthenticationPrincipal CustomUserDetails user) {
        return this.transferService.create(saveRequest, user.getId());
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TransferResponse> update(@PathVariable("id") Long id, @RequestBody TransferUpdateRequest updaterequest) {
        return ResponseEntity.ok(this.transferService.update(id, updaterequest));
    }

    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TransferInfo> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.transferService.getById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public CursorResponse<TransferResponse> cursorResponse(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        return this.transferService.cursor(page, pageSize);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.transferService.delete(id));
    }

}
