package com.softwareProject.banksApplication.dto.response.user;

import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private Long identityNumber;
    private Long accountNumber;
    private String password;
    private UserInfo.Role role;
    private double balance;
}
