package com.library.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.library.model.Student;
import com.library.repository.StudentRepository;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtHelper jwtHelper;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    // Authenticate Admin and generate token
    public String authenticateAdmin(String username, String password) {
        if (username.equals(adminUsername) && password.equals(adminPassword)) {
            // Return token for admin
            UserDetails adminUser = User.builder()
                    .username(adminUsername)
                    .password(adminPassword) // Ideally, this should be an encoded password
                    .roles("ADMIN")
                    .build();
            System.out.println("Login successful with role: ADMIN"); // Log role
            return jwtHelper.generateToken(adminUser);
        }
        throw new RuntimeException("Invalid admin credentials");
    }

    // Generate JWT token for users (Admin and Student)
    public String generateToken(UserDetails userDetails) {
        return jwtHelper.generateToken(userDetails);
    }

    // Get UserDetails by username (Student or Admin)
    public UserDetails getUserDetails(String username) {
        if (username.equals(adminUsername)) {
            return getAdminUserDetails();  // Admin details
        } else {
            Optional<Student> student = studentRepository.findByUsername(username); // Find student
            if (student.isPresent()) {
                return getStudentUserDetails(student.get()); // Student details
            }
        }
        throw new RuntimeException("User not found");
    }

    // Admin UserDetails
    private UserDetails getAdminUserDetails() {
        return User.builder()
                .username(adminUsername)
                .password(adminPassword) 
                .roles("ADMIN")
                .build();
    }

    // Student UserDetails
    private UserDetails getStudentUserDetails(Student student) {
        return User.builder()
                .username(student.getUsername())
                .password(student.getPassword()) // This password is encoded in DB
                .roles("STUDENT")
                .build();
    }

    // Check student credentials
    public Optional<UserDetails> findStudentByUsernameAndPassword(String username, String password) {
        return studentRepository.findByUsername(username)
                .filter(student -> new BCryptPasswordEncoder().matches(password, student.getPassword())) // Check password with encoder
                .map(student -> {
                    System.out.println("Login successful with role: STUDENT"); 
                    return User.builder()
                            .username(student.getUsername())
                            .password(student.getPassword())
                            .roles("STUDENT")
                            .build();
                });
    }
}
