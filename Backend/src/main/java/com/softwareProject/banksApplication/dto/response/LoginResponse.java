package com.softwareProject.banksApplication.dto.response;

import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private UserResponse user;
    private LocalDateTime lastLoginTime;
}
