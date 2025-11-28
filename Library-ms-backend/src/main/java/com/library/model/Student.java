package com.library.model;

import jakarta.persistence.Id;





import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;



@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "users")
public class Student {

    @Id
    @GeneratedValue
    private UUID id;
    
    @Column(nullable = false)
    private String studentEnrollNo;
    
    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private Long mobile;
   
    private String role;

    @Column(nullable = false, updatable = false)
    private String createdAt;

    @Column(nullable = false)
    private String updatedAt;
    
    
    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<BorrowHistory> borrowHistory;
    
    @ElementCollection
    private List<UUID> borrowedBooks = new ArrayList<>();
}

