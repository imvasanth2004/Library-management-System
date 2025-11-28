package com.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.library.model.Books;
import com.library.model.BorrowHistory;
import com.library.model.Student;
import com.library.repository.BooksRepository;
import com.library.repository.BorrowHistoryRepository;



import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BooksRepository booksRepository;
    
    @Autowired
    private BorrowHistoryService borrowHistoryService;

   @Autowired
   private BorrowHistoryRepository borrowHistoryRepository;
    public List<Books> getAllBooks() {
        return booksRepository.findAll();
    }

   
    @Transactional
    public Books addBook(Books book) {
        
        book.setCreatedAt(LocalDateTime.now()); 
        book.setUpdatedAt(LocalDateTime.now()); 
        return booksRepository.save(book);
    }

    // Update an existing book
    public Books updateBook(UUID id, Books bookDetails) {
        Books book = booksRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Book not found with id: " + id)
        );
        book.setId(bookDetails.getId());
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPublishedYear(bookDetails.getPublishedYear());
        book.setQuantity(bookDetails.getQuantity());
        book.setUpdatedAt(LocalDateTime.now()); // Updated time
        return booksRepository.save(book);
    }

   
    public void deleteBook(UUID id) {
        if (!booksRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id: " + id);
        }
       
        booksRepository.deleteById(id);
        System.out.println("book deleted");
    }

    // Get a book by ID
    public Books getBook(UUID id) {
        return booksRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }
    
    public Books updateBookStatus(UUID id, String status) {
       
        Books book = booksRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Book not found with id: " + id)
        );

        
        book.setStatus(status);
        book.setUpdatedAt(LocalDateTime.now());

        // Save the updated book
        return booksRepository.save(book);
    }

    public Books findById(UUID id) {
        System.out.println("Finding book with ID: " + id);
        Books book = booksRepository.findById(id).orElse(null);
        System.out.println("Found book: " + book);
        return book;
    } 
    


    
    @Transactional(rollbackFor = Throwable.class)
    public void borrowBook(UUID id, Student student) {
        // Fetch the book from the repository
        Books book = booksRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        // Check if the book is available
        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book not available for borrowing.");
        }

        // Decrement the book quantity
        book.setQuantity(book.getQuantity() );

        // Update book status based on remaining quantity
        book.setStatus(book.getQuantity() > 0 ? "Available" : "borrowed");

        // Save the updated book record
        booksRepository.save(book);

        // Create a borrow history record
        BorrowHistory borrowHistory = new BorrowHistory();
        borrowHistory.setBook(book);
        borrowHistory.setStudent(student);
        borrowHistory.setBorrowedDate(LocalDateTime.now());

        // Save the borrow history
        borrowHistoryService.saveBorrowHistory(borrowHistory);
    }

    @Transactional
    public void returnBook(UUID id, Student student) {
        // Find the latest borrow history for the given book and student
        BorrowHistory history = borrowHistoryService.findLatestBorrowRecordByBookIdAndStudent(id, student);

        // Check if borrow history is found
        if (history == null) {
            throw new RuntimeException("No active borrow history found for this book.");
        }

        // Get the book associated with this borrow history
        Books book = history.getBook();
        if (book == null) {
            throw new RuntimeException("Book not found for the borrow history.");
        }

        // Increase the book quantity by 1
        book.setQuantity(book.getQuantity() );

        // Save the updated book back to the database
        booksRepository.save(book);

        // Update the borrow history (could be marking it as 'returned' or updating the return date)
        history.setReturnedDate(LocalDateTime.now()); // Assuming you have a return date field
        borrowHistoryService.updateBorrowHistory(history); // Update borrow history with the return date
    }




    public List<Books> getBorrowedBooksByStudent(Student student) {
        // Assuming student.getBorrowedBooks() contains a list of book IDs
        List<UUID> borrowedBookIds = student.getBorrowedBooks();
        return booksRepository.findAllById(borrowedBookIds);
    }
 }

