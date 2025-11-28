package com.library.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.library.dto.BorrowHistoryDTO;
import com.library.model.Books;
import com.library.model.BorrowHistory;
import com.library.model.Student;
import com.library.repository.BooksRepository;
import com.library.repository.BorrowHistoryRepository;

@Service
@Transactional
public class BorrowHistoryService {

    @Autowired
    private BorrowHistoryRepository borrowHistoryRepository;
    
    @Autowired
    private BooksRepository booksRepository;

    
   
    
    @Transactional(rollbackFor = Throwable.class, propagation = Propagation.REQUIRED)
    public void saveBorrowHistory(BorrowHistory borrowHistory) {
        Books book = borrowHistory.getBook();
        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book not available for borrowing.");
        }

        // Decrement quantity and update book status
        book.setQuantity(book.getQuantity() - 1);
        book.setStatus(book.getQuantity() > 0 ? "Available" : "borrowed");
        booksRepository.save(book);

        // Save the borrow history
        borrowHistoryRepository.save(borrowHistory);
    }


    
    public BorrowHistory findLatestBorrowRecordByBook(Books book) {
        return borrowHistoryRepository.findTopByBookOrderByBorrowedDateDesc(book);
    }

//    @Transactional(rollbackFor = {Throwable.class}, propagation = Propagation.REQUIRED)
//    public void updateBorrowHistory(BorrowHistory borrowHistory) {
//        BorrowHistory existingBorrowHistory = borrowHistoryRepository.findById(borrowHistory.getId())
//            .orElseThrow(() -> new RuntimeException("Borrow history not found."));
//
//        Books book = existingBorrowHistory.getBook();
//
//        // Increment quantity and update book
//        book.setQuantity(book.getQuantity() + 1);
//        book.setStatus("Available");
//        booksRepository.save(book);
//
//        // Update returned date
//        existingBorrowHistory.setReturnedDate(LocalDateTime.now());
//        borrowHistoryRepository.save(existingBorrowHistory);
//    }
//    
    
    public List<BorrowHistory> getBorrowedBooks(UUID id) {
        return borrowHistoryRepository.findBorrowedBooksByStudentId(id);
    }
    public List<BorrowHistoryDTO> getBorrowedBooksForStudent(UUID id) {
        return borrowHistoryRepository.findByStudentId(id)
            .stream()
            .map(history -> new BorrowHistoryDTO(
                history.getId(),
                history.getBook().getTitle(),
                history.getBorrowedDate(),
                history.getReturnedDate()
            ))
            .collect(Collectors.toList());
    }
    
    public void returnBook(UUID id, String username) {
        // Fetch the active borrow history
        BorrowHistory borrowHistory = borrowHistoryRepository.findActiveBorrowHistory(id, username);

        if (borrowHistory == null) {
            throw new RuntimeException("No active borrow history found for this book.");
        }

        // Get the associated book
        Books book = borrowHistory.getBook();
        if (book == null) {
            throw new RuntimeException("Book not found for the borrow history.");
        }

        // Update the book's quantity
        book.setQuantity(book.getQuantity() + 1);
        booksRepository.save(book);

        // Mark the borrow history as returned
        borrowHistory.setReturnedDate(LocalDateTime.now());
        borrowHistoryRepository.save(borrowHistory);
    }
    
    public BorrowHistory findLatestBorrowRecordByBookIdAndStudent(UUID bookId, Student student) {
        return borrowHistoryRepository
            .findTopByBookIdAndStudentOrderByBorrowedDateDesc(bookId, student)
            .orElse(null);
    }

    public void updateBorrowHistory(BorrowHistory history) {
        borrowHistoryRepository.save(history);
    }

    public List<BorrowHistory> getAllBorrowBooks(){
    	return borrowHistoryRepository.findAll();
    }
}
