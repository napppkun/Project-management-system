package com.example.demo.controller.restfulAPI;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.FileMetadata;
import com.example.demo.model.Project;
import com.example.demo.service.CourseService;
import com.example.demo.service.ProjectService;
import com.example.demo.service.SupervisorService;

@RestController
@RequestMapping("/api")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private SupervisorService supervisorService;

    @GetMapping("/projects")
    public ResponseEntity <List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    @GetMapping("/projects/{id}")
    public ResponseEntity <Project> getProjectById(@PathVariable int id) {
        return ResponseEntity.ok(projectService.getProjectsById(id));
    }
    @GetMapping("/course/{courseId}/projects/{projectId}")
    public ResponseEntity <Project> getProjectsByCourseId(@PathVariable int courseId, @PathVariable int projectId) {
        return ResponseEntity.ok().body(courseService.getCourseById(courseId).getProjects()
        .stream().filter(project -> project.getId() == projectId).findFirst().orElse(null));
    }
    @GetMapping("/supervisor/{supervisorId}/projects/{projectId}")
    public ResponseEntity <Project> getProjectsBySupervisorId(@PathVariable int supervisorId, @PathVariable int projectId) {
        return ResponseEntity.ok().body(supervisorService.getSupervisorById(supervisorId).getProjects()
        .stream().filter(project -> project.getId() == projectId).findFirst().orElse(null));
    }
    @PostMapping(value = "/course/{courseId}/supervisor/{supervisorId}/projects")
    public ResponseEntity <Project> addProject(@RequestBody Project project,@PathVariable int courseId, @PathVariable int supervisorId) throws IOException {
        try {            
            Project savedProject = projectService.addProject(project, courseId, supervisorId);
            return ResponseEntity.ok(savedProject);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/projects/{ProjectId}")
    public ResponseEntity<Project> updateProject(@RequestBody Project project,@PathVariable int ProjectId) {
        try {
            Project updatedProject = projectService.updateProject(project, ProjectId);
            if (updatedProject != null) {
                return new ResponseEntity<>(updatedProject, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity <String> deleteProjectById(@PathVariable int id) {
        projectService.deleteProjectById(id);
        return ResponseEntity.ok("Project deleted successfully");
    }


    @GetMapping("/projects/{id}/files/proposal")
    public ResponseEntity<byte[]> getProposalFile(@PathVariable int id) {
        byte[] file = projectService.getProposalFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"proposal.pdf\"")
                .body(file);
    }

    @GetMapping("/projects/{id}/files/fulldocument")
    public ResponseEntity<byte[]> getFullDocumentFile(@PathVariable int id) {
        byte[] file = projectService.getFullDocumentFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"fullDocument.pdf\"")
                .body(file);
    }

    @GetMapping("/projects/{id}/files/image")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {
        byte[] image = projectService.getImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }
    /* 
    @PostMapping("/projects/{id}/upload")
    public ResponseEntity<String> uploadFile(
            @PathVariable("id") int projectId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("fileType") String fileType) {
        try {
            projectService.uploadFile(projectId, file, fileType);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }*/
    @PostMapping("/projects/{id}/upload")
    public ResponseEntity<String> uploadFiles(
            @PathVariable int id,
            @RequestParam(value = "proposal", required = false) MultipartFile proposal,
            @RequestParam(value = "fulldocument", required = false) MultipartFile fulldocument,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            Map<String, MultipartFile> files = new HashMap<>();
            if (proposal != null) files.put("proposal", proposal);
            if (fulldocument != null) files.put("fulldocument", fulldocument);
            if (image != null) files.put("image", image);

            projectService.uploadFiles(id, files);
            return new ResponseEntity<>("Files uploaded successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid file type: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found: " + e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }    

    /* 
    @GetMapping("/projects/{id}/download")
    public ResponseEntity<byte[]> downloadFile(@PathVariable int id) {
        try {
            return projectService.downloadFile(id);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(("File not found: " + e.getMessage()).getBytes());
        }
    }*/
    @GetMapping("/projects/{projectId}/download")
    public ResponseEntity<List<FileMetadata>> getFileMetadata(@PathVariable int projectId) {
        try {
            List<FileMetadata> fileMetadataList = projectService.getFileMetadata(projectId).getBody();
            if (fileMetadataList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(fileMetadataList);
        } catch (RuntimeException e) {
            // Handling error when project is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



}
