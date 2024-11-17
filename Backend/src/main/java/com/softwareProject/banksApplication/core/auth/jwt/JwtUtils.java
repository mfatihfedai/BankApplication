package com.softwareProject.banksApplication.core.auth.jwt;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Güvenli bir anahtar oluşturun
    private static final long EXPIRATION_TIME = 300; // 5 min

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
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

}
