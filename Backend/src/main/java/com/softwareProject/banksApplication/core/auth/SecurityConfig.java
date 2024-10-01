package com.softwareProject.banksApplication.core.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
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
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private TwoFactorAuthService twoFactorAuthService;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/login", "/auth/dashboard").permitAll();
                    registry.requestMatchers("/auth/verify/**").permitAll();
                    registry.requestMatchers("/swagger-ui/**").authenticated();
                    registry.requestMatchers("/v1/banks/**").hasRole("ADMIN");
                    registry.requestMatchers("/v1/invoice/**").hasAnyRole("ADMIN","USER");
                    registry.requestMatchers("/v1/receipt/**").hasAnyRole("ADMIN","USER");
                    registry.requestMatchers("/v1/user/**").hasRole("ADMIN");
                    registry.requestMatchers("/v1/transfer/**").hasAnyRole("ADMIN","USER");
                    registry.requestMatchers("/v1/pensions/**").hasAnyRole("ADMIN","USER");
                    registry.anyRequest().authenticated();
                })
//                .httpBasic(Customizer.withDefaults())
                .formLogin(login -> login
//                        .successForwardUrl("/generate-otp")
                        .successHandler((request, response, authentication) -> {
                            // Generate and send OTP after successful login
                            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                            String email = ((CustomUserDetails) userDetails).getMail();
                            String otp = twoFactorAuthService.generateOTP();
                            twoFactorAuthService.sendOTP(email, otp);

                            response.sendRedirect("/auth/verify");
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
