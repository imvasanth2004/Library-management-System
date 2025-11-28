package com.library.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private SecretKey secretKey;

    // Inject the secret key from application properties
    @Value("${jwt.secret}")
    private void setSecret(String secret) {
        if (secret.length() < 32) {
            throw new IllegalArgumentException("Secret key must be at least 32 characters long.");
        }
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /**
     * Extracts the username (subject) from the JWT token.
     * 
     * @param token the JWT token
     * @return the username (subject)
     */
    public String extractUsername(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token.replace("Bearer ", "")) // Remove Bearer prefix
                .getBody();
            return claims.getSubject(); // Extracts the 'sub' claim
        } catch (Exception ex) {
            throw new RuntimeException("Invalid JWT token.", ex);
        }
    }

    /**
     * Generates a JWT token with the given username as the subject.
     * 
     * @param username the username
     * @return the generated JWT token
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Set the 'sub' claim
                .signWith(secretKey, SignatureAlgorithm.HS256) // Sign the token
                .compact();
    }
}
