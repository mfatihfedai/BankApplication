package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;

import java.util.List;
import java.util.Optional;

public interface UserService extends IBaseService<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse> {
    UserResponse create(UserSaveRequest request);
    UserInfo save(UserInfo user);
    List<UserInfo> searchByKeyword(String keyword);
    Optional<UserInfo> isAccountNumberExist(Long accountNumber);
}
