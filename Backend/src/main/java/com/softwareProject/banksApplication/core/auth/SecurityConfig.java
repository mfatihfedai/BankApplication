package com.softwareProject.banksApplication.core.auth;

import com.softwareProject.banksApplication.service.concretes.TwoFactorAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomUserDetailsService customUserDetailsService;
    private final TwoFactorAuthService twoFactorAuthService;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/v1/admins/**").hasRole("ADMIN");
                    registry.requestMatchers("/v1/pensions/**").hasAnyRole("ADMIN","EMPLOYEE");
                    registry.anyRequest().authenticated();
                })
                //.httpBasic(Customizer.withDefaults())
                .formLogin(login -> login
                        .successHandler((request, response, authentication) -> {
                            // Generate and send OTP after successful login
                            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                            //String username = userDetails.getUsername();
                            String email = ((CustomUserDetails) userDetails).getMail();
                            String otp = twoFactorAuthService.generateOTP();
                            twoFactorAuthService.sendOTP(email, otp);

                            // İsteği dashboard ya da başka bir sayfaya yönlendirin
                            response.sendRedirect("/dashboard");
                        })
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")  // URL for logout
                        .logoutSuccessUrl("/login?logout")  // Redirect after logout
                        .invalidateHttpSession(true)  // Invalidate session
                        .deleteCookies("JSESSIONID")  // Remove cookies
                )
                .build();
    }
    @Bean
    public UserDetailsService userDetailsService(){
        return customUserDetailsService;
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
