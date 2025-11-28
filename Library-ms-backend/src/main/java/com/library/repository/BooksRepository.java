package com.library.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.model.Books;

@Repository
public interface BooksRepository extends JpaRepository<Books, UUID>{

	List<Books> findByTitleContaining(String query);

	List<Books> findByAuthorContaining(String query);
	Optional<Books> findById(UUID id);
	

	

}
