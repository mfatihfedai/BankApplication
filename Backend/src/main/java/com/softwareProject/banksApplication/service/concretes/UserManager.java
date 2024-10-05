package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.mapper.UserMapper;
import com.softwareProject.banksApplication.core.utilies.Msg;
import com.softwareProject.banksApplication.core.utilies.ResultHelper;
import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.UserRepo;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UserManager extends BaseManager<UserInfo, UserRepo, UserSaveRequest, UserUpdateRequest, UserResponse, UserMapper> implements UserService {
    public UserManager(UserRepo repository, UserMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public UserResponse create(UserSaveRequest request) {
        UserInfo user = mapper.saveRequestToEntity(request);
        // Control the identity number
        if(identityControl(String.valueOf(user.getIdentityNumber()))){
            throw new RuntimeException("Please enter valid identity number.");
        }
        // Is user exist in the database
        Optional<UserInfo> userOptional = this.repository.findByEmailOrIdentityNumber(
                user.getEmail(),
                user.getIdentityNumber()
        );
        if(userOptional.isPresent()){
            throw new RuntimeException(Msg.DATA_ALREADY_EXIST);
        }
        user.setAccountNumber(generateAccountNumber());
        user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
        this.repository.save(user);
        return mapper.entityToResponse(user);
    }

    @Override
    public UserInfo save(UserInfo user) {
        return this.repository.save(user);
    }

    private Long generateAccountNumber() {
        long newNumber;
        boolean isAvailable;
        do {
            isAvailable = false;
            Random random = new Random();
            newNumber = random.nextLong(99999999);
            Optional<UserInfo> numberAvailable = this.repository.findByAccountNumber(newNumber);
            if(numberAvailable.isPresent()){
                isAvailable = true;
            }
        } while(isAvailable);

        return newNumber;
    }

    private boolean identityControl(String tcNo)
    {
        int[] sayiDizi = separate(tcNo);

        if (sayiDizi!=null)
        {
            boolean kosul1 = (sayiDizi[0]+sayiDizi[1]+sayiDizi[2]+sayiDizi[3]+sayiDizi[4]+sayiDizi[5]+sayiDizi[6]+sayiDizi[7]+sayiDizi[8]+sayiDizi[9])%10 == sayiDizi[10];
            boolean kosul2 = (((sayiDizi[0]+sayiDizi[2]+sayiDizi[4]+sayiDizi[6]+sayiDizi[8]) * 7 ) + ((sayiDizi[1]+sayiDizi[3]+sayiDizi[5]+sayiDizi[7]) * 9 ))%10 == sayiDizi[9];
            boolean kosul3 = ((sayiDizi[0]+sayiDizi[2]+sayiDizi[4]+sayiDizi[6]+sayiDizi[8]) * 8 )%10 == sayiDizi[10];

            return kosul1 && kosul2 && kosul3;
        }
        return false;
    }

    private int[] separate(String tcNo)
    {
        int[] numbers = new int[11];

        if(tcNo == null || tcNo.length()!=11)
        {
            return null;
        }

        for (int i = 0; i < 11; i++)
        {
            numbers[i] = Integer.parseInt(tcNo.substring(i,(i+1)));
        }
        return numbers;
    }
}
