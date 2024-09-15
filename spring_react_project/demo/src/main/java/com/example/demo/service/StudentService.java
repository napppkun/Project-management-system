package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.StudentRepository;
import com.example.demo.model.Student;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return (List<Student>) studentRepository.findAll();
    }
    public Student getStudentById(int id) {
        return studentRepository.findById(id).orElse(null);
    }
    public Student save(Student student) {
        return studentRepository.save(student);
    }
    public Student addStudent(Student student){
        return studentRepository.save(student);        
    }
    public Student updateStudent(Student student, int id) {
        Student existingStudent = studentRepository.findById(id).orElse(null);
        existingStudent.setName(student.getName());        
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPassword(student.getPassword());
        existingStudent.setProjectStudents(student.getProjectStudents());
        return studentRepository.save(existingStudent);
    }
    public void deleteStudentById(int id) {
        studentRepository.deleteById(id);        
    }
}
