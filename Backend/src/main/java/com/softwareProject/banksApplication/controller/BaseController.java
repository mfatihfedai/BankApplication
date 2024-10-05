package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
public class BaseController<E, SAVEREQUEST, UPDATEREQUEST, RESPONSE> {
    protected final IBaseService<E, SAVEREQUEST, UPDATEREQUEST, RESPONSE> service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<RESPONSE> save(@RequestBody SAVEREQUEST saverequest) {
        return ResponseEntity.ok(this.service.create(saverequest));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<RESPONSE> update(@PathVariable("id") Long id, @RequestBody UPDATEREQUEST updaterequest) {
        return ResponseEntity.ok(this.service.update(id, updaterequest));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<E> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.service.getById(id));
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public CursorResponse<RESPONSE> cursorResponse(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        return this.service.cursor(page, pageSize);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.service.delete(id));
    }
}
