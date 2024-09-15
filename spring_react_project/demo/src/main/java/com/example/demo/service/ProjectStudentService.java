package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Project;
import com.example.demo.model.ProjectStudent;
import com.example.demo.model.Student;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.ProjectStudentRepository;
import com.example.demo.repository.StudentRepository;

@Service
public class ProjectStudentService {    
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ProjectStudentRepository projectStudentRepository;

    public ProjectStudent addProjectStudent(int projectId, int studentId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<Student> studentOpt = studentRepository.findById(studentId);

        if (projectOpt.isPresent() && studentOpt.isPresent()) {
            Project project = projectOpt.get();
            Student student = studentOpt.get();

            ProjectStudent projectStudent = new ProjectStudent();
            projectStudent.setProject(project);
            projectStudent.setStudent(student);
            projectStudent.setSubmissionDate(LocalDateTime.now());

            return projectStudentRepository.save(projectStudent);
        } else {
            throw new RuntimeException("Project or Student not found");
        }
    }

    public void removeProjectStudent(int projectStudentId) {
        projectStudentRepository.deleteById(projectStudentId);
    }

    public Set<ProjectStudent> getProjectStudentsByProjectId(int projectId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        if (projectOpt.isPresent()) {
            return projectOpt.get().getProjectStudents();
        } else {
            throw new RuntimeException("Project not found");
        }
    }
    public Set<ProjectStudent> getProjectStudentsByStudentId(int studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isPresent()) {
            return studentOpt.get().getProjectStudents();
        } else {
            throw new RuntimeException("Student not found");
        }
    }
}
