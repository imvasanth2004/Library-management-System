package com.library.dto;

public class JwtResponse {
    private String token;
    private Object userData;

    public JwtResponse(String token, Object userData) {
        this.token = token;
        this.userData = userData;
    }

    public String getToken() {
        return token;
    }

    public Object getUserData() {
        return userData;
    }
}
