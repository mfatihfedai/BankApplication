package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class UserController extends BaseController<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse> {
    private final UserService userService;
    public UserController(IBaseService<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse> service, UserService userService) {
        super(service);
        this.userService = userService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserResponse> create(
            @RequestBody UserSaveRequest userSaveRequest,
            @RequestParam(name = "userRole", required = false, defaultValue = "USER") String role) {
        return ResponseEntity.ok(this.userService.createUser(userSaveRequest, role));
    }
}
