package com.softwareProject.banksApplication.core.base;

import com.softwareProject.banksApplication.dto.CursorResponse;

import java.util.List;

public interface IBaseService <E, SAVEREQUEST, UPDATEREQUEST, RESPONSE> {
    RESPONSE save(SAVEREQUEST request);
    E getById(Long id);
    CursorResponse<RESPONSE> cursor(int page, int pageSize);
    List<E> getAll();
    RESPONSE update(UPDATEREQUEST request);
    boolean delete(Long id);
}
