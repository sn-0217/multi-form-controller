package com.multiform.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "submission")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, updatable = false)
    private Long submissionId;

    @OneToOne
    @JoinColumn(name = "app_id", unique = true, nullable = false)
    private App app;

    @Column(nullable = false)
    private String submitterName;

    @Column(nullable = false)
    private String submitterEmailId;

    // APPROVED, REJECTED, OTHER
    @Column(nullable = false)
    private String submitterDecision;

    @Column(length = 1000)
    private String submitterComments;

    // Only used if submitterDecision = OTHER
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime otherStartWindow;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime otherEndWindow;
}
