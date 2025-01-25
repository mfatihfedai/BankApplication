package com.softwareProject.banksApplication.dto.response.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminLogResponse {
    private ArrayList<LocalDate> loginDate;
    private ArrayList<Long> totalLogins;
    private ArrayList<Long> totalUsers;
}
