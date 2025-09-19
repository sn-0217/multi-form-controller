package com.multiform.app.controller;

import com.multiform.app.entity.Submission;
import com.multiform.app.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    // Create submission for a given appName
    @PostMapping("/{appName}")
    public ResponseEntity<Submission> createSubmission(
            @PathVariable String appName,
            @RequestBody Submission submission) {
        return ResponseEntity.ok(submissionService.createSubmission(appName, submission));
    }

    // Get submission by appName
    @GetMapping("/{appName}")
    public ResponseEntity<Submission> getSubmission(@PathVariable String appName) {
        return ResponseEntity.ok(submissionService.getSubmissionByAppName(appName));
    }

    // Update submission by appName (partial)
    @PutMapping("/{appName}")
    public ResponseEntity<Submission> updateSubmission(
            @PathVariable String appName,
            @RequestBody Submission updatedSubmission) {
        return ResponseEntity.ok(submissionService.updateSubmission(appName, updatedSubmission));
    }

    // Delete submission by appName
    @DeleteMapping("/{appName}")
    public ResponseEntity<Void> deleteSubmission(@PathVariable String appName) {
        submissionService.deleteSubmission(appName);
        return ResponseEntity.noContent().build();
    }

    // Get all submissions
    @GetMapping
    public ResponseEntity<List<Submission>> getAllSubmissions() {
        return ResponseEntity.ok(submissionService.getAllSubmissions());
    }
}
