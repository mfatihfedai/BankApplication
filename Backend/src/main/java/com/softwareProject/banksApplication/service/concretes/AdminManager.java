package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.mapper.LogMapperImpl;
import com.softwareProject.banksApplication.dto.response.admin.AdminLogResponse;
import com.softwareProject.banksApplication.dto.response.admin.AdminPaginationLogResponse;
import com.softwareProject.banksApplication.dto.response.log.LogResponse;
import com.softwareProject.banksApplication.entity.LogInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.LogRepo;
import com.softwareProject.banksApplication.repo.UserRepo;
import com.softwareProject.banksApplication.service.abstracts.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class AdminManager implements AdminService {
    private final LogMapperImpl logMapperImpl;
    private UserRepo userRepo;
    private LogRepo logRepo;

    @Override
    public AdminPaginationLogResponse cursorLogResponse(String keyword, int page, int pageSize) {
        List<UserInfo> users = this.userRepo.searchByKeyword(keyword);
        Page<LogInfo> resultsTable;

        // Sayfalama bilgilerini oluştur
        Pageable pageable = PageRequest.of(page, pageSize);

        // Gruplanmış verileri al
        if(Objects.equals(keyword, "")){
            resultsTable = logRepo.findAll(pageable);
        } else {
            resultsTable = logRepo.findByUsers(users, pageable);
        }

        // Tüm verileri al
        List<Object[]> resultsChart = logRepo.findDailyLoginCountsByUsers(users);

        // AdminLogResponseChart nesnesini oluştur
        AdminLogResponse adminLogResponseChart = new AdminLogResponse();
        adminLogResponseChart.setLoginDate(new ArrayList<>());
        adminLogResponseChart.setTotalLogins(new ArrayList<>());
        adminLogResponseChart.setTotalUsers(new ArrayList<>());

        // AdminLogResponseTable nesnesini oluştur
        List<LogResponse> LogResponseTable = new ArrayList<>();

        // Verileri AdminLogResponseChart'a doldur
        for (Object[] result : resultsChart) {
            adminLogResponseChart.getLoginDate().add((LocalDate) result[0]);
            adminLogResponseChart.getTotalLogins().add((Long) result[1]);
            adminLogResponseChart.getTotalUsers().add((Long) result[2]);
        }

        // Verileri AdminLogResponseTable'a doldur
        for (LogInfo result : resultsTable.getContent()) {
            LogResponse entityToResponse = logMapperImpl.entityToResponse(result);
            LogResponseTable.add(entityToResponse);
        }

        // AdminLogPaginationResponse nesnesini oluştur ve döndür
        return new AdminPaginationLogResponse(LogResponseTable, adminLogResponseChart, resultsTable);
    }
}
