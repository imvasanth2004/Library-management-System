package com.library.dto;


import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BorrowHistoryDTO {
    private UUID id;
    private String title;
    private LocalDateTime borrowDate;
    private LocalDateTime returnDate;

    // Constructor, Getters, and Setters
}

