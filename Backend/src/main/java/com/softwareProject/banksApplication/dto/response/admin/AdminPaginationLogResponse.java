package com.softwareProject.banksApplication.dto.response.admin;

import com.softwareProject.banksApplication.dto.response.log.LogResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminPaginationLogResponse {
    private List<LogResponse> logResponse;
    private AdminLogResponse adminLogResponseChart;
    private int currentPage;
    private int totalPages;
    private long totalElements;
    private int pageSize;
    private boolean hasNext;

    // Page nesnesinden otomatik olarak bilgileri alan bir constructor
    public AdminPaginationLogResponse(List<LogResponse> logResponse, AdminLogResponse adminLogResponseChart, Page<?> page) {
        this.logResponse = logResponse;
        this.adminLogResponseChart = adminLogResponseChart;
        this.currentPage = page.getNumber();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.pageSize = page.getSize();
        this.hasNext = page.hasNext();
    }
}
