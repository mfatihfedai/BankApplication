package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.response.admin.AdminLogResponse;
import com.softwareProject.banksApplication.dto.response.admin.AdminPaginationLogResponse;
import com.softwareProject.banksApplication.service.abstracts.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.softwareProject.banksApplication.core.Config.RestApis.ADMINSERVICE;

@RestController
@RequestMapping(ADMINSERVICE)
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/logChartResponse")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AdminPaginationLogResponse> cursorLogResponse(
            @RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(this.adminService.cursorLogResponse(keyword, page, pageSize));
    }

}
