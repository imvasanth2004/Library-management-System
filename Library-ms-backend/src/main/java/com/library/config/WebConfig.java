package com.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

	@Bean
	public CorsFilter corsFilter() {
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.addAllowedOrigin("http://localhost:3000"); 
	    config.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, etc.)
	    config.addAllowedHeader("*"); // Allow all headers
	    config.setAllowCredentials(true); // Allow cookies/authentication headers

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config); 
	    return new CorsFilter(source);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOrigins("http://localhost:5173", "http://localhost:3000")
	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                    .allowedHeaders("*")
	                    .allowCredentials(true);
	        }
	    };
	}

}



