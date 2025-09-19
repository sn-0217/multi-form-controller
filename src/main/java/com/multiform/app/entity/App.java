package com.multiform.app.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.multiform.app.helper.HostConverter;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class App {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Long appId;

    private String appStatus;
    @Column(unique = true)
    private String appName;
    private String owner;
    private String teamDl;

    private String changeNo;   // <-- New field

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startWindow;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endWindow;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = HostConverter.class)
    private List<String> hostNames;
}
