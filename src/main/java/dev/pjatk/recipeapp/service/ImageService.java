package dev.pjatk.recipeapp.service;

import com.google.common.io.Files;
import dev.pjatk.recipeapp.util.Loggable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class ImageService implements Loggable {

    private final Path root;

    public ImageService(@Value("${recipe.app-dir}") String root) {
        this.root = Path.of(root);
    }

    public String saveImage(MultipartFile image) {
        try {
            var extension = Files.getFileExtension(image.getOriginalFilename());
            var name = "%s.%s".formatted(UUID.randomUUID(), extension);
            var path = root.resolve(name);
            path.toFile().createNewFile();
            image.transferTo(path);
            return name;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void removeImage(String fileName) {
        var path = root.resolve(fileName);
        if (path.toFile().delete()) {
            log().info("File {} deleted successfully", fileName);
        } else {
            log().error("File {} not found", fileName);
            throw new CannotDeleteFileException(fileName);
        }
    }

    public static class CannotDeleteFileException extends RuntimeException {
        public CannotDeleteFileException(String fileName) {
            super("Cannot delete file: " + fileName);
        }
    }
}
