package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.banks.BanksSaveRequest;
import com.softwareProject.banksApplication.dto.request.banks.BanksUpdateRequest;
import com.softwareProject.banksApplication.dto.response.banks.BanksResponse;
import com.softwareProject.banksApplication.entity.BanksInfo;
import com.softwareProject.banksApplication.service.abstracts.BanksService;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.softwareProject.banksApplication.core.Config.RestApis.BANKSSERVICE;

@RestController
@RequestMapping(BANKSSERVICE)
@RequiredArgsConstructor
public class BanksController{
    private final BanksService banksService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<BanksResponse> save(@RequestBody BanksSaveRequest saverequest) {
        return ResponseEntity.ok(this.banksService.create(saverequest));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BanksResponse> update(@PathVariable("id") Long id, @RequestBody BanksUpdateRequest updaterequest) {
        return ResponseEntity.ok(this.banksService.update(id, updaterequest));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BanksInfo> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.banksService.getById(id));
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public CursorResponse<BanksResponse> cursorResponse(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        return this.banksService.cursor(page, pageSize);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.banksService.delete(id));
    }
}
