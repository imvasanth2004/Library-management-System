package com.library.jwt;

import com.fasterxml.jackson.annotation.JsonView;
import com.library.model.JsonResoponse_View;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    @JsonView(JsonResoponse_View.BasicView.class)
    private String token;
    
    @JsonView(JsonResoponse_View.BasicView.class)
    private Object userData; // Can be Trainer, Student, or any user details
}




