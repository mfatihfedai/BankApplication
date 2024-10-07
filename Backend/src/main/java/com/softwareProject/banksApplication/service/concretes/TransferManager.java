package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.exception.NotValidException;
import com.softwareProject.banksApplication.core.mapper.TransferMapper;
import com.softwareProject.banksApplication.dto.request.transfer.TransferSaveRequest;
import com.softwareProject.banksApplication.dto.request.transfer.TransferUpdateRequest;
import com.softwareProject.banksApplication.dto.response.transfer.TransferResponse;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import com.softwareProject.banksApplication.entity.TransferInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.TransferRepo;
import com.softwareProject.banksApplication.service.abstracts.TransferService;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TransferManager extends BaseManager<TransferInfo, TransferRepo, TransferSaveRequest, TransferUpdateRequest, TransferResponse, TransferMapper> implements TransferService {
    private final UserService userService;
    public TransferManager(TransferRepo repository, TransferMapper mapper, UserService userService) {
        super(repository, mapper);
        this.userService = userService;
    }

    @Override
    @Transactional
    public TransferResponse create(TransferSaveRequest transferSaveRequest, Long userId) {
        UserInfo user = userService.getById(userId);
        ReceiptInfo receiptInfo = user.getReceiptInfo();
        TransferInfo transferInfo = mapper.saveRequestToEntity(transferSaveRequest);
        transferInfo.setReceiptInfo(receiptInfo);
        if(checkAccountNumber(transferInfo.getReceiverAccountNo())){
            throw new NotValidException("There is no receiver account number");
        }
        if(checkBalance(transferInfo)){
            throw new NotValidException("There is no balance");
        }
        transferInfo.setTransferTime(LocalDateTime.now());
        reduceBalanceFromSender(transferInfo);
        increaseBalanceFromReceiver(transferInfo);

        return mapper.entityToResponse(transferInfo);
    }

    private boolean checkAccountNumber(Long receiverAccountNo){
        Optional<UserInfo> userInfoOptional = this.userService.isAccountNumberExist(receiverAccountNo);
        return userInfoOptional.isEmpty();
    }

    private boolean checkBalance(TransferInfo transferInfo){
        return (transferInfo.getTransferAmount() + transferInfo.getTransferFee()) > transferInfo.getReceiptInfo().getUserInfo().getBalance();
    }

    private void reduceBalanceFromSender(TransferInfo transferInfo){
        transferInfo.getReceiptInfo().getUserInfo().setBalance(
                (double) Math.round(
                        (transferInfo.getReceiptInfo().getUserInfo().getBalance() -
                                (transferInfo.getTransferAmount() + transferInfo.getTransferFee())
                        ) * 100) /100);
        this.userService.save(transferInfo.getReceiptInfo().getUserInfo());
    }

    private void increaseBalanceFromReceiver(TransferInfo transferInfo){
        Optional<UserInfo> userInfoOptional = this.userService.isAccountNumberExist(transferInfo.getReceiverAccountNo());
        if(userInfoOptional.isPresent()){
            userInfoOptional.get().setBalance(
                    (double) Math.round(
                            userInfoOptional.get().getBalance() + transferInfo.getTransferAmount() * 100) /100);
            this.userService.save(userInfoOptional.get());
        }
    }
}
