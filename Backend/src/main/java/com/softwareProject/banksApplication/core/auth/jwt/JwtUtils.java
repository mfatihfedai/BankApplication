package com.softwareProject.banksApplication.core.auth.jwt;


import com.softwareProject.banksApplication.core.auth.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtUtils {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // HS256 ile bir güvenlik anahtarı oluşturulur.
    private static final long EXPIRATION_TIME = 600000; // milisaniye 5 dk süre

    public String generateToken(CustomUserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUserInfo().getName())
                .claim("identityNumber", userDetails.getUserInfo().getIdentityNumber())
                .claim("accountNumber", userDetails.getUserInfo().getAccountNumber())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofSeconds(EXPIRATION_TIME))))
                .signWith(key)
                .compact();
    }

    public String validateToken(String token) {
        try {
            return Jwts.parser()
                        .setSigningKey(key)
                        .build()
                        .parseSignedClaims(token)
                        .getBody()
                        .getSubject();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid or expired token");
        }
    }
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Long extractIdentityNumber(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("identityNumber", Long.class);
    }

    public Long extractAccountNumber(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("accountNumber", Long.class);
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
}
