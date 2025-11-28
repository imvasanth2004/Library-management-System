package com.library.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "borrow_history")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BorrowHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Books book;

    @Column(nullable = false)
    private LocalDateTime borrowedDate;

    private LocalDateTime returnedDate;

    @Version
    private int version; 

    // Optimistic Locking field
   // This field will track the version of the entity
}
