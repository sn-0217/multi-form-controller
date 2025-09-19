//// Environment configuration from localStorage
//let currentEnv;
//
//document.addEventListener('DOMContentLoaded', () => {
//    // Get environment from localStorage
//    const currentEnv = localStorage.getItem('currentEnv');
//
//    // Set environment indicator
//    const envIndicator = document.getElementById('currentEnv');
//    if (envIndicator) {
//      envIndicator.textContent = currentEnv;
//    }
//
//    // Get app name from URL query parameter
//    const urlParams = new URLSearchParams(window.location.search);
//    const appName = urlParams.get('app');
//
//    // Handle case when no app is selected
//    if (!appName) {
//      // Hide the main content
//      const mainContent = document.querySelector('.container');
//      if (mainContent) {
//        mainContent.style.display = 'none';
//      }
//
//      // Create error container
//      const errorContainer = document.createElement('div');
//      errorContainer.className = 'error-container';
//      errorContainer.innerHTML = `
//        <div class="error-content">
//          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-x">
//              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
//              <path d="m7.5 4.27 9 5.15"></path>
//              <polyline points="3.29 7 12 12 20.71 7"></polyline>
//              <line x1="12" y1="22" y2="12" x2="12"></line>
//              <path d="m17 13 5 5m-5 0 5-5"></path>
//          </svg>
//          <h2>No Application Selected</h2>
//          <p>Please select an application from the home page.</p>
//          <button class="return-btn" onclick="window.location.href='home.html'">Return to Home</button>
//        </div>
//      `;
//      document.body.appendChild(errorContainer);
//      return;
//    }
//
//    const appNameSpan = document.getElementById('app-name');
//    if (appNameSpan) {
//      appNameSpan.textContent = appName;
//    }
//
//    // Setup date-time inputs with validation
//    const startTimeInput = document.getElementById('start-time');
//    const endTimeInput = document.getElementById('end-time');
//    const form = document.querySelector('form');
//
//    // Function to get current date-time in local ISO format
//    function getCurrentDateTime() {
//      const now = new Date();
//      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//      return now.toISOString().slice(0, 16);
//    }
//
//    // Function to validate dates
//    function validateDates() {
//      const startTimeValue = startTimeInput.value;
//      const endTimeValue = endTimeInput.value;
//      const startTimeError = document.getElementById('start-time-error');
//      const endTimeError = document.getElementById('end-time-error');
//
//      // Clear previous errors and styles
//      startTimeInput.style.borderColor = '';
//      startTimeError.textContent = '';
//      startTimeError.style.display = 'none';
//      endTimeInput.style.borderColor = '';
//      endTimeError.textContent = '';
//      endTimeError.style.display = 'none';
//
//      // If EITHER date is empty, do not show errors yet for interactive validation.
//      if (!startTimeValue || !endTimeValue) {
//        return false; // Not valid for submission, but no interactive errors shown.
//      }
//
//      const startTime = new Date(startTimeValue);
//      const endTime = new Date(endTimeValue);
//      const now = new Date();
//      let isValid = true;
//
//      // Rule 1: Start date must be in the future
//      if (startTime <= now) {
//        startTimeInput.style.borderColor = '#dc2626';
//        startTimeError.textContent = 'Start time must be in the future';
//        startTimeError.style.display = 'block';
//        isValid = false;
//      }
//
//      // Rule 2: End date must be in the future
//      if (endTime <= now) {
//        endTimeInput.style.borderColor = '#dc2626';
//        endTimeError.textContent = 'End time must be in the future';
//        endTimeError.style.display = 'block';
//        isValid = false;
//      }
//
//      // Rule 3: End date must be after start date
//      if (endTime <= startTime) {
//        endTimeInput.style.borderColor = '#dc2626';
//        endTimeError.textContent = 'End time must be after start time';
//        endTimeError.style.display = 'block';
//        isValid = false;
//      }
//
//      return isValid;
//    }
//
//    // Set min attribute for both inputs to current date-time
//    if (startTimeInput && endTimeInput) {
//      const currentDateTime = getCurrentDateTime();
//      startTimeInput.min = currentDateTime;
//      endTimeInput.min = currentDateTime;
//
//      // Add validation on input
//      startTimeInput.addEventListener('input', () => {
//        if (startTimeInput.value) {
//          endTimeInput.min = startTimeInput.value;
//          if (endTimeInput.value && new Date(endTimeInput.value) <= new Date(startTimeInput.value)) {
//            endTimeInput.value = '';
//          }
//        } else {
//          const currentDateTime = getCurrentDateTime();
//          endTimeInput.min = currentDateTime;
//        }
//        // Only call validateDates if both fields have a value, to avoid premature error messages
//        if (startTimeInput.value && endTimeInput.value) {
//          validateDates();
//        } else {
//          // If one field is cleared, clear its specific error message and border
//          const startTimeError = document.getElementById('start-time-error');
//          startTimeInput.style.borderColor = '';
//          startTimeError.textContent = '';
//          startTimeError.style.display = 'none';
//          // Also clear end time error if start time is now empty and end time was dependent
//          if (!startTimeInput.value) {
//            const endTimeError = document.getElementById('end-time-error');
//            endTimeInput.style.borderColor = '';
//            endTimeError.textContent = '';
//            endTimeError.style.display = 'none';
//          }
//        }
//      });
//
//      endTimeInput.addEventListener('input', () => {
//        // Only call validateDates if both fields have a value
//        if (startTimeInput.value && endTimeInput.value) {
//          validateDates();
//        } else {
//          // If end field is cleared, clear its specific error message and border
//          const endTimeError = document.getElementById('end-time-error');
//          endTimeInput.style.borderColor = '';
//          endTimeError.textContent = '';
//          endTimeError.style.display = 'none';
//        }
//      });
//    }
//
//    // Setup timed button functionality
//    const timedBtn = document.querySelector('.decision-btn.timed');
//    const timedInfo = document.querySelector('.timed-info');
//
//    if (timedBtn && timedInfo) {
//      timedBtn.addEventListener('click', () => {
//        timedInfo.style.display = timedInfo.style.display === 'none' || timedInfo.style.display === '' ? 'block' : 'none';
//
//        // Initially both start and end date should be empty
//        if (timedInfo.style.display === 'block') {
//          // Clear any previous values
//          startTimeInput.value = '';
//          endTimeInput.value = '';
//
//          // Set min attribute to current date-time
//          const currentDateTime = getCurrentDateTime();
//          startTimeInput.min = currentDateTime;
//          endTimeInput.min = currentDateTime;
//        }
//      });
//    }
//
//    // Setup decision buttons to show selected state
//    const decisionBtns = document.querySelectorAll('.decision-btn');
//    decisionBtns.forEach(btn => {
//      btn.addEventListener('click', () => {
//        // If clicking the same button that's already selected, deselect it
//        if (btn.classList.contains('selected')) {
//          btn.classList.remove('selected');
//          if (btn.classList.contains('timed') && timedInfo) {
//            timedInfo.style.display = 'none';
//          }
//          return;
//        }
//
//        // Remove selected class from all buttons
//        decisionBtns.forEach(b => b.classList.remove('selected'));
//        // Add selected class to clicked button
//        btn.classList.add('selected');
//
//        // Show/hide timed info based on selection
//        if (timedInfo) {
//          if (btn.classList.contains('timed')) {
//            timedInfo.style.display = 'block';
//            // Show a warning toast when timed option is selected
//            showToast('warning', 'Timed Approval', 'Please set both start and end times for the approval window');
//          } else {
//            timedInfo.style.display = 'none';
//          }
//        }
//      });
//    });
//
//    // Add form submission validation
//    if (form) {
//      form.addEventListener('submit', (e) => {
//        e.preventDefault(); // Prevent default form submission
//
//        const selectedBtn = document.querySelector('.decision-btn.selected');
//        const approverName = document.getElementById('approver-name').value;
//        const comments = document.getElementById('comments').value;
//        const startTimeError = document.getElementById('start-time-error');
//        const endTimeError = document.getElementById('end-time-error');
//
//        // Validate required fields
//        if (!selectedBtn) {
//          showToast('error', 'Validation Error', 'Please select a decision (Approve, Reject, or Timed)');
//          return;
//        }
//
//        if (!approverName.trim()) {
//          showToast('error', 'Validation Error', 'Please enter approver name');
//          return;
//        }
//
//        const approverEmail = document.getElementById('approver-email').value;
//        if (!approverEmail.trim()) {
//          showToast('error', 'Validation Error', 'Please enter approver email');
//          return;
//        }
//
//        // Validate email format
//        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//        if (!emailRegex.test(approverEmail)) {
//          showToast('error', 'Validation Error', 'Please enter a valid email address');
//          return;
//        }
//
//        // If timed option is selected, validate dates
//        if (selectedBtn.classList.contains('timed')) {
//          let datesValid = true;
//          // Check if both dates are filled
//          if (!startTimeInput.value) {
//            startTimeInput.style.borderColor = '#dc2626';
//            startTimeError.textContent = 'Please select a start date and time';
//            startTimeError.style.display = 'block';
//            datesValid = false;
//          }
//          if (!endTimeInput.value) {
//            endTimeInput.style.borderColor = '#dc2626';
//            endTimeError.textContent = 'Please select an end date and time';
//            endTimeError.style.display = 'block';
//            datesValid = false;
//          }
//
//          // If both dates are filled, then run the full validation
//          if (startTimeInput.value && endTimeInput.value) {
//            if (!validateDates()) {
//              datesValid = false;
//            }
//          }
//
//          if (!datesValid) {
//            return;
//          }
//        }
//
//        // Prepare submission data
//        const submission = {
//          appName,
//          changeNo: changeData.changeNo,
//          approverName,
//          approverEmail,
//          decision: selectedBtn.classList.contains('approve') ? 'Approved' :
//                   selectedBtn.classList.contains('reject') ? 'Rejected' : 'Timed',
//          comments,
//          timestamp: new Date().toISOString(),
//          environment: currentEnv // Add environment to submission data
//        };
//
//        // Add time window for timed decisions
//        if (selectedBtn.classList.contains('timed')) {
//          submission.startTime = startTimeInput.value;
//          submission.endTime = endTimeInput.value;
//        }
//
//        // Save to localStorage
//        const existingSubmissions = JSON.parse(localStorage.getItem('changeSubmissions') || '[]');
//        existingSubmissions.push(submission);
//        localStorage.setItem('changeSubmissions', JSON.stringify(existingSubmissions));
//
//        // Show success toast notification
//        showToast('success', 'Success!', `Response saved for ${appName}`);
//
//        // Reset the form
//        form.reset();
//        decisionBtns.forEach(btn => btn.classList.remove('selected'));
//        if (timedInfo) {
//          timedInfo.style.display = 'none';
//        }
//
//        // Redirect to home after a delay
//        setTimeout(() => {
//          window.location.href = 'home.html';
//        }, 3000);
//      });
//    }
//
//    // Setup reset button functionality
//    const resetBtn = document.querySelector('button[type="reset"]');
//    if (resetBtn) {
//      resetBtn.addEventListener('click', () => {
//        // Clear all decision button selections
//        decisionBtns.forEach(btn => btn.classList.remove('selected'));
//        // Hide timed info
//        if (timedInfo) {
//          timedInfo.style.display = 'none';
//        }
//        // Clear any validation styles
//        if (startTimeInput && endTimeInput) {
//          startTimeInput.style.borderColor = '';
//          endTimeInput.style.borderColor = '';
//          // Clear error messages
//          document.getElementById('start-time-error').style.display = 'none';
//          document.getElementById('end-time-error').style.display = 'none';
//        }
//        // Show info toast notification
//        showToast('info', 'Form Reset', 'The form has been reset to default values');
//      });
//    }
//
//    // Initialize the page
//    renderChangeSummary();
//    renderServerList();
//  });
//
//  // Sample data
//const changeData = {
//    changeNo: "CH 12233",
//    window: "May 22, 10 PM – May 23, 10 AM",
//    env: "Prod",
//    owner: "Santhu"
//  };
//
//  const servers = [
//    "server 1", "server 2", "server 3", "server 4", "server 5",
//    "server 6", "server 7", "server 8", "server 9", "server 10",
//    "server 11", "server 12", "server 13", "server 15", "server 16"
//  ];
//
//  // Render change summary
//  function renderChangeSummary() {
//    const summary = document.getElementById("change-summary");
//    if (!summary) return;
//
//    summary.innerHTML = `
//      <div class="row">
//        <p><strong>Change No:</strong> ${changeData.changeNo}</p>
//        <p><strong>Window:</strong> ${changeData.window}</p>
//      </div>
//      <div class="row">
//        <p><strong>Env:</strong> ${changeData.env}</p>
//        <p><strong>Owner:</strong> ${changeData.owner}</p>
//      </div>
//    `;
//  }
//
//  // Render server list
//  function renderServerList() {
//    const serverList = document.getElementById("server-list");
//    if (!serverList) return;
//
//    serverList.innerHTML = '';
//    servers.forEach(server => {
//      const li = document.createElement("li");
//      li.textContent = server;
//      serverList.appendChild(li);
//    });
//  }
//
///**
// * Show a toast notification
// * @param {string} type - Type of toast: 'success', 'error', 'info', 'warning'
// * @param {string} title - Toast title
// * @param {string} message - Toast message
// * @param {number} duration - Duration in milliseconds (default: 5000ms)
// */
//function showToast(type, title, message, duration = 5000) {
//  // Create toast element
//  const toast = document.createElement('div');
//  toast.className = `toast ${type}`;
//
//  // Set icon based on type
//  let icon = '';
//  switch(type) {
//    case 'success':
//      icon = 'fa-circle-check';
//      break;
//    case 'error':
//      icon = 'fa-circle-xmark';
//      break;
//    case 'info':
//      icon = 'fa-circle-info';
//      break;
//    case 'warning':
//      icon = 'fa-triangle-exclamation';
//      break;
//    default:
//      icon = 'fa-bell';
//  }
//
//  // Create toast HTML structure
//  toast.innerHTML = `
//    <div class="toast-icon">
//      <i class="fas ${icon}"></i>
//    </div>
//    <div class="toast-content">
//      <div class="toast-title">${title}</div>
//      <div class="toast-message">${message}</div>
//    </div>
//    <button class="toast-close">
//      <i class="fas fa-times"></i>
//    </button>
//    <div class="toast-progress"></div>
//  `;
//
//  // Get the container
//  const container = document.querySelector('.toast-container');
//
//  // If container doesn't exist, create it
//  if (!container) {
//    const newContainer = document.createElement('div');
//    newContainer.className = 'toast-container';
//    document.body.appendChild(newContainer);
//    newContainer.appendChild(toast);
//  } else {
//    container.appendChild(toast);
//  }
//
//  // Add closing functionality
//  const closeButton = toast.querySelector('.toast-close');
//  closeButton.addEventListener('click', () => {
//    closeToast(toast);
//  });
//
//  // Animate progress bar
//  const progress = toast.querySelector('.toast-progress');
//  progress.style.animation = `progress-shrink ${duration/1000}s linear forwards`;
//
//  // Set timeout to remove toast
//  setTimeout(() => {
//    closeToast(toast);
//  }, duration);
//
//  // Make the toast appear after a short delay (for animation)
//  setTimeout(() => {
//    toast.classList.add('show');
//  }, 10);
//}
//
///**
// * Close and remove a toast
// * @param {HTMLElement} toast - The toast element to close
// */
//function closeToast(toast) {
//  toast.classList.remove('show');
//
//  // Wait for the animation to finish before removing
//  setTimeout(() => {
//    if (toast.parentElement) {
//      toast.parentElement.removeChild(toast);
//    }
//  }, 300);
//}
//
//// Example usage:
//// showToast('success', 'Success!', 'Operation completed successfully.');
//// showToast('error', 'Error!', 'Something went wrong.');
//// showToast('info', 'Info', 'Here is some information.');
//// showToast('warning', 'Warning', 'Please be careful.');
// Environment configuration from localStorage
let currentEnv;

document.addEventListener('DOMContentLoaded', async () => {
    currentEnv = localStorage.getItem('currentEnv') || "ENV";

    // Set environment indicator
    const envIndicator = document.getElementById('currentEnv');
    if (envIndicator) {
        envIndicator.textContent = currentEnv;
    }

    // Get app name from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const appName = urlParams.get('app');

    if (!appName) {
        showNoAppSelected();
        return;
    }

    const appNameSpan = document.getElementById('app-name');
    if (appNameSpan) {
        appNameSpan.textContent = appName;
    }

    try {
        // ✅ Fetch app details from backend
        const appResp = await fetch(`/api/apps/${encodeURIComponent(appName)}`);
        if (!appResp.ok) throw new Error("App not found");
        const appData = await appResp.json();

        // ✅ Fetch latest submission (if any)
        let submissionData = null;
        try {
            const subResp = await fetch(`/api/submission/${encodeURIComponent(appName)}`);
            if (subResp.ok) {
                submissionData = await subResp.json();
            }
        } catch (e) {
            console.warn("No submission found for app:", appName);
        }

        renderChangeSummary(appData, submissionData);
        renderServerList(appData.hostNames);

    } catch (err) {
        console.error("Error loading app details:", err);
        showToast("error", "Error", "Unable to load application details.");
    }

    setupFormHandlers(appName);
});

function showNoAppSelected() {
    const mainContent = document.querySelector('.container');
    if (mainContent) mainContent.style.display = 'none';

    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerHTML = `
        <div class="error-content">
          <h2>No Application Selected</h2>
          <p>Please select an application from the home page.</p>
          <button class="return-btn" onclick="window.location.href='home.html'">Return to Home</button>
        </div>`;
    document.body.appendChild(errorContainer);
}

// Render change summary
function renderChangeSummary(appData, submissionData) {
    const summary = document.getElementById("change-summary");
    if (!summary) return;

    summary.innerHTML = `
      <div class="row">
        <p><strong>Change No:</strong> ${appData.changeNo}</p>
        <p><strong>Window:</strong> ${appData.startWindow} → ${appData.endWindow}</p>
      </div>
      <div class="row">
        <p><strong>Env:</strong> ${currentEnv}</p>
        <p><strong>Owner:</strong> ${appData.owner}</p>
      </div>
      <div class="row">
        <p><strong>Status:</strong> ${appData.appStatus.toLowerCase()}</p>
        <p><strong>Team DL:</strong> ${appData.teamDl}</p>
      </div>
    `;

    if (submissionData) {
        summary.innerHTML += `
        <div class="row">
            <p><strong>Last Submitted By:</strong> ${submissionData.submitterName} (${submissionData.submitterDecision})</p>
            <p><strong>Email:</strong> ${submissionData.submitterEmailId}</p>
        </div>`;
    }
}

// Render server list
function renderServerList(hostNames) {
    const serverList = document.getElementById("server-list");
    if (!serverList) return;

    serverList.innerHTML = '';
    if (!hostNames || hostNames.length === 0) {
        serverList.innerHTML = "<li>No servers found</li>";
        return;
    }

    hostNames.forEach(server => {
        const li = document.createElement("li");
        li.textContent = server;
        serverList.appendChild(li);
    });
}

// 🔹 Extracted form logic into setup function
function setupFormHandlers(appName) {
    const form = document.querySelector('form');
    const decisionBtns = document.querySelectorAll('.decision-btn');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const timedInfo = document.querySelector('.timed-info');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selectedBtn = document.querySelector('.decision-btn.selected');
        if (!selectedBtn) {
            showToast("error", "Validation Error", "Please select a decision");
            return;
        }

        const approverName = document.getElementById('approver-name').value;
        const approverEmail = document.getElementById('approver-email').value;
        const comments = document.getElementById('comments').value;

        if (!approverName || !approverEmail) {
            showToast("error", "Validation Error", "Name and email are required");
            return;
        }

        const submission = {
            appName,
            submitterName: approverName,
            submitterEmailId: approverEmail,
            submitterDecision: selectedBtn.classList.contains('approve') ? 'APPROVED' :
                              selectedBtn.classList.contains('reject') ? 'REJECTED' : 'OTHER',
            submitterComments: comments
        };

        if (selectedBtn.classList.contains('timed')) {
            submission.otherStartWindow = startTimeInput.value;
            submission.otherEndWindow = endTimeInput.value;
        }

        try {
            const resp = await fetch(`/api/submission/${encodeURIComponent(appName)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submission)
            });

            if (resp.ok) {
                showToast("success", "Success", "Submission saved!");
                setTimeout(() => window.location.href = "home.html", 2000);
            } else {
                const err = await resp.json();
                showToast("error", "Error", err.message || "Failed to save submission");
            }
        } catch (err) {
            console.error("Error posting submission:", err);
            showToast("error", "Error", "Could not reach server");
        }
    });
}

// ✅ Toast code stays same as yours
