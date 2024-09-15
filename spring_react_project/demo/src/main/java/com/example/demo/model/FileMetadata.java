package com.example.demo.model;

public class FileMetadata {
    private String filename;
    private String filePath;

    // Constructor
    public FileMetadata(String filename, String filePath) {
        this.filename = filename;
        this.filePath = filePath;
    }

    // Getters and setters
    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
