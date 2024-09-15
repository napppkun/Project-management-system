package com.example.demo.controller.restfulAPI;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ProjectStudent;
import com.example.demo.service.ProjectStudentService;

@RestController
@RequestMapping("/api/project-students")
public class ProjectStudentController {
    @Autowired
    private ProjectStudentService projectStudentService;

    @PostMapping
    public ResponseEntity<ProjectStudent> addProjectStudent(@RequestParam int projectId, @RequestParam int studentId) {
        ProjectStudent projectStudent = projectStudentService.addProjectStudent(projectId, studentId);
        return ResponseEntity.ok(projectStudent);
    }
    @GetMapping("/project/{projectId}")
    public ResponseEntity<Set<ProjectStudent>> getProjectStudentsByProjectId(@PathVariable int projectId) {
        Set<ProjectStudent> projectStudents = projectStudentService.getProjectStudentsByProjectId(projectId);
        return ResponseEntity.ok(projectStudents);
    }
    @GetMapping("/student/{studentId}")
    public ResponseEntity<Set<ProjectStudent>> getProjectStudentsByStudentId(@PathVariable int studentId) {
        Set<ProjectStudent> projectStudents = projectStudentService.getProjectStudentsByStudentId(studentId);
        return ResponseEntity.ok(projectStudents);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeProjectStudent(@PathVariable int id) {
        projectStudentService.removeProjectStudent(id);
        return ResponseEntity.noContent().build();
    }

}
