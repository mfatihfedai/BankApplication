package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.core.auth.CustomUserDetails;
import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.response.log.LogResponse;
import com.softwareProject.banksApplication.service.abstracts.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.softwareProject.banksApplication.core.Config.RestApis.LOGSERVICE;

@RestController
@RequestMapping(LOGSERVICE)
@RequiredArgsConstructor
public class LogController {
    private final LogService logService;

    @PreAuthorize("#user.id == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public CursorResponse<LogResponse> getLog(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize,
            @AuthenticationPrincipal CustomUserDetails user) {
        return this.logService.cursorResponse(page, pageSize, user.getId());
    }
}
