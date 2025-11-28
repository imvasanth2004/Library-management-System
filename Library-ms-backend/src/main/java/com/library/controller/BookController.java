package com.library.controller;


import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.*;

import com.library.dto.BorrowHistoryDTO;
import com.library.jwt.JwtHelper;
import com.library.jwt.JwtUtil;
import com.library.model.Books;
import com.library.model.BorrowHistory;
import com.library.model.Student;
import com.library.repository.BooksRepository;
import com.library.repository.BorrowHistoryRepository;
import com.library.repository.StudentRepository;
import com.library.service.BookService;
import com.library.service.BorrowHistoryService;
import com.library.service.StudentService;


import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private BorrowHistoryRepository borrowHistoryRepository;
    @Autowired
    private BorrowHistoryService borrowHistoryService;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private JwtHelper jwtHelper;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private BooksRepository booksRepository;
   
    @Secured("ROLE_ADMIN")
    @PostMapping("/create")
    public ResponseEntity<Books> createBook(@RequestBody Books books) {
        Books createdBook = bookService.addBook(books);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

   
    @Secured("ROLE_ADMIN")
    @PutMapping("/update/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable UUID id, @RequestBody Books books) {
        Books updatedBook = bookService.updateBook(id, books);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable UUID id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Books> getBook(@PathVariable UUID id) {
        Books book = bookService.getBook(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

   
    @GetMapping("/getBooks")
    
    public ResponseEntity<List<Books>> getAllBooks() {
        List<Books> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    
    @GetMapping("/viewBooks")
      public ResponseEntity<List<Books>> getBooks() {
        List<Books> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    
    


    

    
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateBookStatus(@PathVariable UUID id, @RequestParam String status) {
        // Validate the status
        if (!isValidStatus(status)) {
            return ResponseEntity.badRequest().body("Invalid status value: " + status);
        }

        try {
            
            Books updatedBook = bookService.updateBookStatus(id, status);
            return ResponseEntity.ok(updatedBook);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private boolean isValidStatus(String status) {
        List<String> validStatuses = Arrays.asList("Available", "borrowed");
        return validStatuses.contains(status);
    }

     
    @GetMapping("/borrowHistory")
    public ResponseEntity<List<BorrowHistoryDTO>> getBorrowedBook(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token);
        Student student = studentService.findByUserName(username);

        if (student == null || !"ROLE_STUDENT".equalsIgnoreCase(student.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        // Use the student's ID to get borrow history
        List<BorrowHistoryDTO> history = borrowHistoryService.getBorrowedBooksForStudent(student.getId());
        return ResponseEntity.ok(history);
    }
    @PatchMapping("/{id}/borrow")
    public ResponseEntity<?> borrowBook(@PathVariable UUID id, @RequestHeader("Authorization") String token) {
        try {
            String username = jwtUtil.extractUsername(token);
            Student student = studentService.findByUserName(username);

            if (student == null || !"ROLE_STUDENT".equalsIgnoreCase(student.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid student role.");
            }

            bookService.borrowBook(id, student); // Updates book status and student record
            studentService.addBorrowedBook(username, id); // Adds book to student's borrowedBooks list

            return ResponseEntity.ok("Book borrowed successfully.");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
    @PatchMapping("/{id}/return")
    public ResponseEntity<?> returnBook(@PathVariable UUID id, @RequestHeader("Authorization") String token) {
        try {
            String username = jwtUtil.extractUsername(token);
            Student student = studentService.findByUserName(username);

            if (student == null || !"ROLE_STUDENT".equalsIgnoreCase(student.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid student.");
            }

            bookService.returnBook(id, student); // Updates book status
            studentService.removeBorrowedBook(username, id); // Removes book from student's borrowedBooks list

            return ResponseEntity.ok("Book returned successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    
    

    @GetMapping("/borrowed")
    public ResponseEntity<?> getAllBorrowBooks(@RequestHeader("Authorization") String token) {
        try {
            // Extract JWT and username
            String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
            String username = jwtUtil.extractUsername(jwt);

            // Debugging logs
            System.out.println("Username: " + username);

            // Check if the user exists and their role
            Student user = studentService.findByUserName(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
            }
            System.out.println("Role: " + user.getRole());

            if (!"ROLE_ADMIN".equalsIgnoreCase(user.getRole().trim())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Only admins can view borrowed books.");
            }

            // Fetch all borrowed books
            List<BorrowHistory> allBorrowedBooks = borrowHistoryRepository.findAll();
            return ResponseEntity.ok(allBorrowedBooks);

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + ex.getMessage());
        }
    }


    @GetMapping("/history")
    public ResponseEntity<?> getBorrowHistory() {
        List<BorrowHistory> history = borrowHistoryRepository.findAll();
        return ResponseEntity.ok(history.stream().map(h -> {
            Map<String, Object> record = new HashMap<>();
            record.put("studentFullName", h.getStudent().getFullName());
            record.put("studentEnrollNo", h.getStudent().getStudentEnrollNo());
            record.put("bookTitle", h.getBook().getTitle());
            record.put("bookAuthor", h.getBook().getAuthor());
            record.put("borrowedDate", h.getBorrowedDate());
            record.put("returnedDate", h.getReturnedDate());
            return record;
        }).collect(Collectors.toList()));
    }



}
