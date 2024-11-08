package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserResponse> save(@RequestBody UserSaveRequest userSaveRequest) {
        return ResponseEntity.ok(this.service.create(userSaveRequest));
    }

    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)

    public ResponseEntity<UserInfo> get(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.getById(id));
    }

    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> update(@PathVariable Long id, @RequestBody UserUpdateRequest userUpdateRequest) {
        return ResponseEntity.ok(this.service.update(id, userUpdateRequest));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public CursorResponse<UserResponse> cursorResponse(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        return this.service.cursor(page, pageSize);
    }

    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (this.service.delete(id)) {
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("/logout")).build();
        } else {
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("/error")).build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/search")
    public List<UserInfo> searchUsers(@RequestBody String keyword) {
        return service.searchByKeyword(keyword);
    }

    @PostMapping("forgetPass")
    public ResponseEntity<UserResponse> forgetPass(String email){
        return ResponseEntity.ok(this.service.forgetEmail(email));
    }
}
