package com.softwareProject.banksApplication.service.abstracts;

import com.softwareProject.banksApplication.dto.CursorResponse;

public interface IBaseService <E, SAVEREQUEST, UPDATEREQUEST, RESPONSE> {
    RESPONSE save(SAVEREQUEST request);
    E getById(Long id);
    CursorResponse<RESPONSE> cursor(int page, int pageSize);
    RESPONSE update(Long id, UPDATEREQUEST request);
    boolean delete(Long id);
}
