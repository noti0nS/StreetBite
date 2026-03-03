package com.snackinback.sb_api.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // permite CORS em todas as rotas
                .allowedOrigins("http://127.0.0.1:5500") // sua origem permitida
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // métodos permitidos
                .allowedHeaders("*"); // permite todos os cabeçalhos
    }
}
