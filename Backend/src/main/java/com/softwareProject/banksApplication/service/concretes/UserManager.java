//package com.softwareProject.banksApplication.service.concretes;
//
//import com.softwareProject.banksApplication.core.mapper.UserMapper;
//import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
//import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
//import com.softwareProject.banksApplication.dto.response.user.UserResponse;
//import com.softwareProject.banksApplication.entity.UserInfo;
//import com.softwareProject.banksApplication.repo.UserRepo;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserManager extends BaseManager<UserInfo, UserRepo, UserSaveRequest, UserUpdateRequest, UserResponse, UserMapper> {
//    public UserManager(UserRepo repository, UserMapper mapper) {
//        super(repository, mapper);
//    }
//
//    @Override
//    protected Long extractId(UserUpdateRequest updateDto) {
//        return updateDto.getId();
//    }
//}
