package com.library.dto;
import java.util.UUID;
public class BookDTO {
    private UUID id;
    private String title;
    private String author;
    private String status;
    private UUID borrowedById; 

    
    public BookDTO(UUID id, String title, String author, String status, UUID borrowedById) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.status = status;
        this.borrowedById = borrowedById;
    }

   
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UUID getBorrowedById() {
        return borrowedById;
    }

    public void setBorrowedById(UUID borrowedById) {
        this.borrowedById = borrowedById;
    }
}

