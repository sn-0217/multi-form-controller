package com.multiform.app.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.Getter;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
