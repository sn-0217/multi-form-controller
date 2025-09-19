package com.multiform.app.service;

import com.multiform.app.entity.App;
import com.multiform.app.entity.Submission;
import com.multiform.app.exception.DuplicateResourceException;
import com.multiform.app.repository.AppRepository;
import com.multiform.app.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private AppRepository appRepository;

    /**
     * Create a submission for an app (only one submission per app allowed)
     */
    public Submission createSubmission(String appName, Submission submission) {
        App app = appRepository.findByAppName(appName)
                .orElseThrow(() -> new IllegalArgumentException("App not found: " + appName));

        // Check if submission already exists
        if (submissionRepository.findByApp(app).isPresent()) {
            throw new DuplicateResourceException("Submission already exists for app: " + appName);
        }

        submission.setApp(app);
        validateOtherWindow(submission);

        return submissionRepository.save(submission);
    }

    /**
     * Get submission by app name
     */
    public Submission getSubmissionByAppName(String appName) {
        App app = appRepository.findByAppName(appName)
                .orElseThrow(() -> new IllegalArgumentException("App not found: " + appName));

        return submissionRepository.findByApp(app)
                .orElseThrow(() -> new IllegalArgumentException("Submission not found for app: " + appName));
    }

    /**
     * Update submission by app name (partial update)
     */
    public Submission updateSubmission(String appName, Submission updatedSubmission) {
        Submission existing = getSubmissionByAppName(appName);

        if (updatedSubmission.getSubmitterName() != null) {
            existing.setSubmitterName(updatedSubmission.getSubmitterName());
        }
        if (updatedSubmission.getSubmitterEmailId() != null) {
            existing.setSubmitterEmailId(updatedSubmission.getSubmitterEmailId());
        }
        if (updatedSubmission.getSubmitterDecision() != null) {
            existing.setSubmitterDecision(updatedSubmission.getSubmitterDecision());
        }
        if (updatedSubmission.getSubmitterComments() != null) {
            existing.setSubmitterComments(updatedSubmission.getSubmitterComments());
        }
        if (updatedSubmission.getOtherStartWindow() != null) {
            existing.setOtherStartWindow(updatedSubmission.getOtherStartWindow());
        }
        if (updatedSubmission.getOtherEndWindow() != null) {
            existing.setOtherEndWindow(updatedSubmission.getOtherEndWindow());
        }

        validateOtherWindow(existing);

        return submissionRepository.save(existing);
    }

    /**
     * Delete submission by app name
     */
    public void deleteSubmission(String appName) {
        Submission existing = getSubmissionByAppName(appName);
        submissionRepository.delete(existing);
    }

    /**
     * Get all submissions
     */
    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    /**
     * Validate that if decision is OTHER, otherStartWindow and otherEndWindow must be provided
     */
    private void validateOtherWindow(Submission submission) {
        String decision = submission.getSubmitterDecision();
        if (!"APPROVED".equalsIgnoreCase(decision) && !"REJECTED".equalsIgnoreCase(decision)) {
            if (submission.getOtherStartWindow() == null || submission.getOtherEndWindow() == null) {
                throw new IllegalArgumentException(
                        "otherStartWindow and otherEndWindow must be provided when decision is OTHER");
            }
        } else {
            // Clear other windows if not needed
            submission.setOtherStartWindow(null);
            submission.setOtherEndWindow(null);
        }
    }
}
