package com.softwareProject.banksApplication.dto.request.log;

import com.softwareProject.banksApplication.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogUpdateRequest {
    private Long id;
    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;
    private UserInfo userInfo;
}
