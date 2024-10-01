package com.softwareProject.banksApplication.dto.response.user;

import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String name;
    private String surname;
    private Integer phoneNumber;
    private Integer identityNumber;
    private Integer accountNumber;
    private String password;
    private UserInfo.Role role;
    private Long balance;
}
