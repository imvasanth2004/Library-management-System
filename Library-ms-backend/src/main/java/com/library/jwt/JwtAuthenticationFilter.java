package com.library.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    @Lazy
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if (requestHeader == null || !requestHeader.startsWith("Bearer ")) {
            logger.warn("JWT token does not begin with Bearer String. Token: " + requestHeader);
            filterChain.doFilter(request, response);
            return;
        }

        token = requestHeader.substring(7);
        try {
            username = jwtHelper.getUsernameFromToken(token);  
            logger.info("Username extracted from token: {}", username);
        } catch (Exception e) {
            logger.error("JWT parsing error", e);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            boolean isTokenValid = jwtHelper.validateToken(token, userDetails);

            if (isTokenValid) {
                logger.info("JWT token is valid. Authorities: {}", userDetails.getAuthorities());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Roles: " + authentication.getAuthorities());
            } else {
                logger.warn("JWT token validation failed");
            }
        }

        filterChain.doFilter(request, response);
    }

    
}
