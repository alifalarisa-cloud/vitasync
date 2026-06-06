const fs = require('fs');

const sidebarHTML = (activePage) => `
  <button class="mobile-toggle" id="mobileToggle"><i class="fas fa-bars"></i></button>
  <aside class="sidebar" id="sidebar">
    <div class="brand"><h1>VitaSync</h1><p data-translate="pharmacy_grade">Pharmacy Grade</p></div>
    <ul class="nav-links">
      <li class="nav-item"><a href="index.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}"><i class="fas fa-th-large"></i> <span data-translate="dashboard">Dashboard</span></a></li>
      <li class="nav-item"><a href="schedule.html" class="nav-link ${activePage === 'schedule' ? 'active' : ''}"><i class="far fa-calendar-alt"></i> <span data-translate="schedule">Schedule</span></a></li>
      <li class="nav-item"><a href="supplements.html" class="nav-link ${activePage === 'supplements' ? 'active' : ''}"><i class="fas fa-pills"></i> <span data-translate="my_supplements">My Supplements</span></a></li>
      <li class="nav-item"><a href="interactions.html" class="nav-link ${activePage === 'interactions' ? 'active' : ''}"><i class="fas fa-shield-alt"></i> <span data-translate="interactions">Interactions</span></a></li>
      <li class="nav-item"><a href="scanner.html" class="nav-link ${activePage === 'scanner' ? 'active' : ''}"><i class="fas fa-camera"></i> <span data-translate="label_scanner">Label Scanner</span></a></li>
      <li class="nav-item"><a href="biomarkers.html" class="nav-link ${activePage === 'biomarkers' ? 'active' : ''}"><i class="fas fa-chart-line"></i> <span data-translate="biomarkers">Biomarkers</span></a></li>
      <li class="nav-item"><a href="stacks.html" class="nav-link ${activePage === 'stacks' ? 'active' : ''}"><i class="fas fa-layer-group"></i> <span data-translate="active_stacks">Active Stacks</span></a></li>
      <li class="nav-item"><a href="reminders.html" class="nav-link ${activePage === 'reminders' ? 'active' : ''}"><i class="fas fa-bell"></i> <span data-translate="reminders">Reminders</span></a></li>
      <li class="nav-item"><a href="hydration.html" class="nav-link ${activePage === 'hydration' ? 'active' : ''}"><i class="fas fa-tint"></i> <span data-translate="hydration">Hydration</span></a></li>
      <li class="nav-item"><a href="insights.html" class="nav-link ${activePage === 'insights' ? 'active' : ''}"><i class="fas fa-lightbulb"></i> <span data-translate="health_insights">Health Insights</span></a></li>
      <li class="nav-item"><a href="feed.html" class="nav-link ${activePage === 'feed' ? 'active' : ''}"><i class="fas fa-project-diagram"></i> <span data-translate="community_feed">Community Feed</span></a></li>
      <li class="nav-item"><a href="profile.html" class="nav-link ${activePage === 'profile' ? 'active' : ''}"><i class="fas fa-user"></i> <span data-translate="profile">Profile</span></a></li>
      <li class="nav-item"><a href="settings.html" class="nav-link ${activePage === 'settings' ? 'active' : ''}"><i class="fas fa-cog"></i> <span data-translate="settings">Settings</span></a></li>
    </ul>
    <div class="sidebar-bottom">
      <div style="padding: 8px 16px; display: flex; gap: 8px;">
        <button onclick="changeLanguage('en')" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:4px; font-size:11px; cursor:pointer; font-weight:600;">EN</button>
        <button onclick="changeLanguage('id')" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:4px; font-size:11px; cursor:pointer; font-weight:600;">ID</button>
      </div>
    </div>
  </aside>
`;

const htmlHead = (title, activePage) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VitaSync - ${title}</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
`;

const htmlFoot = (activePage = '') => `
  <!-- Interactive CS Chatbot Widget -->
  <div class="support-widget">
    <div class="support-bubble" id="chatBubble"><i class="fas fa-comments"></i></div>
    <div class="chat-box" id="chatBox">
      <div class="chat-header">
        <h4 style="margin:0; font-size:14px; font-weight:700;"><i class="fas fa-user-md"></i> <span data-translate="chat_support">VitaSync Support</span></h4>
        <button onclick="toggleChat()" style="background:none; border:none; color:white; font-size:16px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="chat-messages" id="chatMessages">
        <div class="chat-message bot">Halo! Saya asisten AI VitaSync. Ada yang bisa saya bantu terkait suplemen atau kesehatan Anda hari ini?</div>
      </div>
      <div class="chat-chips">
        <div class="chat-chip" onclick="askQuickQuestion(1)">Apple Health Sync?</div>
        <div class="chat-chip" onclick="askQuickQuestion(2)">Add Supplements?</div>
        <div class="chat-chip" onclick="askQuickQuestion(3)">Interaction checker?</div>
      </div>
      <div class="chat-input-row">
        <input type="text" id="chatInput" placeholder="Tulis pertanyaan Anda..." onkeypress="handleChatKey(event)">
        <button onclick="sendChatMessage()"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  </div>

  <div id="toastMessage" style="position:fixed; bottom:80px; left:20px; color:white; padding:12px 24px; border-radius:8px; display:none; transition:all 0.3s; z-index:9999; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,0.2);"></div>
  
  <!-- Supplement Detail Modal -->
  <div class="modal" id="supplementDetailModal" style="z-index:9999; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; align-items:center; justify-content:center;">
    <div class="modal-content" style="width: 520px; max-width:90%; background:white; padding:24px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.15);">
      <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:16px;">
        <h3 id="detailSuppName" style="margin:0; font-size:20px; font-weight:700; color:var(--text-dark);">Supplement Details</h3>
        <button onclick="closeModal('supplementDetailModal')" style="background:none; border:none; font-size:18px; cursor:pointer; color:var(--text-muted);"><i class="fas fa-times"></i></button>
      </div>
      <div style="padding: 8px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span id="detailSuppCategory" style="background:var(--primary-light); color:var(--primary-color); padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; text-transform:uppercase;">Category</span>
          <strong id="detailSuppDose" style="font-size:15px; color:var(--text-dark);">Dose: -</strong>
        </div>
        
        <p id="detailSuppDesc" style="font-size:14px; color:var(--text-dark); line-height:1.6; margin-bottom:20px; background:rgba(0,0,0,0.02); padding:16px; border-radius:10px; border:1px solid var(--border-color);"></p>
        
        <div style="background:var(--primary-light); border:1px solid rgba(216,27,96,0.1); padding:14px; border-radius:10px; margin-bottom:16px;">
          <h4 style="font-size:13px; font-weight:700; color:var(--primary-color); margin:0 0 6px 0;"><i class="fas fa-microscope"></i> Clinical Biohacking Intake Guideline</h4>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5; margin:0;">Optimal biological absorption is achieved when taken in accordance with specific mineral transporters. Take at scheduled times daily.</p>
        </div>
        
        <div style="background:rgba(216,27,96,0.03); border:1px solid rgba(216,27,96,0.08); padding:14px; border-radius:10px; margin:0;">
          <h4 style="font-size:13px; font-weight:700; color:var(--primary-color); margin:0 0 6px 0;"><i class="fas fa-exclamation-triangle"></i> Known Chemical Conflict Spacing</h4>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5; margin:0;">Ensure a minimum spacing of 4 hours from competitive divalent metals (e.g. Iron vs Calcium) and metal-binding tea/coffee polyphenols.</p>
        </div>
      </div>
      <div style="display:flex; gap:12px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:16px;">
        <button class="btn-primary" id="detailScheduleBtn" style="flex:1; border-radius:8px; font-weight:700;">+ Add to Schedule</button>
        <button onclick="closeModal('supplementDetailModal')" style="flex:1; background:#eee; border:none; border-radius:8px; cursor:pointer; font-weight:700; color:var(--text-dark);">Close</button>
      </div>
    </div>
  </div>

  <!-- Mobile Bottom Navigation Bar -->
  <nav class="mobile-bottom-nav" id="mobileBottomNav">
    <a href="index.html">
      <i class="fas fa-th-large"></i>
      <span>Home</span>
    </a>
    <a href="schedule.html">
      <i class="far fa-calendar-alt"></i>
      <span>Schedule</span>
    </a>
    <a href="supplements.html">
      <i class="fas fa-pills"></i>
      <span>Suplemen</span>
    </a>
    <a href="biomarkers.html">
      <i class="fas fa-chart-line"></i>
      <span>Biomarker</span>
    </a>
    <a href="profile.html">
      <i class="fas fa-user"></i>
      <span>Profil</span>
    </a>
    <a href="#" id="mobileMenuBtn">
      <i class="fas fa-bars"></i>
      <span>Menu</span>
    </a>
  </nav>
  <script>
    // Auto-mark active bottom nav link based on current page
    (function() {
      var page = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
      document.querySelectorAll('.mobile-bottom-nav a[href]').forEach(function(a) {
        if (a.getAttribute('href') === page) a.classList.add('active');
      });
      // Wire the "Menu" button to sidebar toggle
      var menuBtn = document.getElementById('mobileMenuBtn');
      if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
          e.preventDefault();
          var sb = document.getElementById('sidebar');
          var ov = document.getElementById('sidebarOverlay');
          if (sb) sb.classList.toggle('active');
          if (ov) ov.classList.toggle('active');
        });
      }
    })();
  </script>
  
  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
`;

// Re-export htmlFoot as a plain value for backward compat with calls that used ${htmlFoot}
// (all calls already converted to ${htmlFoot()}, so the function form is used)

// INDEX.HTML (Dashboard)
const indexHTML = `
${htmlHead('Dashboard')}
<!-- Onboarding Fullscreen Overlay -->
<div class="onboarding-overlay" id="onboardingScreen">
  <div class="onboarding-card">
    <div class="onboarding-logo"><i class="fas fa-heartbeat"></i></div>
    <h2 style="font-size:24px; font-weight:800; margin-bottom:12px; color:var(--text-dark);" data-translate="welcome_title">Welcome to VitaSync</h2>
    <p style="font-size:14px; color:var(--text-muted); line-height:1.6; margin-bottom:32px;" data-translate="welcome_desc">Your intelligent offline-first pharmacy-grade biohacking, supplement, and health tracker. Ready to optimize your longevity?</p>
    <button onclick="completeOnboarding()" class="btn-primary" style="width:100%; padding:14px; font-size:16px; border-radius:12px; font-weight:700;" data-translate="get_started">Get Started</button>
  </div>
</div>

${sidebarHTML('dashboard')}
<main class="main-content">
  <header class="header">
    <h2 data-translate="good_afternoon">Good afternoon!</h2>
    <p id="todayDate">MONDAY, MAY 11 &middot; Let's make today your healthiest day.</p>
  </header>
  
  <div class="summary-cards">
    <div class="card">
      <div class="card-title"><i class="fas fa-chart-pie" style="color:var(--primary-color);"></i> <span data-translate="progress">Progress</span></div>
      <div class="card-value" id="dashProgressVal">0%</div>
      <div class="card-subtitle" data-translate="great">Great!</div>
    </div>
    <div class="card">
      <div class="card-title"><i class="fas fa-check-circle" style="color:var(--success);"></i> <span data-translate="supps_taken">Supps taken</span></div>
      <div class="card-value" id="dashTakenVal">0 / 0</div>
      <div class="card-subtitle" data-translate="today">Today</div>
    </div>
    <div class="card" style="cursor:pointer;" onclick="location.href='interactions.html'">
      <div class="card-title"><i class="fas fa-exclamation-triangle" style="color:var(--danger);"></i> <span data-translate="warnings">Warnings</span></div>
      <div class="card-value" id="dashWarningsVal">0</div>
      <div class="card-subtitle" data-translate="check_interactions">Check interactions</div>
    </div>
    <div class="card" style="cursor:pointer;" onclick="location.href='supplements.html'">
      <div class="card-title"><i class="fas fa-boxes" style="color:var(--warning);"></i> <span data-translate="inventory">Inventory</span></div>
      <div class="card-value" id="dashInventoryVal">0</div>
      <div class="card-subtitle" data-translate="total_supplements">Total supplements</div>
    </div>
  </div>

  <!-- Flo-inspired Premium Daily Symptom Logger -->
  <div class="card" style="margin-bottom: 24px; padding: 24px; border-radius:16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
      <h3 class="section-title" style="margin:0; display:flex; align-items:center; gap:10px;"><i class="fas fa-heartbeat" style="color:var(--primary-color);"></i> <span data-translate="symptom_logger">Daily Symptom Logger</span></h3>
      <span style="font-size:12px; font-weight:700; color:var(--text-muted); background:var(--primary-light); padding:4px 10px; border-radius:20px;" id="symptomStatusText">Logged: None</span>
    </div>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
      <!-- Category 1: Mood -->
      <div style="background:var(--bg-color); border:1px solid var(--border-color); padding:16px; border-radius:12px; text-align:center; transition:all 0.2s;">
        <strong style="font-size:13px; display:block; margin-bottom:12px; color:var(--primary-color); text-transform:uppercase; letter-spacing:0.5px;" data-translate="mood">Mood</strong>
        <div style="display:flex; justify-content:center; gap:8px;" id="moodSymptomList">
          <button onclick="logSymptom('mood', 'Calm')" title="Calm" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-mood-Calm">ðŸ§˜</button>
          <button onclick="logSymptom('mood', 'Happy')" title="Happy" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-mood-Happy">ðŸ˜„</button>
          <button onclick="logSymptom('mood', 'Stressed')" title="Stressed" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-mood-Stressed">ðŸ˜°</button>
          <button onclick="logSymptom('mood', 'Fatigued')" title="Fatigued" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-mood-Fatigued">ðŸ¥±</button>
        </div>
      </div>
      <!-- Category 2: Energy -->
      <div style="background:var(--bg-color); border:1px solid var(--border-color); padding:16px; border-radius:12px; text-align:center; transition:all 0.2s;">
        <strong style="font-size:13px; display:block; margin-bottom:12px; color:var(--success); text-transform:uppercase; letter-spacing:0.5px;" data-translate="energy">Energy</strong>
        <div style="display:flex; justify-content:center; gap:10px;" id="energySymptomList">
          <button onclick="logSymptom('energy', 'High')" title="High" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-energy-High">âš¡</button>
          <button onclick="logSymptom('energy', 'Normal')" title="Normal" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-energy-Normal">âš–ï¸</button>
          <button onclick="logSymptom('energy', 'Exhausted')" title="Exhausted" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-energy-Exhausted">ðŸ”‹</button>
        </div>
      </div>
      <!-- Category 3: Sleep -->
      <div style="background:var(--bg-color); border:1px solid var(--border-color); padding:16px; border-radius:12px; text-align:center; transition:all 0.2s;">
        <strong style="font-size:13px; display:block; margin-bottom:12px; color:var(--warning); text-transform:uppercase; letter-spacing:0.5px;" data-translate="sleep">Sleep</strong>
        <div style="display:flex; justify-content:center; gap:10px;" id="sleepSymptomList">
          <button onclick="logSymptom('sleep', 'Deep')" title="Deep Sleep" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-sleep-Deep">ðŸ˜´</button>
          <button onclick="logSymptom('sleep', 'Restless')" title="Restless" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-sleep-Restless">ðŸ›Œ</button>
          <button onclick="logSymptom('sleep', 'Insomnia')" title="Insomnia" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-sleep-Insomnia">â°</button>
        </div>
      </div>
      <!-- Category 4: Focus -->
      <div style="background:var(--bg-color); border:1px solid var(--border-color); padding:16px; border-radius:12px; text-align:center; transition:all 0.2s;">
        <strong style="font-size:13px; display:block; margin-bottom:12px; color:#9c27b0; text-transform:uppercase; letter-spacing:0.5px;" data-translate="focus">Focus</strong>
        <div style="display:flex; justify-content:center; gap:10px;" id="focusSymptomList">
          <button onclick="logSymptom('focus', 'Laser')" title="Laser Focus" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-focus-Laser">ðŸŽ¯</button>
          <button onclick="logSymptom('focus', 'Good')" title="Good Focus" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-focus-Good">ðŸ§ </button>
          <button onclick="logSymptom('focus', 'BrainFog')" title="Brain Fog" style="font-size:22px; border:none; background:none; cursor:pointer; padding:8px; border-radius:50%; transition:all 0.2s;" id="symptom-focus-BrainFog">ðŸŒ«ï¸</button>
        </div>
      </div>
    </div>
  </div>

  <div class="dashboard-grid">
    <div>
      <div class="section-header">
        <h3 class="section-title" data-translate="todays_schedule">Today's Schedule</h3>
        <button id="addDashScheduleBtn" style="background:var(--primary-light); color:var(--primary-color); border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;"><i class="fas fa-plus"></i></button>
      </div>
      <div class="schedule-list" id="dashScheduleList"></div>
    </div>
    
    <div>
      <div class="section-header">
        <h3 class="section-title" data-translate="critical_interactions">Critical Interactions</h3>
      </div>
      <div id="dashInteractionsList"></div>
    </div>
  </div>

  <!-- Modal Add Schedule Dashboard -->
  <div class="modal" id="dashScheduleModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Schedule Supplement</h3>
        <button onclick="closeModal('dashScheduleModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Select Supplement</label>
        <select id="dashScheduleNameSelect"></select>
      </div>
      <div class="form-group">
        <label>Dose / Instructions</label>
        <input type="text" id="dashScheduleDose" placeholder="e.g. 5000 IU with fat">
      </div>
      <div class="form-group">
        <label>Time</label>
        <input type="text" id="dashScheduleTime" value="08:00 AM">
      </div>
      <div class="form-group">
        <label>Time Category</label>
        <select id="dashScheduleSlot">
          <option value="morning">Morning</option>
          <option value="midday">Midday</option>
          <option value="evening">Evening</option>
        </select>
      </div>
      <button class="btn-add" id="saveDashScheduleBtn" style="width:100%; padding:12px; margin-top:16px;">Schedule Supplement</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// SCHEDULE.HTML
const scheduleHTML = `
${htmlHead('Schedule')}
${sidebarHTML('schedule')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header" style="display:flex; justify-content:space-between; align-items:center;">
    <div>
      <h2 data-translate="todays_schedule">Today's Schedule</h2>
      <p id="scheduleDateSub">Today &middot; 0 of 0 taken</p>
    </div>
    <div style="display:flex; gap:12px;">
      <button onclick="openModal('scheduleModal')" style="background:var(--primary-color); color:white; border:none; padding:10px 16px; border-radius:8px; cursor:pointer; font-weight:600;"><i class="fas fa-plus"></i> Add Item</button>
      <button class="btn-secondary" id="resetScheduleBtn" style="background:#eee; border:none; padding:10px 16px; border-radius:8px; cursor:pointer; font-weight:600;"><i class="fas fa-redo"></i> <span data-translate="reset">Reset</span></button>
    </div>
  </header>

  <div class="card" style="margin-bottom: 24px;">
    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-weight:600;">
      <span data-translate="daily_progress">Daily Progress</span>
      <span id="scheduleProgressPercent">0%</span>
    </div>
    <div style="height:8px; background:#f0f0f0; border-radius:4px; overflow:hidden;">
      <div id="scheduleProgressBar" style="height:100%; width:0%; background:var(--primary-color); transition:width 0.3s;"></div>
    </div>
  </div>

  <div style="display:flex; flex-direction:column; gap:24px;">
    <div>
      <h4 style="margin-bottom:12px; display:flex; align-items:center; gap:8px; color:var(--primary-color);"><i class="fas fa-sun"></i> <span data-translate="morning">Morning</span></h4>
      <div class="schedule-list" id="morningList"></div>
    </div>
    <div>
      <h4 style="margin-bottom:12px; display:flex; align-items:center; gap:8px; color:var(--warning);"><i class="fas fa-cloud-sun"></i> <span data-translate="midday">Midday</span></h4>
      <div class="schedule-list" id="middayList"></div>
    </div>
    <div>
      <h4 style="margin-bottom:12px; display:flex; align-items:center; gap:8px; color:var(--text-dark);"><i class="fas fa-moon"></i> <span data-translate="evening">Evening</span></h4>
      <div class="schedule-list" id="eveningList"></div>
    </div>
  </div>

  <!-- Add Item Modal -->
  <div class="modal" id="scheduleModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add Item to Schedule</h3>
        <button onclick="closeModal('scheduleModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Supplement Name</label>
        <input type="text" id="schedAddName" placeholder="e.g. Zinc Picolinate">
      </div>
      <div class="form-group">
        <label>Time</label>
        <input type="text" id="schedAddTime" placeholder="e.g. 08:30 AM">
      </div>
      <div class="form-group">
        <label>Dose & Notes</label>
        <input type="text" id="schedAddNotes" placeholder="e.g. 15mg with lunch">
      </div>
      <div class="form-group">
        <label>Time Slot</label>
        <select id="schedAddSlot">
          <option value="morning">Morning</option>
          <option value="midday">Midday</option>
          <option value="evening">Evening</option>
        </select>
      </div>
      <button class="btn-add" id="saveScheduleBtn" style="width:100%; padding:12px; margin-top:16px;">Schedule Supplement</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// SUPPLEMENTS.HTML
const supplementsHTML = `
${htmlHead('My Supplements')}
${sidebarHTML('supplements')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header" style="display:flex; justify-content:space-between; align-items:center;">
    <div>
      <h2 data-translate="my_supplements">My Supplements</h2>
      <p id="suppCountSub">Total 0 supplements</p>
    </div>
    <button onclick="openModal('suppModal')" style="background:var(--primary-color); color:white; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-plus"></i> <span data-translate="add_supplement">Add Supplement</span></button>
  </header>

  <div style="position:relative; margin-bottom:32px;">
    <input type="text" id="suppSearch" placeholder="Search supplements..." style="width:100%; padding:16px 16px 16px 48px; border-radius:var(--radius); border:1px solid var(--border-color); font-size:16px;">
    <i class="fas fa-search" style="position:absolute; left:16px; top:18px; color:var(--text-muted); font-size:18px;"></i>
  </div>

  <div class="supplements-grid" id="supplementsGrid"></div>

  <!-- Supplement Add Modal -->
  <div class="modal" id="suppModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add New Supplement</h3>
        <button onclick="closeModal('suppModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Supplement Name</label>
        <input type="text" id="suppAddName" placeholder="e.g. Curcumin C3">
      </div>
      <div class="form-group">
        <label>Dose</label>
        <input type="text" id="suppAddDose" placeholder="e.g. 500 mg">
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="suppAddCategory">
          <option>Vitamin</option>
          <option>Mineral</option>
          <option>Herbal</option>
          <option>Amino Acid</option>
        </select>
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" id="suppAddDesc" placeholder="e.g. Supports healthy cardiovascular system">
      </div>
      <button class="btn-add" id="saveSuppBtn" style="width:100%; padding:12px; margin-top:16px;">Add to Inventory</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// INTERACTIONS.HTML
const interactionsHTML = `
${htmlHead('Interactions')}
${sidebarHTML('interactions')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header">
    <h2 data-translate="interactions">Interactions & Warnings</h2>
    <p>Check supplement, food, and drug interactions</p>
  </header>

  <div style="display:grid; grid-template-columns: 2fr 1.5fr; gap:32px;">
    <div>
      <div class="card" style="margin-bottom:24px;">
        <h3 style="margin-bottom:16px;" data-translate="interaction_checker"><i class="fas fa-shield-alt"></i> Interaction Checker</h3>
        <div style="display:flex; gap:8px; margin-bottom:24px;" id="interactionFilters">
          <button class="btn-primary" style="width:auto; padding:8px 16px;" onclick="filterInteractionType('all')">All</button>
          <button style="background:#eee; border:none; padding:8px 16px; border-radius:8px; cursor:pointer;" onclick="filterInteractionType('supp-supp')">Supp-Supp</button>
          <button style="background:#eee; border:none; padding:8px 16px; border-radius:8px; cursor:pointer;" onclick="filterInteractionType('supp-food')">Supp-Food</button>
          <button style="background:#eee; border:none; padding:8px 16px; border-radius:8px; cursor:pointer;" onclick="filterInteractionType('supp-drug')">Supp-Drug</button>
        </div>

        <div style="margin-bottom:16px;">
          <label style="font-weight:600; font-size:13px; display:block; margin-bottom:8px;">YOUR SUPPLEMENTS</label>
          <div style="display:flex; flex-wrap:wrap; gap:8px;" id="activeCheckSupps"></div>
          <button onclick="openModal('checkSuppModal')" style="background:#fcfcfc; border:1px dashed var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; margin-top:8px;">+ Add Supplement</button>
        </div>

        <div>
          <label style="font-weight:600; font-size:13px; display:block; margin-bottom:8px;">COMMON FOODS & DRUGS</label>
          <div style="display:flex; flex-wrap:wrap; gap:8px;" id="activeCheckFoods"></div>
          <button onclick="openModal('checkFoodModal')" style="background:#fcfcfc; border:1px dashed var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; margin-top:8px;">+ Add Food/Drug</button>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:16px;">Analysis Results</h3>
        <div id="interactionResultsList" style="display:flex; flex-direction:column; gap:16px;"></div>
      </div>
    </div>

    <div>
      <div class="card" style="margin-bottom:24px;">
        <h3 style="margin-bottom:16px;">Auto-Detected</h3>
        <div id="autoDetectedInteractions" style="display:flex; flex-direction:column; gap:16px;"></div>
      </div>
      
      <div style="background:var(--primary-light); color:var(--primary-dark); padding:24px; border-radius:var(--radius);">
        <h4 style="margin-bottom:8px;"><i class="fas fa-lightbulb"></i> The Science of Timing</h4>
        <p style="font-size:14px; line-height:1.6;">Learn how spacing your supplements can improve bioavailability and prevent negative interactions.</p>
      </div>
    </div>
  </div>

  <!-- Modal Check Supp -->
  <div class="modal" id="checkSuppModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add Supplement to Check</h3>
        <button onclick="closeModal('checkSuppModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Select Supplement</label>
        <select id="checkSuppNameSelect"></select>
      </div>
      <button class="btn-add" id="saveCheckSuppBtn" style="width:100%; padding:12px; margin-top:16px;">Add to Monitor List</button>
    </div>
  </div>

  <!-- Modal Check Food -->
  <div class="modal" id="checkFoodModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add Food/Drug to Check</h3>
        <button onclick="closeModal('checkFoodModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Select Food/Drug</label>
        <select id="checkFoodNameSelect"></select>
      </div>
      <button class="btn-add" id="saveCheckFoodBtn" style="width:100%; padding:12px; margin-top:16px;">Add to Monitor List</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// SCANNER.HTML
const scannerHTML = `
${htmlHead('Label Scanner')}
${sidebarHTML('scanner')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header">
    <h2 data-translate="label_scanner">Label Scanner</h2>
    <p>Point your camera at the supplement facts to auto-extract ingredients</p>
  </header>

  <div style="display:grid; grid-template-columns: 2fr 1fr; gap:32px;">
    <div>
      <div style="background:#000; border-radius:var(--radius); overflow:hidden; position:relative; aspect-ratio:4/3; display:flex; align-items:center; justify-content:center;">
        <video id="videoFeed" autoplay playsinline style="width:100%; height:100%; object-fit:cover; display:none;"></video>
        <div id="videoPlaceholder" style="color:#aaa; text-align:center; padding:20px;">
          <i class="fas fa-camera" style="font-size:48px; margin-bottom:16px;"></i>
          <p>Camera is currently off. Click the capture button to turn on camera feed.</p>
        </div>
        
        <div style="position:absolute; bottom:20px; display:flex; gap:16px; z-index:10;">
          <button id="toggleFlashBtn" style="width:48px; height:48px; border-radius:50%; background:rgba(0,0,0,0.6); border:none; color:white; cursor:pointer;"><i class="fas fa-bolt"></i></button>
          <button id="captureBtn" style="width:64px; height:64px; border-radius:50%; background:var(--primary-color); border:none; color:white; cursor:pointer; font-size:24px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-camera"></i></button>
          <button id="galleryBtn" style="width:48px; height:48px; border-radius:50%; background:rgba(0,0,0,0.6); border:none; color:white; cursor:pointer;"><i class="fas fa-image"></i></button>
        </div>

        <div style="position:absolute; top:20px; right:20px; z-index:10;">
          <select id="cameraSelect" style="background:rgba(0,0,0,0.6); color:white; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:12px;">
            <option value="environment">Back Camera</option>
            <option value="user">Front Camera</option>
          </select>
        </div>
        
        <input type="file" id="galleryInput" accept="image/*" style="display:none;">
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:24px;">
        <div style="background:#fff8e1; border:1px solid #ffe082; padding:16px; border-radius:12px; text-align:center;">
          <h4 style="color:#ff8f00; margin-bottom:4px;"><i class="fas fa-lightbulb"></i> Bright Lighting</h4>
          <p style="font-size:12px; color:var(--text-muted);">Avoid shadows on the label for OCR accuracy.</p>
        </div>
        <div style="background:#fce4ec; border:1px solid #f8bbd0; padding:16px; border-radius:12px; text-align:center;">
          <h4 style="color:var(--primary-color); margin-bottom:4px;"><i class="fas fa-arrows-alt-v"></i> 4-6 Inches</h4>
          <p style="font-size:12px; color:var(--text-muted);">Hold camera steadily at this distance for sharp focus.</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin-bottom:16px;">Detected Ingredients</h3>
      <div id="detectedResultsList" style="display:flex; flex-direction:column; gap:12px;">
        <p style="color:var(--text-muted); font-size:14px; text-align:center; padding:40px 0;">No ingredients scanned yet. Turn on the camera or select an image to scan.</p>
      </div>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// BIOMARKERS.HTML
const biomarkersHTML = `
${htmlHead('Biomarkers')}
${sidebarHTML('biomarkers')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header" style="display:flex; justify-content:space-between; align-items:center;">
    <div>
      <h2 data-translate="biomarkers">Biomarker Trends</h2>
      <p>Track your essential vitamins and minerals through clinical data</p>
    </div>
    <div style="display:flex; gap:12px;">
      <button onclick="openModal('biomarkerModal')" style="background:var(--primary-color); color:white; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-plus"></i> Add Result</button>
      <button id="autoFillBiomarkersBtn" style="background:#eee; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-magic"></i> Auto-Fill</button>
    </div>
  </header>

  <div id="biomarkersGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:24px;"></div>

  <!-- Biomarker Add Modal -->
  <div class="modal" id="biomarkerModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add Biomarker Result</h3>
        <button onclick="closeModal('biomarkerModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Biomarker Name</label>
        <input type="text" id="bioAddName" placeholder="e.g. Zinc, Vitamin D">
      </div>
      <div class="form-group">
        <label>Result Value</label>
        <input type="text" id="bioAddVal" placeholder="e.g. 58.4">
      </div>
      <div class="form-group">
        <label>Unit</label>
        <input type="text" id="bioAddUnit" placeholder="e.g. ng/mL, mg/dL" value="ng/mL">
      </div>
      <div class="form-group">
        <label>Optimal Range</label>
        <input type="text" id="bioAddRange" placeholder="e.g. 30-100" value="30-100">
      </div>
      <button class="btn-add" id="saveBiomarkerBtn" style="width:100%; padding:12px; margin-top:16px;">Add Lab Result</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// STACKS.HTML
const stacksHTML = `
${htmlHead('Active Stacks')}
${sidebarHTML('stacks')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header" style="display:flex; justify-content:space-between; align-items:center;">
    <div>
      <h2 data-translate="active_stacks">Active Stacks</h2>
      <p>Combine multiple supplements for synergetic health benefits</p>
    </div>
    <button onclick="openModal('stackModal')" style="background:var(--primary-color); color:white; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-plus"></i> Create Stack</button>
  </header>

  <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:24px;" id="stacksGrid"></div>

  <!-- Create Stack Modal -->
  <div class="modal" id="stackModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Create Supplement Stack</h3>
        <button onclick="closeModal('stackModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Stack Name</label>
        <input type="text" id="stackAddName" placeholder="e.g. Anti-Aging Formula">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" id="stackAddDesc" placeholder="e.g. Cellular recovery and DNA preservation">
      </div>
      <div class="form-group">
        <label>Supplements (comma separated)</label>
        <input type="text" id="stackAddItems" placeholder="e.g. Vitamin C, Zinc, Resveratrol">
      </div>
      <button class="btn-add" id="saveStackBtn" style="width:100%; padding:12px; margin-top:16px;">Create Custom Stack</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// REMINDERS.HTML
const remindersHTML = `
${htmlHead('Reminders')}
${sidebarHTML('reminders')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header" style="display:flex; justify-content:space-between; align-items:center;">
    <div>
      <h2 data-translate="reminders">Smart Reminders</h2>
      <p>Keep your health tracking fully aligned and never miss a supplement</p>
    </div>
    <button onclick="openModal('reminderModal')" style="background:var(--primary-color); color:white; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-plus"></i> Add Reminder</button>
  </header>

  <div class="card" style="margin-bottom:24px;">
    <h3 style="margin-bottom:16px;">Active Reminders List</h3>
    <div id="remindersGrid" style="display:flex; flex-direction:column; gap:16px;"></div>
  </div>

  <!-- Add Reminder Modal -->
  <div class="modal" id="reminderModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add Smart Reminder</h3>
        <button onclick="closeModal('reminderModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Reminder Name</label>
        <input type="text" id="remAddName" placeholder="e.g. Evening Magnesium Stack">
      </div>
      <div class="form-group">
        <label>Time</label>
        <input type="text" id="remAddTime" placeholder="e.g. 09:30 PM">
      </div>
      <button class="btn-add" id="saveReminderBtn" style="width:100%; padding:12px; margin-top:16px;">Add Smart Reminder</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// HYDRATION.HTML
const hydrationHTML = `
${htmlHead('Hydration')}
${sidebarHTML('hydration')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header">
    <h2 data-translate="hydration">Water Tracker</h2>
    <p>Track your water intake throughout the day</p>
  </header>

  <div style="display:grid; grid-template-columns: 1fr 1.5fr; gap:32px;">
    <div class="card" style="text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 24px;">
      <div style="width:200px; height:200px; border-radius:50%; border:12px solid var(--primary-light); border-top-color:var(--primary-color); display:flex; flex-direction:column; align-items:center; justify-content:center; margin-bottom:24px; position:relative;">
        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">DRANK TODAY</span>
        <h3 style="font-size:36px; margin:8px 0;" id="hydrationLiters">0.0 L</h3>
        <span style="font-size:12px; color:var(--text-muted);">Target: 3.0 L</span>
      </div>
      
      <div style="display:flex; gap:12px; width:100%;">
        <button class="btn-primary" style="flex:1;" onclick="addWater(250)">+ 250ml</button>
        <button class="btn-primary" style="flex:1;" onclick="addWater(500)">+ 500ml</button>
        <button style="flex:1; background:#eee; border:none; padding:12px; border-radius:8px; font-weight:600; cursor:pointer;" onclick="openModal('waterModal')"><span data-translate="custom_amount">Custom</span></button>
      </div>
      
      <button onclick="resetHydration()" style="margin-top:16px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px;"><i class="fas fa-redo"></i> Reset Hydration</button>
    </div>

    <div class="card">
      <h3 style="margin-bottom:16px;">Hydration History</h3>
      <div id="hydrationHistory" style="display:flex; flex-direction:column; gap:12px;"></div>
    </div>
  </div>

  <!-- Custom Water Modal -->
  <div class="modal" id="waterModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Custom Water Intake</h3>
        <button onclick="closeModal('waterModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group">
        <label>Amount (ml)</label>
        <input type="number" id="waterAddAmount" placeholder="e.g. 750">
      </div>
      <button class="btn-add" id="saveWaterBtn" style="width:100%; padding:12px; margin-top:16px;">Add Water</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// INSIGHTS.HTML
const insightsHTML = `
${htmlHead('Health Insights')}
${sidebarHTML('insights')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header">
    <h2 data-translate="health_insights">Health Insights</h2>
    <p>Scientific research compiled into digestible, actionable knowledge</p>
  </header>

  <div style="display:grid; grid-template-columns: 250px 1fr; gap:32px;">
    <div>
      <div class="card" style="padding:16px;">
        <h4 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted); font-weight:700;">CATEGORIES</h4>
        <div style="display:flex; flex-direction:column; gap:8px;" id="insightCategoryFilters">
          <button style="text-align:left; background:var(--primary-light); color:var(--primary-color); border:none; padding:12px; border-radius:8px; cursor:pointer; font-weight:600;" onclick="filterInsights('All')">All Categories</button>
          <button style="text-align:left; background:none; border:none; padding:12px; border-radius:8px; cursor:pointer; color:var(--text-dark);" onclick="filterInsights('Biohacking')">Biohacking</button>
          <button style="text-align:left; background:none; border:none; padding:12px; border-radius:8px; cursor:pointer; color:var(--text-dark);" onclick="filterInsights('Sleep Science')">Sleep Science</button>
          <button style="text-align:left; background:none; border:none; padding:12px; border-radius:8px; cursor:pointer; color:var(--text-dark);" onclick="filterInsights('Nutrition')">Nutrition</button>
          <button style="text-align:left; background:none; border:none; padding:12px; border-radius:8px; cursor:pointer; color:var(--text-dark);" onclick="filterInsights('Longevity')">Longevity</button>
          <button style="text-align:left; background:none; border:none; padding:12px; border-radius:8px; cursor:pointer; color:var(--text-dark);" onclick="filterInsights('Metabolism')">Metabolism</button>
        </div>
      </div>
    </div>

    <div>
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:24px;" id="insightsContainer"></div>
    </div>
  </div>

  <!-- Modal Article details -->
  <div class="modal" id="articleModal" style="z-index:9999;">
    <div class="modal-content" style="width:640px;">
      <div class="modal-header">
        <h3 id="modalArticleTitle">Article</h3>
        <button onclick="closeModal('articleModal')" style="background:none; border:none; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div id="modalArticleCover" style="height:200px; border-radius:8px; overflow:hidden; margin-bottom:12px;"></div>
      <div id="modalArticleCitation" style="font-size:12px; color:var(--primary-color); font-weight:700; margin-bottom:12px;"></div>
      <p id="modalArticleBody" style="line-height:1.8; font-size:15px; color:var(--text-dark); max-height:250px; overflow-y:auto;"></p>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// FEED.HTML (NEW)
const feedHTML = `
${htmlHead('Community Feed')}
${sidebarHTML('feed')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header">
    <h2 data-translate="community_feed">VitaShare Community</h2>
    <p>Share and read expert biohacking insights on this health social network</p>
  </header>

  <div style="display:grid; grid-template-columns: 2fr 1fr; gap:32px;">
    
    <div>
      <!-- Custom Post Form -->
      <div class="card" style="padding:20px; margin-bottom:24px;">
        <div style="display:flex; gap:16px;">
          <div class="tweet-avatar" id="feedMyAvatar"></div>
          <div style="flex:1;">
            <textarea id="tweetInput" placeholder="What's happening in your biohacking stack today?" style="width:100%; border:none; font-size:16px; outline:none; resize:none; min-height:80px; font-family:inherit; background:none; color:var(--text-dark);"></textarea>
            <div style="display:flex; justify-content:flex-end; border-top:1px solid var(--border-color); padding-top:12px; margin-top:12px;">
              <button onclick="postTweet()" class="btn-primary" style="width:auto; padding:8px 24px; border-radius:30px; font-weight:700;">Share</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Feed Container -->
      <div id="tweetsContainer" style="display:flex; flex-direction:column; gap:0; border:1px solid var(--border-color); border-radius:16px; overflow:hidden;"></div>
    </div>

    <div>
      <div class="card" style="margin-bottom:24px;">
        <h4 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Trending Topics</h4>
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div>
            <span style="font-size:12px; color:var(--text-muted);">#Longevity &bull; Trending</span>
            <strong style="display:block; font-size:14px; margin-top:4px;">NMN & NAD+ Activators</strong>
          </div>
          <div>
            <span style="font-size:12px; color:var(--text-muted);">#Biohacking &bull; Trending</span>
            <strong style="display:block; font-size:14px; margin-top:4px;">Caffeine L-Theanine Stack</strong>
          </div>
          <div>
            <span style="font-size:12px; color:var(--text-muted);">#Nutrition &bull; Trending</span>
            <strong style="display:block; font-size:14px; margin-top:4px;">Magnesium Glycinate for REM</strong>
          </div>
        </div>
      </div>
    </div>

  </div>
</main>
${htmlFoot()}
`;

// PROFILE.HTML
const profileHTML = `
${htmlHead('Profile')}
${sidebarHTML('profile')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <div style="display:grid; grid-template-columns: 1fr 1.5fr; gap:32px;">
    
    <div>
      <div class="card" style="text-align:center; padding:32px 24px; margin-bottom:24px; position:relative;">
        <button onclick="openModal('profileEditModal')" style="position:absolute; top:20px; right:20px; background:none; border:none; color:var(--primary-color); cursor:pointer; font-size:18px;"><i class="fas fa-pencil-alt"></i></button>
        
        <div style="width:120px; height:120px; border-radius:50%; overflow:hidden; margin:0 auto 16px; border:4px solid var(--primary-light); background:#f0f0f0; display:flex; align-items:center; justify-content:center;" id="profileImageContainer"></div>
        
        <h3 style="font-size:20px; font-weight:700;" id="profileName">Dr. Julian Vance</h3>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:24px;" id="profileTitle">Chief of Metabolism Research</p>
        
        <div style="display:flex; justify-content:space-around; border-top:1px solid var(--border-color); padding-top:20px;">
          <div>
            <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Height</span>
            <div style="font-size:18px; font-weight:700; margin-top:4px;"><span id="heightVal">185</span> cm</div>
          </div>
          <div>
            <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Weight</span>
            <div style="font-size:18px; font-weight:700; margin-top:4px;"><span id="weightVal">82.4</span> kg</div>
          </div>
          <div>
            <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600;">BMI</span>
            <div style="font-size:18px; font-weight:700; margin-top:4px;" id="bmiVal">24.1</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:16px; font-size:16px;">Health Conditions</h3>
        <div style="display:flex; flex-wrap:wrap; gap:8px;" id="profileConditionsContainer"></div>
      </div>
    </div>

    <div>
      <div class="card" style="margin-bottom:24px;">
        <h3 style="margin-bottom:16px;">Metabolic Vitality</h3>
        <div style="height:200px; display:flex; align-items:flex-end; justify-content:space-around; padding-top:20px; border-bottom:2px solid var(--border-color);">
          <div style="text-align:center; width:40px;">
            <div style="height:120px; background:var(--primary-light); width:100%; border-radius:4px 4px 0 0; position:relative;">
              <div style="position:absolute; bottom:0; left:0; width:100%; height:80px; background:var(--primary-color); border-radius:4px 4px 0 0;"></div>
            </div>
            <span style="font-size:12px; color:var(--text-muted); margin-top:8px; display:block;">Mon</span>
          </div>
          <div style="text-align:center; width:40px;">
            <div style="height:120px; background:var(--primary-light); width:100%; border-radius:4px 4px 0 0; position:relative;">
              <div style="position:absolute; bottom:0; left:0; width:100%; height:95px; background:var(--primary-color); border-radius:4px 4px 0 0;"></div>
            </div>
            <span style="font-size:12px; color:var(--text-muted); margin-top:8px; display:block;">Tue</span>
          </div>
          <div style="text-align:center; width:40px;">
            <div style="height:120px; background:var(--primary-light); width:100%; border-radius:4px 4px 0 0; position:relative;">
              <div style="position:absolute; bottom:0; left:0; width:100%; height:75px; background:var(--primary-color); border-radius:4px 4px 0 0;"></div>
            </div>
            <span style="font-size:12px; color:var(--text-muted); margin-top:8px; display:block;">Wed</span>
          </div>
          <div style="text-align:center; width:40px;">
            <div style="height:120px; background:var(--primary-light); width:100%; border-radius:4px 4px 0 0; position:relative;">
              <div style="position:absolute; bottom:0; left:0; width:100%; height:110px; background:var(--primary-color); border-radius:4px 4px 0 0;"></div>
            </div>
            <span style="font-size:12px; color:var(--text-muted); margin-top:8px; display:block;">Thu</span>
          </div>
          <div style="text-align:center; width:40px;">
            <div style="height:120px; background:var(--primary-light); width:100%; border-radius:4px 4px 0 0; position:relative;">
              <div style="position:absolute; bottom:0; left:0; width:100%; height:85px; background:var(--primary-color); border-radius:4px 4px 0 0;"></div>
            </div>
            <span style="font-size:12px; color:var(--text-muted); margin-top:8px; display:block;">Fri</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:24px;" data-translate="preferences">Preferences</h3>
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="display:block;" data-translate="daily_reminders">Daily Reminders</strong>
              <span style="font-size:12px; color:var(--text-muted);">Receive smart push notifications</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="display:block;" data-translate="icloud_sync">iCloud Sync</strong>
              <span style="font-size:12px; color:var(--text-muted);">Sync database across devices</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="display:block;" data-translate="biometric_login">Biometric Login (FaceID)</strong>
              <span style="font-size:12px; color:var(--text-muted);">Use device facial recognition</span>
            </div>
            <input type="checkbox" style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="display:block;" data-translate="offline_caching">Offline Local Caching</strong>
              <span style="font-size:12px; color:var(--text-muted);">Fast cache memory allocation</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="display:block;" data-translate="automated_spacing">Automated Spacing Alerts</strong>
              <span style="font-size:12px; color:var(--text-muted);">Warning sound for mineral spacing</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="display:block;" data-translate="email_summary">Weekly Email Summary</strong>
              <span style="font-size:12px; color:var(--text-muted);">Get full metabolic tracking report</span>
            </div>
            <input type="checkbox" style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="display:block;" data-translate="pdf_report">Weekly Report PDF Export</strong>
              <span style="font-size:12px; color:var(--text-muted);">Save clinical tracking reports</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top: 1px solid var(--border-color); padding-top: 16px;">
            <div>
              <strong style="display:block;">Bilingual Engine</strong>
              <span style="font-size:12px; color:var(--text-muted);">Language preference toggler</span>
            </div>
            <select style="padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); font-weight:600; cursor:pointer;" onchange="changeLanguage(this.value)">
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Profile Edit Modal -->
  <div class="modal" id="profileEditModal" style="z-index:9999; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; align-items:center; justify-content:center;">
    <div class="modal-content" style="width: 780px; max-width:95%; background:white; padding:24px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.15);">
      <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:20px;">
        <h3>Edit Personal Information</h3>
        <button onclick="closeModal('profileEditModal')" style="background:none; border:none; font-size:18px; cursor:pointer; color:var(--text-muted);"><i class="fas fa-times"></i></button>
      </div>
      
      <!-- Sleek Unified Single-Row / Horizontal Flex Bar Layout -->
      <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-end;">
        <div class="form-group" style="flex:1.2; min-width:180px; margin-bottom:0;">
          <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px;">Full Name</label>
          <input type="text" id="profileAddName" placeholder="Julian Vance" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color);">
        </div>
        <div class="form-group" style="flex:1.5; min-width:220px; margin-bottom:0;">
          <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px;">Title / Profession</label>
          <input type="text" id="profileAddTitle" placeholder="Doctor / Medical Scientist" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color);">
        </div>
        <div class="form-group" style="flex:0.6; min-width:90px; margin-bottom:0;">
          <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px;">Height (cm)</label>
          <input type="number" id="profileAddHeight" placeholder="185" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color);">
        </div>
        <div class="form-group" style="flex:0.6; min-width:90px; margin-bottom:0;">
          <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px;">Weight (kg)</label>
          <input type="number" id="profileAddWeight" placeholder="82" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color);">
        </div>
      </div>
      
      <div style="margin-top:20px; border-top:1px solid var(--border-color); padding-top:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div class="form-group" style="margin-bottom:0; flex:1; min-width:200px;">
          <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px;">Profile Avatar URL</label>
          <input type="text" id="profileImageUrl" placeholder="https://images.unsplash.com/... or upload" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color);">
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <button class="btn-primary" id="saveProfileBtn" style="padding:12px 24px; font-weight:700; border-radius:8px;">Save Changes</button>
          <button onclick="closeModal('profileEditModal')" style="background:#eee; color:var(--text-dark); border:none; padding:12px 20px; border-radius:8px; font-weight:700; cursor:pointer;">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Condition Add Modal with Rich Pre-populated Suggestions -->
  <div class="modal" id="conditionModal" style="z-index:9999; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; align-items:center; justify-content:center;">
    <div class="modal-content" style="width: 500px; max-width:90%; background:white; padding:24px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.15);">
      <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:16px;">
        <h3>Add Health Condition</h3>
        <button onclick="closeModal('conditionModal')" style="background:none; border:none; font-size:18px; cursor:pointer; color:var(--text-muted);"><i class="fas fa-times"></i></button>
      </div>
      <div class="form-group" style="margin-bottom:16px;">
        <label style="font-size:12px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px;">Condition Name / Nama Kondisi</label>
        <input type="text" id="conditionAddName" placeholder="e.g. Iron Deficiency" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border-color);">
      </div>
      
      <!-- Pre-populated Clickable Health Conditions Suggestion Grid -->
      <div style="margin-top: 16px; margin-bottom: 20px;">
        <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:10px;">Quick Recommendations / Rekomendasi Cepat</label>
        <div style="display:flex; flex-wrap:wrap; gap:8px;" id="quickConditionSuggestions">
          <span class="suggestion-pill" onclick="selectConditionSuggestion('Iron Deficiency')" style="background:var(--bg-color); border:1px solid var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:600; color:var(--text-dark); transition:all 0.2s;">Iron Deficiency ðŸ©¸</span>
          <span class="suggestion-pill" onclick="selectConditionSuggestion('Vitamin D Deficiency')" style="background:var(--bg-color); border:1px solid var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:600; color:var(--text-dark); transition:all 0.2s;">Vitamin D Deficiency â˜€ï¸</span>
          <span class="suggestion-pill" onclick="selectConditionSuggestion('Insomnia')" style="background:var(--bg-color); border:1px solid var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:600; color:var(--text-dark); transition:all 0.2s;">Insomnia ðŸŒ™</span>
          <span class="suggestion-pill" onclick="selectConditionSuggestion('Insulin Resistance')" style="background:var(--bg-color); border:1px solid var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:600; color:var(--text-dark); transition:all 0.2s;">Insulin Resistance ðŸ§¬</span>
          <span class="suggestion-pill" onclick="selectConditionSuggestion('Hypertension')" style="background:var(--bg-color); border:1px solid var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:600; color:var(--text-dark); transition:all 0.2s;">Hypertension ðŸ©º</span>
          <span class="suggestion-pill" onclick="selectConditionSuggestion('Joint Pain')" style="background:var(--bg-color); border:1px solid var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:600; color:var(--text-dark); transition:all 0.2s;">Joint Pain ðŸ¦´</span>
          <span class="suggestion-pill" onclick="selectConditionSuggestion('Lactose Intolerance')" style="background:var(--bg-color); border:1px solid var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:600; color:var(--text-dark); transition:all 0.2s;">Lactose Intolerance ðŸ¥›</span>
        </div>
      </div>
      
      <button class="btn-add" id="saveConditionBtn" style="width:100%; padding:12px; margin-top:16px;">Add Condition</button>
    </div>
  </div>
</main>
${htmlFoot()}
`;

// SETTINGS.HTML
const settingsHTML = `
${htmlHead('Settings')}
${sidebarHTML('settings')}
<main class="main-content">
  <button onclick="history.back()" style="background:none; border:none; color:var(--text-muted); font-size:14px; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; gap:6px;"><i class="fas fa-arrow-left"></i> <span data-translate="back">Back</span></button>
  <header class="header">
    <h2 data-translate="settings">Settings / Pengaturan</h2>
    <p>Configure app preference preferences, dark mode, and database backups</p>
  </header>

  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:32px;">
    
    <div>
      <div class="card" style="margin-bottom:24px;">
        <h3 style="margin-bottom:16px;"><i class="fas fa-eye"></i> Appearance</h3>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <strong>Dark Mode Switch</strong>
            <span style="font-size:12px; color:var(--text-muted); display:block;">Toggle low light color themes</span>
          </div>
          <label class="switch">
            <input type="checkbox" id="darkModeToggle" onchange="toggleDarkMode(this.checked)">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="card" style="margin-bottom:24px;">
        <h3 style="margin-bottom:16px;"><i class="fas fa-database"></i> Backup & Database</h3>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:20px;">VitaSync works completely offline-first. Restoring or resetting your local database is simple.</p>
        
        <div style="display:flex; gap:12px; margin-bottom:12px;">
          <button onclick="exportDataBackup()" style="flex:1; background:var(--primary-color); color:white; border:none; padding:12px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-file-export"></i> Export JSON</button>
          <button onclick="importDataBackup()" style="flex:1; background:#eee; border:none; padding:12px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-file-import"></i> Import JSON</button>
        </div>

        <button onclick="backupToGoogleDrive()" style="width:100%; background:#4285f4; color:white; border:none; padding:12px; border-radius:8px; font-weight:600; cursor:pointer; margin-bottom:12px;"><i class="fab fa-google-drive"></i> <span data-translate="backup_google">Backup to Google Drive</span></button>
        
        <button onclick="clearDatabase()" style="width:100%; border:1px solid var(--danger); background:none; color:var(--danger); padding:12px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-trash-alt"></i> Clear Local Storage</button>
      </div>
    </div>

    <div>
      <div class="card" style="margin-bottom:24px;">
        <h3 style="margin-bottom:24px;"><i class="fas fa-sliders-h"></i> System Controls</h3>
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>Sound Notifications</strong>
              <span style="font-size:12px; color:var(--text-muted);">Sound feedback for timers</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>Connected Apps</strong>
              <span style="font-size:12px; color:var(--text-muted);">Sync to Apple Health & Google Fit</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>High Risk Warnings</strong>
              <span style="font-size:12px; color:var(--text-muted);">Strict biochemical spacing checks</span>
            </div>
            <input type="checkbox" checked style="width:20px; height:20px;">
          </div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:16px;"><i class="fas fa-share-alt"></i> Sharing</h3>
        <button onclick="inviteFriends()" style="width:100%; background:var(--primary-light); color:var(--primary-color); border:none; padding:12px; border-radius:8px; font-weight:600; cursor:pointer; margin-bottom:12px;"><i class="fas fa-user-plus"></i> <span data-translate="invite_friends">Invite Friends & Family</span></button>
        <button onclick="showOnboardingAgain()" style="width:100%; background:#eee; border:none; padding:12px; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fas fa-redo"></i> Reset Intro Tutorial</button>
      </div>
    </div>

  </div>
</main>
${htmlFoot()}
`;

fs.writeFileSync('index.html', indexHTML);
fs.writeFileSync('schedule.html', scheduleHTML);
fs.writeFileSync('supplements.html', supplementsHTML);
fs.writeFileSync('interactions.html', interactionsHTML);
fs.writeFileSync('scanner.html', scannerHTML);
fs.writeFileSync('biomarkers.html', biomarkersHTML);
fs.writeFileSync('stacks.html', stacksHTML);
fs.writeFileSync('reminders.html', remindersHTML);
fs.writeFileSync('hydration.html', hydrationHTML);
fs.writeFileSync('insights.html', insightsHTML);
fs.writeFileSync('feed.html', feedHTML);
fs.writeFileSync('profile.html', profileHTML);
fs.writeFileSync('settings.html', settingsHTML);

console.log('13 HTML Files generated successfully.');

