package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.response.admin.AdminPaginationLogResponse;

public interface AdminService {
    AdminPaginationLogResponse cursorLogResponse(String identityNo, int page, int pageSize);
}
