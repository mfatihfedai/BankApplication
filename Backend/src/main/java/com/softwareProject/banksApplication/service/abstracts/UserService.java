package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.CursorResponse;
import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;
import org.springframework.data.domain.Page;


import java.util.Optional;

public interface UserService extends IBaseService<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse> {
    UserResponse create(UserSaveRequest request);
    UserInfo save(UserInfo user);
    CursorResponse<UserResponse> searchByKeyword(int page, int pageSize, String keyword);
    Optional<UserInfo> isAccountNumberExist(Long accountNumber);
    UserResponse forgetEmail(String email);
    UserInfo findByAccountNumber(Long receiverAccountNo);
}
