package com.softwareProject.banksApplication.core.mapper;

import org.mapstruct.Named;

public interface BaseMapper<E, SAVEREQUEST, UPDATEREQUEST, RESPONSE> {

    @Named("saveRequestToEntity")
    E saveRequestToEntity(SAVEREQUEST saverequest);

    @Named("updateRequestToEntity")
    E updateRequestToEntity(UPDATEREQUEST updaterequest);

    @Named("entityToResponse")
    RESPONSE entityToResponse(E entity);
}
