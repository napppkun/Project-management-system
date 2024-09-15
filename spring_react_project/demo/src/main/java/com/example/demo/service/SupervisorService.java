package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Supervisor;
import com.example.demo.repository.SupervisorRepository;

@Service
public class SupervisorService {
    @Autowired
    private SupervisorRepository supervisorRepository;

    public SupervisorService(SupervisorRepository supervisorRepository) {
        this.supervisorRepository = supervisorRepository;
    }
    public List<Supervisor> getAllSupervisors() {
        return (List<Supervisor>) supervisorRepository.findAll();
    }
    public Supervisor getSupervisorById(int id) {
        return supervisorRepository.findById(id).orElse(null);
    }
    public Supervisor save(Supervisor supervisor) {
        return supervisorRepository.save(supervisor);
    }
    public Supervisor addSupervisor(Supervisor supervisor) {
        return supervisorRepository.save(supervisor);
    }
    public Supervisor updateSupervisor(Supervisor supervisor, int id) {
        Supervisor existingSupervisor = supervisorRepository.findById(id).orElse(null);
        existingSupervisor.setName(supervisor.getName());
        existingSupervisor.setEmail(supervisor.getEmail());        
        existingSupervisor.setProjects(supervisor.getProjects());
        return supervisorRepository.save(existingSupervisor);
    }
    public void deleteSupervisorById(int id) {
        supervisorRepository.deleteById(id);        
    }
}
