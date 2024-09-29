//package com.softwareProject.banksApplication.service.concretes;
//
//import com.softwareProject.banksApplication.core.exception.NotFoundException;
//import com.softwareProject.banksApplication.core.utilies.Msg;
//import com.softwareProject.banksApplication.core.utilies.ResultHelper;
//import com.softwareProject.banksApplication.service.abstracts.IBaseService;
//import com.softwareProject.banksApplication.core.mapper.BaseMapper;
//import com.softwareProject.banksApplication.dto.CursorResponse;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//@RequiredArgsConstructor
//public abstract class BaseManager<E, R extends JpaRepository<E, Long>, SAVEREQUEST, UPDATEREQUEST, RESPONSE>
//        implements IBaseService<E, SAVEREQUEST, UPDATEREQUEST, RESPONSE> {
//
//    protected final R repository;
//    protected abstract E saveRequestToEntity(SAVEREQUEST saveRequest);
//
//    protected abstract E updateRequestToEntity(UPDATEREQUEST updateRequest, E existingEntity);
//
//    protected abstract RESPONSE entityToResponse(E entity);
//
//    @Override
//    @Transactional
//    public RESPONSE save(SAVEREQUEST saveDto) {
//        E entity = saveRequestToEntity(saveDto);  // SAVE DTO'dan Entity'ye
//        E savedEntity = repository.save(entity);  // Veritabanına kaydet
//        return entityToResponse(savedEntity);  // Entity'den RESPONSE DTO'ya
//    }
//
//    @Override
//    public E getById(Long id) {
//        Optional<E> entity = repository.findById(id);
//        return entity.orElseThrow(() -> new NotFoundException(Msg.NOT_FOUND));
//    }
//
//    @Override
//    public CursorResponse<RESPONSE> cursor(int page, int pageSize) {
//        Pageable pageable = PageRequest.of(page, pageSize);
//        Page<E> entityPage = this.repository.findAll(pageable);
//        Page<RESPONSE> entityResponsePage = entityPage.map(this::entityToResponse);
//        return ResultHelper.cursor(entityResponsePage);
//    }
//
//    @Override
//    @Transactional
//    public RESPONSE update(UPDATEREQUEST updateDto) {
//        E existingEntity = this.getById(extractId(updateDto));
//        updateRequestToEntity(updateDto, existingEntity);  // UPDATE DTO'dan entity'yi güncelle
//        E updatedEntity = repository.save(existingEntity);
//        return entityToResponse(updatedEntity);  // Entity'den RESPONSE DTO'ya
//    }
//
//    @Override
//    @Transactional
//    public boolean delete(Long id) {
//        E entity = getById(id);
//        repository.delete(entity);
//        return true;
//    }
//
//    // ID çekme işlemi
//    protected abstract Long extractId(UPDATEREQUEST updateDto);
//}
