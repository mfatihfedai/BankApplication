package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.exception.NotFoundException;
import com.softwareProject.banksApplication.core.utilies.Msg;
import com.softwareProject.banksApplication.core.utilies.ResultHelper;
import com.softwareProject.banksApplication.service.abstracts.IBaseService;
import com.softwareProject.banksApplication.core.mapper.BaseMapper;
import com.softwareProject.banksApplication.dto.CursorResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@RequiredArgsConstructor
public abstract class BaseManager<E, R extends JpaRepository<E, Long>, SAVEREQUEST, UPDATEREQUEST, RESPONSE, MAPPER extends BaseMapper<E, SAVEREQUEST, UPDATEREQUEST, RESPONSE>>
        implements IBaseService<E, SAVEREQUEST, UPDATEREQUEST, RESPONSE> {

    protected final R repository;
    protected final MAPPER mapper;

    @Override
    @Transactional
    public RESPONSE save(SAVEREQUEST saveDto) {
        E entity = mapper.saveRequestToEntity(saveDto);  // SAVE DTO'dan Entity'ye
        E savedEntity = repository.save(entity);  // Veritabanına kaydet
        return mapper.entityToResponse(savedEntity);  // Entity'den RESPONSE DTO'ya
    }

    @Override
    public E getById(Long id) {
        Optional<E> entity = repository.findById(id);
        return entity.orElseThrow(() -> new NotFoundException(Msg.NOT_FOUND));
    }

    @Override
    public CursorResponse<RESPONSE> cursor(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<E> entityPage = this.repository.findAll(pageable);
        Page<RESPONSE> entityResponsePage = entityPage.map(mapper::entityToResponse);
        return ResultHelper.cursor(entityResponsePage);
    }

    @Override
    @Transactional
    public RESPONSE update(Long id, UPDATEREQUEST updateDto) {
        this.getById(id);
        E existingEntity = mapper.updateRequestToEntity(updateDto);  // UPDATE DTO'dan entity'yi güncelle
        E updatedEntity = repository.save(existingEntity);
        return mapper.entityToResponse(updatedEntity);  // Entity'den RESPONSE DTO'ya
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        E entity = getById(id);
        repository.delete(entity);
        return true;
    }
}
