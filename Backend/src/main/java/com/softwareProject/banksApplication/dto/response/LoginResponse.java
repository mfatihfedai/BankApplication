package com.softwareProject.banksApplication.dto.response;

import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String role;
    private Long id;
    private UserResponse user;
}
