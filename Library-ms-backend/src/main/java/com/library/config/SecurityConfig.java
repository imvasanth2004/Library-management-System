package com.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.library.jwt.JwtAuthenticationEntryPoint;
import com.library.jwt.JwtAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // BCrypt Password Encoder Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager Bean for managing user authentication
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Security Filter Chain with custom JWT filter and role-based access control
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()  // Disabling CSRF for stateless authentication
            .authorizeRequests(authorize -> authorize
                
                .requestMatchers("/auth/**", "/students/register","/error").permitAll()  // Allow login, registration, etc., without authentication
                 // Anyone can view books without login (if needed)

                // Role-based access for logged-in users
                 // Admin can perform CRUD on books
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/books/viewBooks", "books/{id}/status","books/{id}/borrow","books/{id}/return","books/borrowHistory" ).hasAnyRole( "STUDENT","ADMIN") 
                .requestMatchers("/books/getBooks", "students/getStudents","/error","books/history","books/borrowed").hasAnyRole( "ADMIN") 
                .requestMatchers("/books/**").hasAuthority("ROLE_ADMIN")
// Students and admins can view books
//                .requestMatchers("/books/**").hasRole("ADMIN") 
                
                .anyRequest().authenticated()  
            )
            .exceptionHandling(exception -> 
                exception.authenticationEntryPoint(jwtAuthenticationEntryPoint) // Handle unauthorized access
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless authentication
            );

        // Add the JWT filter before the UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
