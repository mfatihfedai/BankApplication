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
    private List<LogResponse> logResponse; // Tablo verileri
    private AdminLogResponse adminLogResponseChart; // Grafik verileri
    private int currentPage; // Mevcut sayfa
    private int totalPages; // Toplam sayfa sayısı
    private long totalElements; // Toplam öğe sayısı
    private int pageSize; // Sayfa boyutu
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
