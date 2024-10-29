package com.softwareProject.banksApplication.core.auth;

import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String identityOrAccountNumber) throws UsernameNotFoundException {
        try {
            Long numericValue = Long.parseLong(identityOrAccountNumber);
            Optional<UserInfo> user = userRepo.findByIdentityNumber(numericValue);


            if (user.isEmpty()) {
                user = userRepo.findByAccountNumber(numericValue);
            }

            return user.map(CustomUserDetails::new)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with identity or account number: " + identityOrAccountNumber));

        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("Invalid identity or account number format: " + identityOrAccountNumber, e);
        }
    }

}
