package com.library.repository;

import com.library.model.Books;
import com.library.model.BorrowHistory;
import com.library.model.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface BorrowHistoryRepository extends JpaRepository<BorrowHistory, UUID> {
	
	BorrowHistory findTopByBookOrderByBorrowedDateDesc(Books book);

	BorrowHistory findFirstByBookIdAndReturnedDateIsNull(UUID id);

	boolean existsByBookIdAndStudentUsername(UUID id, String username);

	BorrowHistory findFirstByBookIdAndStudentAndReturnedDateIsNull(UUID id, Student student);
	
	@Query("SELECT bh FROM BorrowHistory bh WHERE bh.student.id = :id AND bh.returnedDate IS NULL")
    List<BorrowHistory> findBorrowedBooksByStudentId(@Param("id") UUID id);

	Optional<BorrowHistory> findByStudent(Student student);
	
	List<BorrowHistory> findByStudentId(UUID id);


	@Query("SELECT bh FROM BorrowHistory bh WHERE bh.book.id = :id AND bh.student.username = :username AND bh.returnedDate IS NULL")
	BorrowHistory findActiveBorrowHistory(@Param("id") UUID id, @Param("username") String username);

	 Optional<BorrowHistory> findTopByBookIdAndStudentOrderByBorrowedDateDesc(UUID id, Student student);

}
