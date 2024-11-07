package com.softwareProject.banksApplication.service.concretes;

import com.softwareProject.banksApplication.core.Logging.LogManager;
import com.softwareProject.banksApplication.core.auth.MailMessageService;
import com.softwareProject.banksApplication.core.exception.DataAlreadyExistException;
import com.softwareProject.banksApplication.core.exception.NotValidException;
import com.softwareProject.banksApplication.core.mapper.UserMapper;
import com.softwareProject.banksApplication.core.utilies.Msg;
import com.softwareProject.banksApplication.dto.request.user.UserSaveRequest;
import com.softwareProject.banksApplication.dto.request.user.UserUpdateRequest;
import com.softwareProject.banksApplication.dto.response.user.UserResponse;
import com.softwareProject.banksApplication.entity.ReceiptInfo;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.ReceiptRepo;
import com.softwareProject.banksApplication.repo.UserRepo;
import com.softwareProject.banksApplication.service.abstracts.UserService;
//import org.springframework.security.crypto.bcrypt.BCrypt;
import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import static org.springframework.beans.MethodInvocationException.ERROR_CODE;

@Service
public class UserManager extends BaseManager<UserInfo, UserRepo, UserSaveRequest, UserUpdateRequest, UserResponse, UserMapper> implements UserService {
    private final ReceiptRepo receiptRepo;
    private final MailMessageService mailMessageService;
    public UserManager(UserRepo repository, UserMapper mapper, ReceiptRepo receiptRepo, MailMessageService mailMessageService, LogManager logManager) {
        super(repository, mapper);
        this.receiptRepo = receiptRepo;
        this.mailMessageService = mailMessageService;
    }

    @Override
    public UserResponse create(UserSaveRequest request) {
        UserInfo user = mapper.saveRequestToEntity(request);
        // Control the identity number
        if(!identityControl(String.valueOf(user.getIdentityNumber()))){
            throw new NotValidException("Please enter valid identity number.");
        }
        // Is user exist in the database
        Optional<UserInfo> userOptional = this.repository.findByEmailOrIdentityNumber(
                user.getEmail(),
                user.getIdentityNumber()
        );
        if(userOptional.isPresent()){
            throw new DataAlreadyExistException(Msg.DATA_ALREADY_EXIST);
        }
        user.setAccountNumber(generateAccountNumber());
        user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
        this.repository.save(user);

        ReceiptInfo receiptInfo = new ReceiptInfo();
        receiptInfo.setUserInfo(user);
        user.setReceiptInfo(receiptInfo);
        this.receiptRepo.save(receiptInfo);
        return mapper.entityToResponse(user);
    }

    @Override
    public UserInfo save(UserInfo user) {
        return this.repository.save(user);
    }

    @Override
    public UserResponse update(Long id, UserUpdateRequest updateRequest){
        UserInfo user = this.repository.findById(id).orElse(null);
        UserInfo newUser = mapper.updateRequestToEntity(updateRequest);
        if (user == null) {
            throw new NotValidException("User not found.");
        }
        user.setName(newUser.getName());
        user.setSurname(newUser.getSurname());
        user.setEmail(newUser.getEmail());
        user.setPassword(BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt()));
        this.repository.save(user);
        return mapper.entityToResponse(user);
    }

    @Override
    public List<UserInfo> searchByKeyword(String keyword) {
        return repository.searchByKeyword(keyword);
    }

    @Override
    public Optional<UserInfo> isAccountNumberExist(Long accountNumber) {
        return this.repository.findByAccountNumber(accountNumber);
    }

    @Override
    public UserResponse forgetEmail(String email) {
        UserInfo user = this.repository.findByEmail(email);
        if (user == null) {
            throw new NotValidException("User not found.");
        }
        String password = this.generatePassayPassword();
        user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
        mailMessageService.sendForgetPasswordToEmail(user, password);
        this.save(user);
        return mapper.entityToResponse(user);
    }

    public String generatePassayPassword() {
        PasswordGenerator gen = new PasswordGenerator();
        CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
        CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
        lowerCaseRule.setNumberOfCharacters(2);

        CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
        CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
        upperCaseRule.setNumberOfCharacters(2);

        CharacterData digitChars = EnglishCharacterData.Digit;
        CharacterRule digitRule = new CharacterRule(digitChars);
        digitRule.setNumberOfCharacters(2);

        CharacterData specialChars = new CharacterData() {
            public String getErrorCode() {
                return ERROR_CODE;
            }
            public String getCharacters() {
                return "!@#$%^&*()_+";
            }
        };
        CharacterRule splCharRule = new CharacterRule(specialChars);
        splCharRule.setNumberOfCharacters(2);

        return gen.generatePassword(10, splCharRule, lowerCaseRule, upperCaseRule, digitRule);
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
