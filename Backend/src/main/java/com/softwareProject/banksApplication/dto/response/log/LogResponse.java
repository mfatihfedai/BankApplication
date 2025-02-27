package com.softwareProject.banksApplication.dto.response.log;

import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogResponse {
    private Long id;
    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;
    private UserInfo userInfo;
}
