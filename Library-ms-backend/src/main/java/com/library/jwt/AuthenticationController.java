package com.library.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username and password are required.");
        }

        // First, check if it's an admin login
        if (username.equals("ADMIN")) {
            // Authenticate admin using hardcoded credentials
            try {
                String token = authService.authenticateAdmin(username, password);
                return ResponseEntity.ok(new JwtResponse(token, "ROLE_ADMIN"));
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid admin credentials.");
            }
        }

        // Now, check if it's a student login
        Optional<UserDetails> userDetails = authService.findStudentByUsernameAndPassword(username, password);
        if (userDetails.isPresent()) {
            String token = authService.generateToken(userDetails.get());
            return ResponseEntity.ok(new JwtResponse(token, "ROLE_STUDENT"));
        }

        // If no user found or credentials are incorrect
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid username or password.");
    }
}
