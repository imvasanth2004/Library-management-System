package com.library.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.library.model.Student;
import com.library.repository.StudentRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    // Method to map student to UserDetails
    private UserDetails mapStudentToUserDetails(Student student) {
        if (student == null) {
            throw new UsernameNotFoundException("Student not found");
        }

        // If student.getRole() is a single role as a String, directly map it to SimpleGrantedAuthority
        GrantedAuthority authority = new SimpleGrantedAuthority( student.getRole());

        logger.info("Student found: {}", student);
        logger.info("Student authority: {}", authority);

        return new User(student.getUsername(), student.getPassword(), List.of(authority));
    }

    // Method to handle admin user
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.equals(adminUsername)) {
            logger.info("Admin user loaded: {}", username);
            return User.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword)) // Ensure password is encoded
                    .roles("ADMIN")
                    .build();
        }

        // Load student by username
        Optional<Student> student = studentRepository.findByUsername(username);
        return student.map(this::mapStudentToUserDetails)
                      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
