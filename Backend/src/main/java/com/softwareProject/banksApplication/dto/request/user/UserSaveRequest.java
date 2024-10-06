package com.softwareProject.banksApplication.dto.request.user;

import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSaveRequest {
    private String name;
    private String surname;
    private String email;
    private Long identityNumber;
    private String password;
    private UserInfo.Role role;
    private Long balance;
}
