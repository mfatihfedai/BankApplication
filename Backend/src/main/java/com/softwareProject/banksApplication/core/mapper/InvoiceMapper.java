package com.softwareProject.banksApplication.core.mapper;

import com.softwareProject.banksApplication.dto.request.invoice.InvoiceSaveRequest;
import com.softwareProject.banksApplication.dto.request.invoice.InvoiceUpdateRequest;
import com.softwareProject.banksApplication.dto.response.invoice.InvoiceResponse;
import com.softwareProject.banksApplication.entity.InvoiceInfo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoiceMapper extends BaseMapper<InvoiceInfo, InvoiceSaveRequest, InvoiceUpdateRequest, InvoiceResponse>{
}
