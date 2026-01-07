package com.spotjam.backend.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // ★ 추가

@Configuration
public class CorsConfig implements WebMvcConfigurer { // ★ implements 추가

    @Value("${cors.allowed.origins:https://spot-jam.vercel.app,http://localhost:3000}")
    private String origins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(origins.split("\\s*,\\s*"))
                .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
                .allowCredentials(true);
    }
}
