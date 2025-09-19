//// Environment configuration
//const currentEnv = "DEV"; // Can be changed to "DEV", "UAT", "PROD"
//
//document.addEventListener('DOMContentLoaded', () => {
//  // Store environment in localStorage
//  localStorage.setItem('currentEnv', currentEnv);
//
//  // Set environment indicator
//  const envIndicator = document.getElementById('currentEnv');
//  if (envIndicator) {
//    envIndicator.textContent = currentEnv;
//  }
//});
//
//let apps = [
//    "WebLogic", "Jenkins", "Docker", "GitHub", "Kafka", "Redis", "Spring Boot",
//    "MySQL", "MongoDB", "Nginx", "Node.js", "React", "Vue", "Angular", "PostgreSQL",
//    "Kubernetes", "Ansible", "Terraform", "Prometheus", "Grafana", "Elasticsearch",
//    "Logstash", "Fluentd", "RabbitMQ", "Consul", "Vault"
//  ];
//
//  let boxContainer = document.getElementById("appGrid");
//  let searchInput = document.getElementById("searchInput");
//
//  function getAppStatus(appName) {
//    // Ensure submissions is always an array, even if localStorage returns null
//    const submissions = JSON.parse(localStorage.getItem('changeSubmissions') || '[]');
//    // Only proceed with filter if submissions is an array
//    const appSubmissions = Array.isArray(submissions) ? submissions.filter(s => s.appName === appName) : [];
//
//    if (appSubmissions.length === 0) {
//      return { text: 'No Changes', color: '#6b7280' };
//    }
//
//    // Get the latest submission
//    const latestSubmission = appSubmissions.sort((a, b) =>
//      new Date(b.timestamp) - new Date(a.timestamp)
//    )[0];
//
//    switch (latestSubmission.decision) {
//      case 'Approved':
//        return { text: 'Approved', color: '#845ec2' };
//      case 'Rejected':
//        return { text: 'Rejected', color: '#dc2626' };
//      case 'Timed':
//        return { text: 'Timed Approval', color: '#92400e' };
//      default:
//        return { text: 'Pending', color: '#6b7280' };
//    }
//  }
//
//  // Render function
//  function renderApps(filterText = "") {
//    boxContainer.innerHTML = ""; // Clear previous results
//    if(apps.length == 0) {
//      let box = document.createElement("div");
//        box.className = "app-box empty-state";
//        box.innerHTML = `
//          <div class="empty-icon">
//            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-x">
//              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
//              <path d="m7.5 4.27 9 5.15"></path>
//              <polyline points="3.29 7 12 12 20.71 7"></polyline>
//              <line x1="12" y1="22" y2="12" x2="12"></line>
//              <path d="m17 13 5 5m-5 0 5-5"></path>
//            </svg>
//          </div>
//          <h3>No Applications Found</h3>
//          <p>There are currently no applications available in the system.</p>
//        `;
//        boxContainer.appendChild(box);
//        return;
//    }
//
//    const filteredApps = apps
//      .filter(app => app.toLowerCase().includes(filterText.toLowerCase()))
//      .sort((a, b) => a.localeCompare(b));
//
//    if (filteredApps.length === 0) {
//      let box = document.createElement("div");
//      box.className = "app-box empty-state";
//      box.innerHTML = `
//        <div class="empty-icon">
//          <i class="fas fa-search"></i>
//        </div>
//        <h3>No Results Found</h3>
//        <p>Try a different search term</p>
//      `;
//      boxContainer.appendChild(box);
//      return;
//    }
//
//    filteredApps.forEach(app => {
//      const status = getAppStatus(app);
//      let box = document.createElement("div");
//      box.className = "app-box";
//
//      box.innerHTML = `
//        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-server icon">
//          <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
//          <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
//          <line x1="6" x2="6.01" y1="6" y2="6"></line>
//          <line x1="6" x2="6.01" y1="18" y2="18"></line>
//        </svg>
//        <h3>${app}</h3>
//        <p style="color: ${status.color}; font-weight: 500;">${status.text}</p>
//      `;
//
//      // Make the box clickable
//      box.style.cursor = "pointer";
//      box.addEventListener("click", () => {
//        window.location.href = `app.html?app=${encodeURIComponent(app)}`;
//      });
//
//      boxContainer.appendChild(box);
//    });
//  }
//
//  // Search event
//  searchInput.addEventListener("input", (e) => {
//    renderApps(e.target.value);
//  });
//
//  // Initial load
//  renderApps();


/// Environment configuration (fetched dynamically from backend)
 document.addEventListener('DOMContentLoaded', async () => {
     try {
         // Fetch environment from backend
         const envResponse = await fetch("http://localhost:8080/api/env");
         if (!envResponse.ok) throw new Error("Failed to load environment");

         // Expecting plain text (DEV/UAT/PROD)
         const currentEnv = await envResponse.text();

         // Save to localStorage
         localStorage.setItem('currentEnv', currentEnv);

         // Show in UI if element exists
         const envIndicator = document.getElementById('currentEnv');
         if (envIndicator) envIndicator.textContent = currentEnv;

         console.log("Environment:", currentEnv);

         // Load applications after environment is ready
         loadApps();
     } catch (error) {
         console.error("Error fetching environment:", error);
     }
 });

 // DOM elements
 const boxContainer = document.getElementById("appGrid");
 const searchInput = document.getElementById("searchInput");

 // Fetch all apps from backend
 async function loadApps() {
     try {
         const response = await fetch('http://localhost:8080/api/apps');
         if (!response.ok) throw new Error("Failed to fetch apps");

         const apps = await response.json();
         console.log("Apps:", apps);

         renderApps(apps);
     } catch (err) {
         console.error("Error fetching apps:", err);
         boxContainer.innerHTML = `
             <div class="app-box empty-state">
                 <h3>Error loading applications</h3>
                 <p>Check server connection</p>
             </div>`;
     }
 }

 // Fetch latest submission for a given app
 async function getAppStatus(appName) {
     try {
         const response = await fetch(`http://localhost:8080/api/submission/${encodeURIComponent(appName)}`);
         if (response.status === 404) {
             return { text: 'No Changes', color: '#6b7280' };
         }
         if (!response.ok) throw new Error("Submission fetch failed");

         const submission = await response.json();
         switch (submission.submitterDecision.toUpperCase()) {
             case 'APPROVED':
                 return { text: 'Approved', color: '#845ec2' };
             case 'REJECTED':
                 return { text: 'Rejected', color: '#dc2626' };
             case 'OTHER':
                 return { text: 'Other Window', color: '#92400e' };
             default:
                 return { text: 'Pending', color: '#6b7280' };
         }
     } catch (err) {
         console.error("Error fetching submission:", err);
         return { text: 'Pending', color: '#6b7280' };
     }
 }

 // Render apps with status
 async function renderApps(appList, filterText = "") {
     boxContainer.innerHTML = ""; // clear previous

     if (!appList || appList.length === 0) {
         boxContainer.innerHTML = `
             <div class="app-box empty-state">
                 <h3>No Applications Found</h3>
                 <p>There are currently no applications available.</p>
             </div>`;
         return;
     }

     const filteredApps = appList
         .filter(app => app.appName.toLowerCase().includes(filterText.toLowerCase()))
         .sort((a, b) => a.appName.localeCompare(b.appName));

     if (filteredApps.length === 0) {
         boxContainer.innerHTML = `
             <div class="app-box empty-state">
                 <h3>No Results Found</h3>
                 <p>Try a different search term</p>
             </div>`;
         return;
     }

     for (const app of filteredApps) {
         const status = await getAppStatus(app.appName);

         const box = document.createElement("div");
         box.className = "app-box";

         box.innerHTML = `
             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" class="lucide lucide-server icon">
                 <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                 <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                 <line x1="6" x2="6.01" y1="6" y2="6"></line>
                 <line x1="6" x2="6.01" y1="18" y2="18"></line>
             </svg>
             <h3>${app.appName}</h3>
             <p style="color: ${status.color}; font-weight: 500;">${status.text}</p>
         `;

         box.style.cursor = "pointer";
         box.addEventListener("click", () => {
             window.location.href = `app.html?app=${encodeURIComponent(app.appName)}`;
         });

         boxContainer.appendChild(box);
     }
 }

 // Search input event
 searchInput.addEventListener("input", async (e) => {
     try {
         const response = await fetch('http://localhost:8080/api/apps');
         if (!response.ok) throw new Error("Search fetch failed");

         const apps = await response.json();
         renderApps(apps, e.target.value);
     } catch (err) {
         console.error("Search error:", err);
     }
 });
