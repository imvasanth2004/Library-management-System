package com.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.model.Books;
import com.library.model.Student;
import com.library.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @PostMapping("/register")
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        // Check if the username already exists
        if (studentService.isUsernameTaken(student.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Username is already taken. Please choose a different one.");
        }

        // Proceed with creating the student if the username is not taken
        Student createdStudent = studentService.createStudent(student);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    
    @GetMapping("/getStudents")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getStduents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

}
