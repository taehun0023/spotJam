package com.spotjam.backend.domain.upload.api;

import com.spotjam.backend.domain.upload.application.UploadService;
import com.spotjam.backend.domain.upload.dto.UploadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
public class UploadController {

    private final UploadService uploadService;

    @PostMapping
    public UploadResponse upload(@RequestParam("file") MultipartFile file) {
        return uploadService.upload(file);
    }
}
