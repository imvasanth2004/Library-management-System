package com.library.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "books")
public class Books {

    @Id
    @GeneratedValue
    private UUID id; 
    
    private String bookId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String status; // 'available' or 'borrowed'

    @Column(nullable = false)
    private Integer publishedYear;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; 

    @Column(nullable = false)
    private LocalDateTime updatedAt; 
    
    @Column(nullable = false)
    private Integer quantity;
    
    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BorrowHistory> borrowHistory;

    @Version
    private int version;


}
