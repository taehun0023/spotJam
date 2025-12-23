package com.spotjam.backend.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/_health")
    public Map<String, Object> health() {
        return Map.of(
            "status", "ok",
            "ts", System.currentTimeMillis()
        );
    }
    
}
