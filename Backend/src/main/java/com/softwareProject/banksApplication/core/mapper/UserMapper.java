package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends BaseMapper<UserInfo, UserSaveRequest, UserUpdateRequest, UserResponse>{
}
