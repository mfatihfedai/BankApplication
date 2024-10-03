package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;

public interface UserService extends IBaseService<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse> {
    UserResponse createUser(UserSaveRequest request, String role);
}
