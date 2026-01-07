package com.spotjam.backend.domain.upload.application;

import com.spotjam.backend.domain.upload.dto.UploadResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.UUID;

@Service
public class UploadService {

    private final Path uploadDir = Paths.get("uploads");

    public UploadResponse upload(MultipartFile file) {
        try {
            Files.createDirectories(uploadDir);

            String ext = getExt(file.getOriginalFilename());
            String filename = UUID.randomUUID() + ext;
            Path target = uploadDir.resolve(filename);

            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            return new UploadResponse("/uploads/" + filename);
        } catch (Exception e) {
            throw new RuntimeException("파일 업로드 실패", e);
        }
    }

    private String getExt(String name) {
        if (name == null) return "";
        int idx = name.lastIndexOf(".");
        return idx > -1 ? name.substring(idx) : "";
    }
}
