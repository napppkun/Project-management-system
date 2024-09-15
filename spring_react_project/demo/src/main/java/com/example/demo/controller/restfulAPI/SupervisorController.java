package com.example.demo.controller.restfulAPI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Supervisor;
import com.example.demo.service.SupervisorService;

@RestController
@RequestMapping("/api")
public class SupervisorController {
    @Autowired
    private SupervisorService supervisorService;

    @GetMapping("/supervisors")
    public ResponseEntity <List<Supervisor>> getAllSupervisors() {
        return ResponseEntity.ok(supervisorService.getAllSupervisors());
    }
    @GetMapping("/supervisors/{id}")
    public ResponseEntity <Supervisor> getSupervisorById(@PathVariable int id) {
        return ResponseEntity.ok(supervisorService.getSupervisorById(id));
    }
    @PostMapping("/supervisors")
    public ResponseEntity <Supervisor> addSupervisor(@RequestBody Supervisor supervisor) {
        return ResponseEntity.ok(supervisorService.addSupervisor(supervisor));
    }
    @PutMapping("/supervisors/{id}")
    public ResponseEntity <Supervisor> updateSupervisor(@RequestBody Supervisor supervisor, @PathVariable int id) {
        return ResponseEntity.ok(supervisorService.updateSupervisor(supervisor, id));
    }
    @DeleteMapping("/supervisors/{id}")
    public ResponseEntity <String> deleteSupervisorById(@PathVariable int id) {
        supervisorService.deleteSupervisorById(id);
        return ResponseEntity.ok("Supervisor deleted successfully");
    }
}
