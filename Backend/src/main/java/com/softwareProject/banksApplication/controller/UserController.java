package com.softwareProject.banksApplication.controller;

import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/user")
public class UserController extends BaseController<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse> {
    public UserController(IBaseService<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse> service) {
        super(service);
    }
}
