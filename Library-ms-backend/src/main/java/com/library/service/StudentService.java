package com.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.library.exception.UserNotFoundException;
import com.library.model.Student;
import com.library.repository.StudentRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


	@Service
	public class StudentService {

	    @Autowired
	    private StudentRepository studentRepository;

	    @Autowired
	    private PasswordEncoder passwordEncoder;

	    public Student createStudent(Student student) {
	       
	        student.setRole("ROLE_STUDENT");

	        
	        student.setPassword(passwordEncoder.encode(student.getPassword()));

	       
	        String currentTimestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	        student.setCreatedAt(currentTimestamp);
	        student.setUpdatedAt(currentTimestamp);

	        return studentRepository.save(student);
	    }

		
		
		public List<Student> getStduents(){
	    	return studentRepository.findAll();
	    }
		public boolean isUsernameTaken(String username) {
		    return studentRepository.existsByUsername(username);
		}
		
		public Student findByUserName(String username) {
	        return studentRepository.findByUsername(username)
	            .orElseThrow(() -> new RuntimeException("Student not found with username: " + username));
	    }
		
		
		public void addBorrowedBook(String username, UUID bookId) {
	        Student student = findByUserName(username);
	        if (student != null) {
	            student.getBorrowedBooks().add(bookId);
	            studentRepository.save(student); // Persist the updated student record
	        }
	    }

	    public void removeBorrowedBook(String username, UUID bookId) {
	        Student student = findByUserName(username);
	        if (student != null) {
	            student.getBorrowedBooks().remove(bookId);
	            studentRepository.save(student); // Persist the updated student record
	        }
	    }



	    public Optional findById(UUID id) {
	        // Use `findById` to avoid issues if the entity does not exist
	        return studentRepository.findById(id);
	               
	    }
	}
