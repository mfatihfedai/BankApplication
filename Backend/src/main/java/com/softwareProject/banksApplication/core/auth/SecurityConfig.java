package com.softwareProject.banksApplication.core.auth;

import com.softwareProject.banksApplication.core.Logging.LogManager;
import com.softwareProject.banksApplication.entity.UserInfo;
import com.softwareProject.banksApplication.service.abstracts.UserService;
import com.softwareProject.banksApplication.service.concretes.UserManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final CustomUserDetailsService customUserDetailsService;
    private final LogManager logManager;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/login").permitAll();
                    registry.requestMatchers("/auth/dashboard").hasRole("USER");
                    registry.requestMatchers("/auth/**").permitAll();
                    registry.requestMatchers("/swagger-ui/**").authenticated();
                    // BANKS
                    registry.requestMatchers(HttpMethod.GET,"/v1/banks/**").hasAnyRole("ADMIN","USER");
                    registry.requestMatchers(HttpMethod.POST,"/v1/banks/**").hasRole("ADMIN");
                    registry.requestMatchers(HttpMethod.PUT,"/v1/banks/**").hasRole("ADMIN");
                    registry.requestMatchers(HttpMethod.DELETE,"/v1/banks/**").hasRole("ADMIN");
                    // USER
                    registry.requestMatchers(HttpMethod.GET,"/v1/user/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.POST,"/v1/user/**").permitAll();
                    registry.requestMatchers(HttpMethod.PUT,"/v1/user/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.DELETE,"/v1/user/**").hasAnyRole("ADMIN","USER");
                    // INVOICE
                    registry.requestMatchers(HttpMethod.GET,"/v1/invoice/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.POST,"/v1/invoice/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.PUT,"/v1/invoice/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.DELETE,"/v1/invoice/**").hasRole("ADMIN");
                    // RECEIPT
                    registry.requestMatchers(HttpMethod.GET,"/v1/receipt/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.POST,"/v1/receipt/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.PUT,"/v1/receipt/**").hasRole("ADMIN");
                    registry.requestMatchers(HttpMethod.DELETE,"/v1/receipt/**").hasAnyRole("ADMIN", "USER");
                    // TRANSFER
                    registry.requestMatchers(HttpMethod.GET,"/v1/transfer/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.POST,"/v1/transfer/**").hasAnyRole("ADMIN", "USER");
                    registry.requestMatchers(HttpMethod.PUT,"/v1/transfer/**").hasRole("ADMIN");
                    registry.requestMatchers(HttpMethod.DELETE,"/v1/transfer/**").hasAnyRole("ADMIN", "USER");
                    registry.anyRequest().authenticated();
                })
                .formLogin(login -> login
                        .successHandler((request, response, authentication) -> {
                            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                            Long id = ((CustomUserDetails) userDetails).getId();
                            response.sendRedirect("/auth/generate-otp/" + id);
                        })
                        .permitAll()
                )
                .addFilterAfter(new OtpAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/logout")  // URL for logout
                        .logoutSuccessUrl("/login?logout")
                        .invalidateHttpSession(true)  // Invalidate session
                        .deleteCookies("JSESSIONID")  // Remove cookies
                        .addLogoutHandler((request, response, authentication) -> {
                            if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
                                UserInfo user = ((CustomUserDetails) authentication.getPrincipal()).getUserInfo();
                                logManager.logUserLogout(user);  // Log logout event
                            }
                        })
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .maximumSessions(1) // Sadece bir oturum
                        .maxSessionsPreventsLogin(true) // Yeni oturumu engelle
                        .expiredUrl("/login?expired")
                        .sessionRegistry(sessionRegistry())
                )
                .build();
    }
    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
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
