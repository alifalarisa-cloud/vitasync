const fs = require('fs');
const path = require('path');

const newSidebar = `
  <aside class="sidebar" id="sidebar">
    <div class="brand"><h1>VitaSync</h1><p>Pharmacy Grade</p></div>
    <ul class="nav-links">
      <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-th-large"></i> Dashboard</a></li>
      <li class="nav-item"><a href="schedule.html" class="nav-link"><i class="far fa-calendar-alt"></i> Schedule</a></li>
      <li class="nav-item"><a href="supplements.html" class="nav-link"><i class="fas fa-pills"></i> My Supplements</a></li>
      <li class="nav-item"><a href="interactions.html" class="nav-link"><i class="fas fa-shield-alt"></i> Interactions</a></li>
      <li class="nav-item"><a href="scanner.html" class="nav-link"><i class="fas fa-camera"></i> Label Scanner</a></li>
      <li class="nav-item"><a href="biomarkers.html" class="nav-link"><i class="fas fa-chart-line"></i> Biomarkers</a></li>
      <li class="nav-item"><a href="stacks.html" class="nav-link"><i class="fas fa-layer-group"></i> Active Stacks</a></li>
      <li class="nav-item"><a href="reminders.html" class="nav-link"><i class="fas fa-bell"></i> Reminders</a></li>
      <li class="nav-item"><a href="hydration.html" class="nav-link"><i class="fas fa-tint"></i> Hydration</a></li>
      <li class="nav-item"><a href="insights.html" class="nav-link"><i class="fas fa-lightbulb"></i> Health Insights</a></li>
      <li class="nav-item"><a href="profile.html" class="nav-link"><i class="fas fa-user"></i> Profile</a></li>
    </ul>
    <div class="sidebar-bottom">
      <button class="btn-add"><i class="fas fa-plus"></i> Add Supplement</button>
      <a href="#" class="nav-link"><i class="fas fa-cog"></i> Settings</a>
    </div>
  </aside>
`;

const files = ['index.html', 'schedule.html', 'supplements.html', 'interactions.html', 'scanner.html', 'biomarkers.html', 'stacks.html', 'reminders.html', 'hydration.html'];

files.forEach(file => {
  if(fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<aside class="sidebar" id="sidebar">[\s\S]*?<\/aside>/, newSidebar.trim());
    
    // For supplements.html, empty the grid
    if(file === 'supplements.html') {
      content = content.replace(/<div class="supplements-grid">[\s\S]*?<\/main>/, '<div class="supplements-grid" id="supplementsGrid"></div></main>');
      // Add data.js
      if(!content.includes('data.js')) {
        content = content.replace('<script src="app.js"></script>', '<script src="data.js"></script>\n  <script src="app.js"></script>');
      }
    }
    // Same for others if needed
    if(!content.includes('data.js')) {
        content = content.replace('<script src="app.js"></script>', '<script src="data.js"></script>\n  <script src="app.js"></script>');
    }
    
    fs.writeFileSync(file, content);
  }
});
console.log('Sidebar updated in all files.');
