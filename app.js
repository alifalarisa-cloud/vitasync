// --- VitaSync Application Logic ---

// 1. Initial State Definition with LocalStorage Fallback
const defaultState = {
  schedule: [
    { time: '08:00 AM', name: 'Vitamin D3', slot: 'morning', notes: '5000 IU with breakfast', taken: true },
    { time: '08:30 AM', name: 'L-Theanine', slot: 'morning', notes: '200mg for calm focus', taken: false },
    { time: '01:00 PM', name: 'Iron Bisglycinate', slot: 'midday', notes: '25mg on empty stomach', taken: false },
    { time: '01:30 PM', name: 'Calcium Carbonate', slot: 'midday', notes: '500mg with lunch', taken: false },
    { time: '09:30 PM', name: 'Magnesium Glycinate', slot: 'evening', notes: '400mg before bed', taken: false }
  ],
  supplements: [],
  biomarkers: [],
  stacks: [],
  reminders: [],
  hydration: {
    amount: 1.2,
    history: [
      { amount: 250, time: '08:15 AM' },
      { amount: 500, time: '10:30 AM' },
      { amount: 450, time: '02:00 PM' }
    ]
  },
  profile: {
    name: 'Dr. Julian Vance',
    title: 'Chief of Metabolism Research',
    height: 185,
    weight: 82.4,
    photo: '', // Empty triggers default neutral SVG avatar
    conditions: ['Iron Deficiency', 'Circadian Phase Delay']
  },
  interactions: {
    checkedSupps: ['Iron Bisglycinate', 'Calcium Carbonate'],
    checkedFoods: ['Coffee', 'Dairy']
  },
  settings: {
    darkMode: false,
    notifications: true,
    icloudSync: true,
    sound: true
  },
  language: 'en',
  tweets: [
    { id: 't_1', name: 'Dr. Rhonda Patrick', handle: '@foundmyfitness', textEn: 'Consuming 2-3g of EPA/DHA Omega-3 daily decreases chronic inflammatory markers by up to 25%. Ensure your brand is third-party batch tested!', textId: 'Mengonsumsi Omega-3 EPA/DHA 2-3g setiap hari menurunkan biomarker inflamasi hingga 25%. Pastikan merk Anda teruji lab!', likes: 1420, retweets: 382, liked: false, retweeted: false },
    { id: 't_2', name: 'Bryan Johnson', handle: '@bryan_johnson', textEn: 'My morning stack includes NMN, CoQ10, and Ashwagandha KSM-66. We measured a significant decline in arterial age indices using precise ultrasound tests.', textId: 'Stack pagi saya meliputi NMN, CoQ10, dan Ashwagandha KSM-66. Kami mengukur penurunan indeks penuaan arteri menggunakan tes USG.', likes: 2590, retweets: 620, liked: false, retweeted: false },
    { id: 't_3', name: 'Dr. David Sinclair', handle: '@davidsinclair', textEn: 'Sirtuin activation requires cellular NAD+. Taking NMN alongside healthy fat options like yogurt or olive oil improves absorption rates.', textId: 'Aktivasi Sirtuin membutuhkan NAD+ seluler. Mengonsumsi NMN bersama makanan berlemak sehat seperti yogurt atau minyak zaitun meningkatkan penyerapan.', likes: 4890, retweets: 1205, liked: false, retweeted: false }
  ]
};

// Retrieve localStorage state or merge defaults
function getLocal(key, def) {
  const val = localStorage.getItem(key);
  if (!val) return def;
  try {
    return JSON.parse(val);
  } catch(e) {
    return def;
  }
}

function setLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const state = {
  schedule: getLocal('vitaSchedule', defaultState.schedule),
  supplements: getLocal('vitaSupplements', []),
  biomarkers: getLocal('vitaBiomarkers', []),
  stacks: getLocal('vitaStacks', []),
  reminders: getLocal('vitaReminders', []),
  hydration: getLocal('vitaHydration', defaultState.hydration),
  profile: getLocal('vitaProfile', defaultState.profile),
  interactions: getLocal('vitaInteractions', defaultState.interactions),
  settings: getLocal('vitaSettings', defaultState.settings),
  language: getLocal('vitaLang', 'en'),
  tweets: getLocal('vitaTweets', defaultState.tweets),
  symptoms: getLocal('vitaSymptoms', { mood: '', energy: '', sleep: '', focus: '' })
};

// Load defaults from data.js if empty
if (typeof vitaData !== 'undefined') {
  if (state.supplements.length === 0) {
    state.supplements = [...vitaData.supplements];
    setLocal('vitaSupplements', state.supplements);
  }
  if (state.biomarkers.length === 0) {
    state.biomarkers = [...vitaData.biomarkers];
    setLocal('vitaBiomarkers', state.biomarkers);
  }
  if (state.stacks.length === 0) {
    state.stacks = [...vitaData.activeStacks];
    setLocal('vitaStacks', state.stacks);
  }
  if (state.reminders.length === 0) {
    state.reminders = [...vitaData.reminders];
    setLocal('vitaReminders', state.reminders);
  }
}

// 2. Theme Management (Dark Mode)
function initTheme() {
  if (state.settings.darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  const el = document.getElementById('darkModeToggle');
  if (el) el.checked = state.settings.darkMode;
}
initTheme();

window.toggleDarkMode = function(checked) {
  state.settings.darkMode = checked;
  setLocal('vitaSettings', state.settings);
  initTheme();
  showToast(checked ? 'Dark Mode Activated' : 'Light Mode Activated');
};

// 3. Modal Opening & Closing Utilities
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
};

// 4. Undo Action Stack (State Rollback)
window.undoStack = [];
window.pushToUndo = function(key, prevValue) {
  window.undoStack.push({ key, value: JSON.parse(JSON.stringify(prevValue)) });
};

window.triggerUndo = function() {
  if (window.undoStack.length === 0) {
    showToast(state.language === 'en' ? 'Nothing to undo' : 'Tidak ada tindakan untuk dibatalkan', true);
    return;
  }
  const lastAction = window.undoStack.pop();
  state[lastAction.key] = lastAction.value;
  setLocal('vita' + lastAction.key.charAt(0).toUpperCase() + lastAction.key.slice(1), lastAction.value);
  
  // Re-render based on active page
  renderDashboard();
  renderSchedule();
  renderSupplements();
  renderInteractions();
  renderBiomarkers();
  renderStacks();
  renderReminders();
  renderHydration();
  renderTweets();

  showToast(state.language === 'en' ? 'Action undone successfully!' : 'Tindakan berhasil dibatalkan!');
};

// Standard Toast Notification supporting Undo
window.showToast = function(msg, isError = false) {
  const t = document.getElementById('toastMessage');
  if (!t) return;
  
  if (window.undoStack.length > 0 && !isError) {
    const undoText = state.language === 'en' ? 'Undo' : 'Batal';
    t.innerHTML = `${msg} <a href="#" onclick="event.preventDefault(); triggerUndo();" style="color:#ffe082; margin-left:12px; text-decoration:underline; font-weight:700;">${undoText}</a>`;
  } else {
    t.innerText = msg;
  }
  
  t.style.background = isError ? 'var(--danger)' : 'var(--primary-color)';
  t.style.display = 'block';
  setTimeout(() => {
    t.style.display = 'none';
  }, 4000);
};

// 5. Bilingual Engine
window.changeLanguage = function(lang) {
  state.language = lang;
  setLocal('vitaLang', lang);
  translateApp();
  
  // Re-render translated templates
  renderDashboard();
  renderSchedule();
  renderInteractions();
  renderInsights();
  renderTweets();
  
  showToast(lang === 'en' ? 'Language switched to English' : 'Bahasa diganti ke Indonesia');
};

function translateApp() {
  const dict = typeof vitaData !== 'undefined' ? vitaData.translations[state.language] : {};
  if (!dict) return;

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });
}

// Default neutral user profile SVG placeholder
const neutralAvatarSVG = `
<svg viewBox="0 0 100 100" style="width:100%; height:100%; fill:#888;">
  <circle cx="50" cy="35" r="20"></circle>
  <path d="M50,60 C30,60 15,75 15,90 L85,90 C85,75 70,60 50,60 Z"></path>
</svg>
`;

// --- Global Date ---
const dEl = document.getElementById('todayDate');
if (dEl) {
  const opts = { weekday: 'long', month: 'short', day: 'numeric' };
  dEl.innerHTML = `${new Date().toLocaleDateString(state.language === 'id' ? 'id-ID' : 'en-US', opts).toUpperCase()} &middot; Let's make today healthy.`;
}

// 6. Interaction Matrix & Detector Algorithmic Engine
const interactionMatrix = [
  { a: 'Iron Bisglycinate', b: 'Calcium Carbonate', type: 'supp-supp', severity: 'high', msg: 'Calcium blocks divalent metal iron transporters. Take them at least 4 hours apart.', msgId: 'Kalsium menghambat penyerapan Zat Besi. Beri jarak minimal 4 jam.' },
  { a: 'Iron Bisglycinate', b: 'Coffee', type: 'supp-food', severity: 'high', msg: 'Coffee polyphenols chelate iron molecules, reducing biological absorption up to 80%. Take separately.', msgId: 'Polifenol kopi mengikat molekul zat besi dan memangkas penyerapan hingga 80%.' },
  { a: 'Calcium Carbonate', b: 'Coffee', type: 'supp-food', severity: 'moderate', msg: 'Caffeine slightly increases calcium excretion. Ensure proper biological spacing.', msgId: 'Kafein sedikit meningkatkan pembuangan kalsium. Beri jarak konsumsi.' },
  { a: 'Vitamin D3', b: 'Calcium Carbonate', type: 'supp-supp', severity: 'synergy', msg: 'Vitamin D3 significantly enhances biological calcium absorption from intestines.', msgId: 'Vitamin D3 meningkatkan penyerapan kalsium secara signifikan di usus.' },
  { a: 'Vitamin D3', b: 'Vitamin K2', type: 'supp-supp', severity: 'synergy', msg: 'Vitamin D3 increases calcium absorption while Vitamin K2 directs calcium to the bone matrix.', msgId: 'Vitamin D3 menyerap kalsium, Vitamin K2 mengarahkannya langsung ke tulang.' },
  { a: 'Ashwagandha KSM-66', b: 'Alcohol', type: 'supp-food', severity: 'moderate', msg: 'Both substances have GABAergic properties. Concurrent consumption increases sedation.', msgId: 'Keduanya meningkatkan aktivitas GABA. Konsumsi bersamaan memperkuat kantuk.' },
  { a: 'Berberine', b: 'Aspirin', type: 'supp-drug', severity: 'high', msg: 'Berberine inhibits platelet aggregation, creating increased bleeding risks when combined with aspirin.', msgId: 'Berberine menghambat pembekuan darah. Risiko pendarahan meningkat jika diminum bersama Aspirin.' }
];

function checkInteractions(listA, listB) {
  const detected = [];
  const combined = [...listA, ...listB];

  interactionMatrix.forEach(rule => {
    const hasA = combined.some(item => item.toLowerCase().includes(rule.a.toLowerCase()));
    const hasB = combined.some(item => item.toLowerCase().includes(rule.b.toLowerCase()));
    if (hasA && hasB) {
      detected.push(rule);
    }
  });

  return detected;
}

// 7. Dynamic Pipeline Callers
function renderDashboard() {
  const sList = document.getElementById('dashScheduleList');
  if (!sList) return;

  // Render Dashboard Schedule list
  sList.innerHTML = '';
  if (state.schedule.length === 0) {
    sList.innerHTML = `<p style="color:var(--text-muted); font-size:14px; text-align:center; padding:20px 0;">No items scheduled.</p>`;
  } else {
    state.schedule.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `schedule-card ${item.taken ? 'taken' : ''}`;
      card.innerHTML = `
        <div style="display:flex; align-items:center; gap:16px;">
          <input type="checkbox" ${item.taken ? 'checked' : ''} onclick="toggleTakeSchedule(${index})">
          <div>
            <strong style="display:block; font-size:15px;">${item.name}</strong>
            <span style="font-size:12px; color:var(--text-muted);">${item.time} &bull; ${item.notes}</span>
          </div>
        </div>
        <button onclick="deleteSchedule(${index})" style="background:none; border:none; color:var(--danger); cursor:pointer;"><i class="fas fa-trash"></i></button>
      `;
      sList.appendChild(card);
    });
  }

  // Populate Dashboard Schedule Selection
  const select = document.getElementById('dashScheduleNameSelect');
  if (select) {
    select.innerHTML = '';
    state.supplements.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.innerText = `${s.name} (${s.dose})`;
      select.appendChild(opt);
    });
  }

  // Update Summary Metrics
  const total = state.schedule.length;
  const taken = state.schedule.filter(s => s.taken).length;
  const percent = total > 0 ? Math.round((taken / total) * 100) : 0;
  
  const prog = document.getElementById('dashProgressVal');
  if (prog) prog.innerText = `${percent}%`;

  const takenEl = document.getElementById('dashTakenVal');
  if (takenEl) takenEl.innerText = `${taken} / ${total}`;

  const invEl = document.getElementById('dashInventoryVal');
  if (invEl) invEl.innerText = state.supplements.length;

  // Run dynamic interaction checker against scheduled supplements
  const scheduledNames = state.schedule.map(s => s.name);
  const activeWarnings = checkInteractions(scheduledNames, []);
  
  const warnVal = document.getElementById('dashWarningsVal');
  if (warnVal) warnVal.innerText = activeWarnings.length;

  const dList = document.getElementById('dashInteractionsList');
  if (dList) {
    dList.innerHTML = '';
    if (activeWarnings.length === 0) {
      dList.innerHTML = `
        <div class="card" style="border-left: 4px solid var(--success); display:flex; gap:16px; align-items:center;">
          <i class="fas fa-check-circle" style="color:var(--success); font-size:24px;"></i>
          <div>
            <strong style="display:block;">All Safe!</strong>
            <span style="font-size:12px; color:var(--text-muted);">No chemical or mineral conflicts in today's active schedule stack.</span>
          </div>
        </div>
      `;
    } else {
      activeWarnings.forEach(w => {
        const item = document.createElement('div');
        item.className = 'card';
        item.style.borderLeft = `4px solid ${w.severity === 'high' ? 'var(--danger)' : 'var(--warning)'}`;
        item.innerHTML = `
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong style="color:var(--danger); text-transform:uppercase; font-size:11px;">${w.severity} Warning</strong>
            <span style="font-size:12px; font-weight:700;">${w.a} &bull; ${w.b}</span>
          </div>
          <p style="font-size:13px; line-height:1.4;">${state.language === 'id' ? w.msgId : w.msg}</p>
        `;
        dList.appendChild(item);
      });
    }
  }

  // Render Premium Flo Symptoms
  renderSymptoms();
}

window.logSymptom = function(category, value) {
  state.symptoms[category] = value;
  setLocal('vitaSymptoms', state.symptoms);
  renderSymptoms();
  showToast(state.language === 'en' ? `Logged ${category} as ${value}` : `${category} tercatat sebagai ${value}`);
};

window.renderSymptoms = function() {
  const categories = ['mood', 'energy', 'sleep', 'focus'];
  let loggedCount = 0;
  categories.forEach(cat => {
    const val = state.symptoms[cat];
    // Clear active styling for all buttons in this category
    const container = document.getElementById(`${cat}SymptomList`);
    if (container) {
      const btns = container.querySelectorAll('button');
      btns.forEach(btn => {
        btn.style.background = 'none';
        btn.style.boxShadow = 'none';
        btn.style.transform = 'none';
      });
      if (val) {
        const activeBtn = document.getElementById(`symptom-${cat}-${val}`);
        if (activeBtn) {
          activeBtn.style.background = 'rgba(216,27,96,0.18)';
          activeBtn.style.boxShadow = '0 0 12px rgba(216,27,96,0.3)';
          activeBtn.style.transform = 'scale(1.25)';
          activeBtn.style.borderRadius = '50%';
        }
        loggedCount++;
      }
    }
  });

  const statusText = document.getElementById('symptomStatusText');
  if (statusText) {
    if (loggedCount === 4) {
      statusText.innerText = state.language === 'en' ? 'Fully Logged' : 'Tercatat Lengkap';
      statusText.style.background = '#e8f5e9';
      statusText.style.color = '#2e7d32';
    } else if (loggedCount > 0) {
      statusText.innerText = state.language === 'en' ? `${loggedCount}/4 Logged` : `${loggedCount}/4 Tercatat`;
      statusText.style.background = 'var(--primary-light)';
      statusText.style.color = 'var(--primary-color)';
    } else {
      statusText.innerText = state.language === 'en' ? 'Logged: None' : 'Belum Ada';
      statusText.style.background = '#eee';
      statusText.style.color = 'var(--text-muted)';
    }
  }
};

window.selectConditionSuggestion = function(name) {
  const input = document.getElementById('conditionAddName');
  if (input) {
    input.value = name;
    showToast(state.language === 'en' ? `Selected: ${name}` : `Terpilih: ${name}`);
  }
};

// 8. Schedule Management Functions
function renderSchedule() {
  const mList = document.getElementById('morningList');
  if (!mList) return;

  const lists = {
    morning: document.getElementById('morningList'),
    midday: document.getElementById('middayList'),
    evening: document.getElementById('eveningList')
  };

  Object.keys(lists).forEach(key => {
    lists[key].innerHTML = '';
    const filtered = state.schedule.filter(s => s.slot === key);
    
    if (filtered.length === 0) {
      lists[key].innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding:12px 0;">No active supplements in this slot.</p>`;
    } else {
      filtered.forEach((item) => {
        // Find index in global schedule array
        const origIndex = state.schedule.findIndex(s => s.name === item.name && s.time === item.time);
        const card = document.createElement('div');
        card.className = `schedule-card ${item.taken ? 'taken' : ''}`;
        card.innerHTML = `
          <div style="display:flex; align-items:center; gap:16px;">
            <input type="checkbox" ${item.taken ? 'checked' : ''} onclick="toggleTakeSchedule(${origIndex})">
            <div>
              <strong style="display:block; font-size:15px;">${item.name}</strong>
              <span style="font-size:12px; color:var(--text-muted);">${item.time} &bull; ${item.notes}</span>
            </div>
          </div>
          <button onclick="deleteSchedule(${origIndex})" style="background:none; border:none; color:var(--danger); cursor:pointer;"><i class="fas fa-trash"></i></button>
        `;
        lists[key].appendChild(card);
      });
    }
  });

  // Update schedule metrics
  const total = state.schedule.length;
  const taken = state.schedule.filter(s => s.taken).length;
  const percent = total > 0 ? Math.round((taken / total) * 100) : 0;

  const sub = document.getElementById('scheduleDateSub');
  if (sub) sub.innerText = `Today &middot; ${taken} of ${total} taken`;

  const bar = document.getElementById('scheduleProgressBar');
  if (bar) bar.style.width = `${percent}%`;

  const pct = document.getElementById('scheduleProgressPercent');
  if (pct) pct.innerText = `${percent}%`;
}

window.toggleTakeSchedule = function(index) {
  state.schedule[index].taken = !state.schedule[index].taken;
  setLocal('vitaSchedule', state.schedule);
  renderDashboard();
  renderSchedule();
  showToast(state.schedule[index].taken ? 'Supplement Diminum / Taken' : 'Dibatalkan / Unmarked taken');
};

window.deleteSchedule = function(index) {
  pushToUndo('schedule', state.schedule);
  state.schedule.splice(index, 1);
  setLocal('vitaSchedule', state.schedule);
  renderDashboard();
  renderSchedule();
  showToast(state.language === 'en' ? 'Item deleted from schedule' : 'Item dihapus dari jadwal');
};

// 9. Supplements Inventory Functions
function renderSupplements() {
  const grid = document.getElementById('supplementsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const search = document.getElementById('suppSearch').value.toLowerCase();
  
  const filtered = state.supplements.filter(s => 
    s.name.toLowerCase().includes(search) || 
    s.category.toLowerCase().includes(search)
  );

  const sub = document.getElementById('suppCountSub');
  if (sub) sub.innerText = `Total ${filtered.length} supplements`;

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted); font-size:15px; text-align:center; width:100%; padding:40px 0;">No supplements found.</p>`;
    return;
  }

  filtered.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card supplement-inventory-card';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.2s ease';
    card.onclick = function(e) {
      // Don't open details if trash icon or Schedule button is clicked
      if (e.target.closest('button') || e.target.closest('.fa-trash')) {
        return;
      }
      openSupplementDetailModal(s.id);
    };

    card.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
          <span style="background:var(--primary-light); color:var(--primary-color); padding:4px 8px; border-radius:4px; font-size:11px; font-weight:700; text-transform:uppercase;">${s.category}</span>
          <button onclick="deleteSupplement('${s.id}')" style="background:none; border:none; color:var(--danger); cursor:pointer;"><i class="fas fa-trash"></i></button>
        </div>
        <h4 style="font-size:16px; font-weight:700; margin-bottom:4px; transition:color 0.2s;" class="supp-card-title">${s.name}</h4>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.4; margin-bottom:12px;">${s.description}</p>
      </div>
      <div style="border-top:1px solid var(--border-color); padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:700; font-size:13px;">Dose: ${s.dose}</span>
        <button onclick="quickScheduleDirect('${s.name}', '${s.dose}')" style="background:none; border:none; color:var(--primary-color); cursor:pointer; font-weight:700; font-size:12px;">+ SCHEDULE</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.openSupplementDetailModal = function(id) {
  const s = state.supplements.find(item => item.id === id);
  if (!s) return;

  const title = document.getElementById('detailSuppName');
  const cat = document.getElementById('detailSuppCategory');
  const dose = document.getElementById('detailSuppDose');
  const desc = document.getElementById('detailSuppDesc');
  const schedBtn = document.getElementById('detailScheduleBtn');

  if (title) title.innerText = s.name;
  if (cat) cat.innerText = s.category;
  if (dose) dose.innerText = `Dose: ${s.dose}`;
  if (desc) desc.innerText = s.description;

  if (schedBtn) {
    schedBtn.onclick = function() {
      quickScheduleDirect(s.name, s.dose);
      closeModal('supplementDetailModal');
    };
  }

  openModal('supplementDetailModal');
};

window.quickScheduleDirect = function(name, dose) {
  state.schedule.push({
    name,
    time: '09:00 AM',
    slot: 'morning',
    notes: `${dose} once daily`,
    taken: false
  });
  setLocal('vitaSchedule', state.schedule);
  showToast(state.language === 'en' ? `${name} added to Morning Schedule` : `${name} ditambahkan ke Jadwal Pagi`);
};

window.deleteSupplement = function(id) {
  pushToUndo('supplements', state.supplements);
  const idx = state.supplements.findIndex(s => s.id === id);
  if (idx > -1) {
    state.supplements.splice(idx, 1);
    setLocal('vitaSupplements', state.supplements);
    renderSupplements();
    showToast(state.language === 'en' ? 'Supplement deleted' : 'Suplemen berhasil dihapus');
  }
};

// 10. Interactions Page Logic
let activeInteractionType = 'all';

window.filterInteractionType = function(type) {
  activeInteractionType = type;
  
  // Update button active states
  const btns = document.querySelectorAll('#interactionFilters button');
  btns.forEach(b => {
    b.style.background = '#eee';
    b.style.color = 'var(--text-dark)';
  });
  event.target.style.background = 'var(--primary-color)';
  event.target.style.color = 'white';

  renderInteractions();
};

function renderInteractions() {
  const sContainer = document.getElementById('activeCheckSupps');
  if (!sContainer) return;

  sContainer.innerHTML = '';
  state.interactions.checkedSupps.forEach((name, i) => {
    const chip = document.createElement('div');
    chip.style.cssText = 'background:var(--primary-light); color:var(--primary-color); font-weight:700; padding:6px 12px; border-radius:20px; font-size:12px; display:flex; align-items:center; gap:8px;';
    chip.innerHTML = `${name} <i class="fas fa-times-circle" style="cursor:pointer;" onclick="removeCheckedItem('supps', ${i})"></i>`;
    sContainer.appendChild(chip);
  });

  const fContainer = document.getElementById('activeCheckFoods');
  if (fContainer) {
    fContainer.innerHTML = '';
    state.interactions.checkedFoods.forEach((name, i) => {
      const chip = document.createElement('div');
      chip.style.cssText = 'background:#eee; color:var(--text-dark); font-weight:700; padding:6px 12px; border-radius:20px; font-size:12px; display:flex; align-items:center; gap:8px;';
      
      // Determine display name based on language
      let displayName = name;
      if (typeof vitaData !== 'undefined') {
        const match = vitaData.foodsAndDrugs.find(f => f.nameEn === name);
        if (match) {
          displayName = state.language === 'id' ? match.nameId : match.nameEn;
        }
      }
      
      chip.innerHTML = `${displayName} <i class="fas fa-times-circle" style="cursor:pointer;" onclick="removeCheckedItem('foods', ${i})"></i>`;
      fContainer.appendChild(chip);
    });
  }

  // Populate Dropdowns in Modals
  const sSelect = document.getElementById('checkSuppNameSelect');
  if (sSelect) {
    sSelect.innerHTML = '';
    state.supplements.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.innerText = s.name;
      sSelect.appendChild(opt);
    });
  }

  const fSelect = document.getElementById('checkFoodNameSelect');
  if (fSelect) {
    fSelect.innerHTML = '';
    if (typeof vitaData !== 'undefined') {
      vitaData.foodsAndDrugs.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.nameEn;
        opt.innerText = state.language === 'id' ? f.nameId : f.nameEn;
        fSelect.appendChild(opt);
      });
    }
  }

  // Evaluate checker list
  const results = checkInteractions(state.interactions.checkedSupps, state.interactions.checkedFoods);
  const rContainer = document.getElementById('interactionResultsList');
  if (rContainer) {
    rContainer.innerHTML = '';
    
    // Filter based on selected filter tab
    const filtered = results.filter(w => {
      if (activeInteractionType === 'all') return true;
      return w.type === activeInteractionType;
    });

    if (filtered.length === 0) {
      rContainer.innerHTML = `<p style="color:var(--text-muted); font-size:14px; text-align:center; padding:20px 0;">No active interaction warnings detected for selected items.</p>`;
    } else {
      filtered.forEach(w => {
        const item = document.createElement('div');
        item.className = 'card';
        item.style.borderLeft = `4px solid ${w.severity === 'high' ? 'var(--danger)' : w.severity === 'synergy' ? 'var(--success)' : 'var(--warning)'}`;
        item.innerHTML = `
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong style="color:${w.severity === 'high' ? 'var(--danger)' : w.severity === 'synergy' ? 'var(--success)' : 'var(--warning)'}; text-transform:uppercase; font-size:11px;">${w.severity}</strong>
            <span style="font-size:12px; font-weight:700;">${w.a} &bull; ${w.b}</span>
          </div>
          <p style="font-size:13px; line-height:1.4;">${state.language === 'id' ? w.msgId : w.msg}</p>
        `;
        rContainer.appendChild(item);
      });
    }
  }

  // Evaluate active schedule Auto-Detected items
  const scheduledNames = state.schedule.map(s => s.name);
  const autoResults = checkInteractions(scheduledNames, []);
  const autoContainer = document.getElementById('autoDetectedInteractions');
  if (autoContainer) {
    autoContainer.innerHTML = '';
    if (autoResults.length === 0) {
      autoContainer.innerHTML = `<p style="color:var(--text-muted); font-size:13px;">No conflicts detected in scheduled supplements.</p>`;
    } else {
      autoResults.forEach(w => {
        const card = document.createElement('div');
        card.style.cssText = 'background:rgba(0,0,0,0.02); padding:12px; border-radius:8px; border-left:3px solid var(--danger);';
        card.innerHTML = `
          <strong style="font-size:12px; color:var(--danger); display:block; margin-bottom:4px;">${w.severity.toUpperCase()}</strong>
          <span style="font-size:13px; font-weight:700; display:block; margin-bottom:2px;">${w.a} + ${w.b}</span>
          <p style="font-size:12px; color:var(--text-muted);">${state.language === 'id' ? w.msgId : w.msg}</p>
        `;
        autoContainer.appendChild(card);
      });
    }
  }
}

window.removeCheckedItem = function(type, index) {
  if (type === 'supps') {
    state.interactions.checkedSupps.splice(index, 1);
  } else {
    state.interactions.checkedFoods.splice(index, 1);
  }
  setLocal('vitaInteractions', state.interactions);
  renderInteractions();
};

// 11. Biomarker Loggers
function renderBiomarkers() {
  const grid = document.getElementById('biomarkersGrid');
  if (!grid) return;

  grid.innerHTML = '';
  state.biomarkers.forEach(b => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
        <div>
          <h4 style="font-size:16px; font-weight:700; margin:0;">${b.name}</h4>
          <span style="font-size:12px; color:var(--text-muted);">Optimal Range: ${b.range} ${b.unit}</span>
        </div>
        <span style="background:${b.status === 'Optimal' ? 'rgba(0,186,124,0.1)' : 'rgba(216,27,96,0.1)'}; color:${b.status === 'Optimal' ? 'var(--success)' : 'var(--primary-color)'}; font-weight:700; font-size:11px; padding:4px 8px; border-radius:4px; text-transform:uppercase;">${b.status}</span>
      </div>
      
      <div style="display:flex; align-items:baseline; gap:8px; margin-bottom:16px;">
        <span style="font-size:28px; font-weight:800;">${b.value}</span>
        <span style="font-size:14px; color:var(--text-muted); font-weight:600;">${b.unit}</span>
      </div>

      <div style="border-top:1px solid var(--border-color); padding-top:12px;">
        <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:8px;">History Trend</span>
        <div style="display:flex; gap:6px; align-items:baseline; justify-content:space-between;">
          ${b.history.map((val, idx) => `
            <div style="flex:1; text-align:center;">
              <div style="height:${Math.min(val * 0.8, 60)}px; background:var(--primary-light); border-radius:3px; position:relative; min-height:8px;">
                <div style="position:absolute; bottom:0; left:0; width:100%; height:${idx === 2 ? '100%' : '50%'}; background:var(--primary-color); border-radius:3px;"></div>
              </div>
              <span style="font-size:10px; color:var(--text-muted); display:block; margin-top:4px;">${val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 12. Active Stacks Loggers
function renderStacks() {
  const grid = document.getElementById('stacksGrid');
  if (!grid) return;

  grid.innerHTML = '';
  state.stacks.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.innerHTML = `
      <div>
        <h4 style="font-size:16px; font-weight:700; margin-bottom:8px; color:var(--primary-color);"><i class="fas fa-layer-group"></i> ${s.name}</h4>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.4; margin-bottom:16px;">${s.description}</p>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
          ${s.items.map(item => `<span style="background:var(--bg-color); border:1px solid var(--border-color); padding:4px 8px; border-radius:12px; font-size:11px; font-weight:600;">${item}</span>`).join('')}
        </div>
      </div>
      <div style="border-top:1px solid var(--border-color); padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
        <button onclick="scheduleActiveStack('${s.name}')" style="width:100%; background:var(--primary-color); color:white; border:none; padding:10px; border-radius:8px; font-weight:700; cursor:pointer;"><i class="far fa-calendar-plus"></i> Schedule Stack</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.scheduleActiveStack = function(name) {
  const match = state.stacks.find(s => s.name === name);
  if (!match) return;

  match.items.forEach(item => {
    state.schedule.push({
      name: item,
      time: '08:30 AM',
      slot: 'morning',
      notes: 'Standard stack dose',
      taken: false
    });
  });

  setLocal('vitaSchedule', state.schedule);
  showToast(state.language === 'en' ? `Stack "${name}" scheduled successfully!` : `Stack "${name}" berhasil dijadwalkan!`);
};

// 13. Reminders Engine
function renderReminders() {
  const grid = document.getElementById('remindersGrid');
  if (!grid) return;

  grid.innerHTML = '';
  state.reminders.forEach((r, idx) => {
    const card = document.createElement('div');
    card.className = 'schedule-card';
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px;">
        <label class="switch">
          <input type="checkbox" ${r.active ? 'checked' : ''} onchange="toggleReminderActive(${idx}, this.checked)">
          <span class="slider"></span>
        </label>
        <div>
          <strong style="display:block; font-size:15px;">${r.name}</strong>
          <span style="font-size:12px; color:var(--text-muted);">${r.time}</span>
        </div>
      </div>
      <div style="display:flex; gap:8px;">
        <button onclick="takeReminder(${idx})" class="btn-primary" style="width:auto; padding:6px 12px; font-size:12px; font-weight:700;">Take</button>
        <button onclick="deleteReminder(${idx})" style="background:none; border:none; color:var(--danger); cursor:pointer;"><i class="fas fa-trash"></i></button>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.toggleReminderActive = function(idx, val) {
  state.reminders[idx].active = val;
  setLocal('vitaReminders', state.reminders);
  showToast(val ? 'Reminder Activated' : 'Reminder Disabled');
};

window.takeReminder = function(idx) {
  const item = state.reminders[idx];
  
  // Register taking supplement
  state.schedule.push({
    name: item.name,
    time: item.time,
    slot: 'midday',
    notes: 'Taken via Smart Reminder',
    taken: true
  });
  
  setLocal('vitaSchedule', state.schedule);
  renderDashboard();
  showToast(state.language === 'en' ? `Took ${item.name}!` : `Meminum ${item.name}!`);
};

window.deleteReminder = function(idx) {
  pushToUndo('reminders', state.reminders);
  state.reminders.splice(idx, 1);
  setLocal('vitaReminders', state.reminders);
  renderReminders();
  showToast(state.language === 'en' ? 'Reminder deleted' : 'Pengingat berhasil dihapus');
};

// 14. Hydration Water Logs
function renderHydration() {
  const litersEl = document.getElementById('hydrationLiters');
  if (!litersEl) return;

  litersEl.innerText = `${state.hydration.amount.toFixed(1)} L`;

  const hist = document.getElementById('hydrationHistory');
  if (hist) {
    hist.innerHTML = '';
    if (state.hydration.history.length === 0) {
      hist.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding:20px 0;">No water logged today.</p>`;
    } else {
      state.hydration.history.forEach((h, i) => {
        const item = document.createElement('div');
        item.className = 'schedule-card';
        item.innerHTML = `
          <div style="display:flex; align-items:center; gap:16px;">
            <i class="fas fa-tint" style="color:var(--primary-color);"></i>
            <div>
              <strong style="display:block; font-size:14px;">Drank ${h.amount} ml</strong>
              <span style="font-size:12px; color:var(--text-muted);">${h.time}</span>
            </div>
          </div>
          <button onclick="deleteHydration(${i})" style="background:none; border:none; color:var(--danger); cursor:pointer;"><i class="fas fa-trash"></i></button>
        `;
        hist.appendChild(item);
      });
    }
  }
}

window.addWater = function(amount) {
  pushToUndo('hydration', state.hydration);
  state.hydration.amount += (amount / 1000);
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString(state.language === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  state.hydration.history.unshift({ amount, time: timeStr });

  setLocal('vitaHydration', state.hydration);
  renderHydration();
  showToast(`Added ${amount}ml Hydration`);
};

window.deleteHydration = function(index) {
  pushToUndo('hydration', state.hydration);
  const item = state.hydration.history[index];
  state.hydration.amount -= (item.amount / 1000);
  if (state.hydration.amount < 0) state.hydration.amount = 0;
  
  state.hydration.history.splice(index, 1);
  setLocal('vitaHydration', state.hydration);
  renderHydration();
  showToast('Water intake log deleted');
};

window.resetHydration = function() {
  pushToUndo('hydration', state.hydration);
  state.hydration.amount = 0;
  state.hydration.history = [];
  setLocal('vitaHydration', state.hydration);
  renderHydration();
  showToast('Hydration Reset');
};

// 15. Health Insights Render with Filters
let activeInsightCategory = 'All';

window.filterInsights = function(cat) {
  activeInsightCategory = cat;
  
  // Update category buttons active state
  const btns = document.querySelectorAll('#insightCategoryFilters button');
  btns.forEach(b => {
    b.style.background = 'none';
    b.style.color = 'var(--text-dark)';
    b.style.fontWeight = '500';
  });
  
  event.target.style.background = 'var(--primary-light)';
  event.target.style.color = 'var(--primary-color)';
  event.target.style.fontWeight = '600';

  renderInsights();
};

function renderInsights() {
  const container = document.getElementById('insightsContainer');
  if (!container) return;

  container.innerHTML = '';
  if (typeof vitaData === 'undefined') return;

  const filtered = vitaData.insights.filter(ins => {
    if (activeInsightCategory === 'All') return true;
    return ins.category.toLowerCase() === activeInsightCategory.toLowerCase();
  });

  filtered.forEach(ins => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.cursor = 'pointer';
    card.onclick = () => openArticleModal(ins.id);

    const titleText = state.language === 'id' ? ins.titleId : ins.titleEn;
    const excerptText = state.language === 'id' ? ins.excerptId : ins.excerptEn;

    card.innerHTML = `
      <div style="height:150px; overflow:hidden; background-image:url('${ins.image}'); background-size:cover; background-position:center;"></div>
      <div style="padding:20px;">
        <span style="font-size:11px; font-weight:700; color:var(--primary-color); text-transform:uppercase; display:block; margin-bottom:8px;">${ins.category} &bull; ${ins.readTime}</span>
        <h4 style="font-size:16px; font-weight:700; margin-bottom:8px; line-height:1.4;">${titleText}</h4>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">${excerptText}</p>
        <div style="border-top:1px solid var(--border-color); padding-top:10px; margin-top:12px; font-size:11px; font-weight:700; color:var(--text-muted);">
          <i class="fas fa-book-open"></i> ${ins.citation}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.openArticleModal = function(id) {
  const match = vitaData.insights.find(ins => ins.id === id);
  if (!match) return;

  const titleEl = document.getElementById('modalArticleTitle');
  const coverEl = document.getElementById('modalArticleCover');
  const citationEl = document.getElementById('modalArticleCitation');
  const bodyEl = document.getElementById('modalArticleBody');

  if (titleEl) titleEl.innerText = state.language === 'id' ? match.titleId : match.titleEn;
  if (coverEl) coverEl.style.backgroundImage = `url('${match.image}')`;
  if (citationEl) citationEl.innerHTML = `<i class="fas fa-journal-whills"></i> Citation: ${match.citation}`;
  if (bodyEl) bodyEl.innerText = state.language === 'id' ? match.contentId : match.contentEn;

  openModal('articleModal');
};

// 16. Profile Render & Edit Actions
function renderProfile() {
  const nameEl = document.getElementById('profileName');
  if (!nameEl) return;

  nameEl.innerText = state.profile.name;
  
  const titleEl = document.getElementById('profileTitle');
  if (titleEl) titleEl.innerText = state.profile.title;

  const hEl = document.getElementById('heightVal');
  if (hEl) hEl.innerText = state.profile.height;

  const wEl = document.getElementById('weightVal');
  if (wEl) wEl.innerText = state.profile.weight;

  // Recalculate BMI
  const hM = state.profile.height / 100;
  const bmi = (state.profile.weight / (hM * hM)).toFixed(1);
  const bmiEl = document.getElementById('bmiVal');
  if (bmiEl) bmiEl.innerText = bmi;

  // Set Profile avatar SVG or base64 photo
  const imgCont = document.getElementById('profileImageContainer');
  if (imgCont) {
    imgCont.innerHTML = '';
    if (state.profile.photo) {
      const img = document.createElement('img');
      img.src = state.profile.photo;
      img.style.cssText = 'width:100%; height:100%; object-fit:cover;';
      imgCont.appendChild(img);
    } else {
      imgCont.innerHTML = neutralAvatarSVG;
    }
  }

  // Populate Conditions list
  const condCont = document.getElementById('profileConditionsContainer');
  if (condCont) {
    condCont.innerHTML = '';
    state.profile.conditions.forEach((c, idx) => {
      const chip = document.createElement('div');
      chip.style.cssText = 'background:rgba(0,0,0,0.03); border:1px solid var(--border-color); color:var(--text-dark); font-weight:600; padding:6px 12px; border-radius:20px; font-size:12px; display:flex; align-items:center; gap:8px;';
      chip.innerHTML = `${c} <i class="fas fa-times-circle" style="cursor:pointer;" onclick="deleteCondition(${idx})"></i>`;
      condCont.appendChild(chip);
    });
    // Add Condition Trigger Button
    const addBtn = document.createElement('button');
    addBtn.style.cssText = 'background:#fcfcfc; border:1px dashed var(--border-color); padding:6px 12px; border-radius:20px; font-size:12px; cursor:pointer;';
    addBtn.innerText = '+ Add Condition';
    addBtn.onclick = () => openModal('conditionModal');
    condCont.appendChild(addBtn);
  }

  // Set initial modal fields
  const pName = document.getElementById('profileAddName');
  if (pName) pName.value = state.profile.name;

  const pTitle = document.getElementById('profileAddTitle');
  if (pTitle) pTitle.value = state.profile.title;

  const pHeight = document.getElementById('profileAddHeight');
  if (pHeight) pHeight.value = state.profile.height;

  const pWeight = document.getElementById('profileAddWeight');
  if (pWeight) pWeight.value = state.profile.weight;

  const pImageUrl = document.getElementById('profileImageUrl');
  if (pImageUrl) pImageUrl.value = state.profile.photo;
}

window.deleteCondition = function(idx) {
  state.profile.conditions.splice(idx, 1);
  setLocal('vitaProfile', state.profile);
  renderProfile();
  showToast('Condition removed');
};

// 17. Twitter-like Health Social Media ("VitaShare")
function renderTweets() {
  const container = document.getElementById('tweetsContainer');
  if (!container) return;

  container.innerHTML = '';
  
  // Set user avatar in form
  const myAv = document.getElementById('feedMyAvatar');
  if (myAv) {
    myAv.innerHTML = '';
    if (state.profile.photo) {
      myAv.innerHTML = `<img src="${state.profile.photo}" style="width:100%; height:100%; object-fit:cover;">`;
    } else {
      myAv.innerHTML = neutralAvatarSVG;
    }
  }

  state.tweets.forEach(t => {
    const text = state.language === 'id' ? t.textId : t.textEn;
    const card = document.createElement('div');
    card.className = 'tweet-card';
    
    // Choose custom neutral avatar
    card.innerHTML = `
      <div class="tweet-avatar">${neutralAvatarSVG}</div>
      <div class="tweet-content">
        <div class="tweet-user">
          <span class="tweet-name">${t.name}</span>
          <span class="tweet-handle">${t.handle} &bull; 1h</span>
        </div>
        <p class="tweet-text">${text}</p>
        <div class="tweet-actions">
          <div class="tweet-action ${t.retweeted ? 'retweeted' : ''}" onclick="toggleRetweet('${t.id}')">
            <i class="fas fa-retweet"></i> <span>${t.retweets}</span>
          </div>
          <div class="tweet-action ${t.liked ? 'liked' : ''}" onclick="toggleLike('${t.id}')">
            <i class="fas fa-heart"></i> <span>${t.likes}</span>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.toggleLike = function(id) {
  const match = state.tweets.find(t => t.id === id);
  if (!match) return;

  match.liked = !match.liked;
  match.likes += (match.liked ? 1 : -1);
  setLocal('vitaTweets', state.tweets);
  renderTweets();
};

window.toggleRetweet = function(id) {
  const match = state.tweets.find(t => t.id === id);
  if (!match) return;

  match.retweeted = !match.retweeted;
  match.retweets += (match.retweeted ? 1 : -1);
  setLocal('vitaTweets', state.tweets);
  renderTweets();
};

window.postTweet = function() {
  const inp = document.getElementById('tweetInput');
  if (!inp || !inp.value.trim()) return;

  const newPost = {
    id: `t_${Date.now()}`,
    name: state.profile.name,
    handle: `@${state.profile.name.toLowerCase().replace(/\s/g, '')}`,
    textEn: inp.value.trim(),
    textId: inp.value.trim(),
    likes: 0,
    retweets: 0,
    liked: false,
    retweeted: false
  };

  state.tweets.unshift(newPost);
  setLocal('vitaTweets', state.tweets);
  inp.value = '';
  renderTweets();
  showToast(state.language === 'en' ? 'Health post shared!' : 'Postingan kesehatan dibagikan!');
};

// 18. Floating Support CS Chatbot AI Engine
let chatOpen = false;

window.toggleChat = function() {
  const chatBox = document.getElementById('chatBox');
  if (!chatBox) return;

  chatOpen = !chatOpen;
  chatBox.style.display = chatOpen ? 'flex' : 'none';
};

window.handleChatKey = function(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
};

window.sendChatMessage = function() {
  const inp = document.getElementById('chatInput');
  if (!inp || !inp.value.trim()) return;

  const msg = inp.value.trim();
  appendChatMessage(msg, 'user');
  inp.value = '';

  // AI Intelligent Mapping responses in ID/EN
  setTimeout(() => {
    let resp = '';
    const low = msg.toLowerCase();

    if (state.language === 'en') {
      if (low.includes('apple') || low.includes('sync')) {
        resp = "Go to Profile / Preferences and enable the 'iCloud Sync' checkbox. All statistics will sync automatically.";
      } else if (low.includes('add') || low.includes('supplement')) {
        resp = "Open the 'My Supplements' page, click '+ Add Supplement', enter the name/dose, and hit 'Add to Inventory'.";
      } else if (low.includes('interaction')) {
        resp = "The Interactions page runs an algorithmic chemical scan. Add items to checked lists to instantly detect conflicts.";
      } else if (low.includes('food') || low.includes('kopi') || low.includes('coffee')) {
        resp = "Caffeine/coffee blocks iron absorption. It is clinically advised to space iron and caffeine by at least 4 hours.";
      } else {
        resp = "Thank you! I am here to help you optimize your longevity stack. Explore PubMed waiswans in Health Insights!";
      }
    } else {
      if (low.includes('apple') || low.includes('sync') || low.includes('sinkron')) {
        resp = "Buka Profil / Preferensi dan aktifkan kotak 'Sinkronisasi iCloud'. Semua statistik Anda akan disinkronkan secara otomatis.";
      } else if (low.includes('tambah') || low.includes('suplemen') || low.includes('obat')) {
        resp = "Buka halaman 'Suplemen Saya', klik '+ Tambah Suplemen', masukkan nama/dosis, dan klik 'Add to Inventory'.";
      } else if (low.includes('interaksi') || low.includes('bahaya')) {
        resp = "Halaman Interaksi menjalankan pemindaian kimiawi algoritmik. Cukup tambahkan item ke daftar untuk mendeteksi bahaya.";
      } else if (low.includes('kopi') || low.includes('makanan') || low.includes('susu')) {
        resp = "Kopi dan susu menghambat zat besi dan kalsium. Disarankan memberi jeda konsumsi minimal 4 jam.";
      } else {
        resp = "Terima kasih! Saya siap membantu Anda mengoptimalkan suplemen kesehatan Anda. Silakan jelajahi artikel di Wawasan Kesehatan!";
      }
    }

    appendChatMessage(resp, 'bot');
  }, 750);
};

window.askQuickQuestion = function(num) {
  let msg = '';
  if (num === 1) msg = "How to sync Apple Health?";
  else if (num === 2) msg = "How to add custom supplements?";
  else msg = "How does the interaction checker work?";

  appendChatMessage(msg, 'user');
  
  setTimeout(() => {
    let resp = '';
    if (state.language === 'en') {
      if (num === 1) resp = "Sync Apple Health by checking 'iCloud Sync' on your Profile preferences page.";
      else if (num === 2) resp = "Go to 'My Supplements' page, click 'Add Supplement', enter stats, and save to database.";
      else resp = "It evaluates your schedule inventory against our chemical matrix to flag high-risk pairings.";
    } else {
      if (num === 1) resp = "Hubungkan kesehatan dengan mencentang kotak preferensi 'Sinkronisasi iCloud' di halaman profil.";
      else if (num === 2) resp = "Buka halaman 'Suplemen Saya', klik '+ Tambah Suplemen', isi data lalu simpan ke database.";
      else resp = "Sistem mengevaluasi jadwal suplemen Anda dengan matriks kimia laboratorium untuk mencegah bahaya.";
    }
    appendChatMessage(resp, 'bot');
  }, 500);
};

function appendChatMessage(text, sender) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-message ${sender}`;
  bubble.innerText = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

// 19. Back to Settings & Google Drive backup simulation
window.backupToGoogleDrive = function() {
  showToast(state.language === 'en' ? 'Authenticating with Google...' : 'Mengautentikasi dengan Google...');
  setTimeout(() => {
    showToast(state.language === 'en' ? 'Backup file "vitasync_backup.json" uploaded to Google Drive!' : 'File cadangan "vitasync_backup.json" berhasil diunggah ke Google Drive!');
  }, 1500);
};

window.inviteFriends = function() {
  const dummyLink = "https://vitasync.netlify.app/invite?ref=julian";
  navigator.clipboard.writeText(dummyLink).then(() => {
    showToast(state.language === 'en' ? 'Invitation link copied to clipboard!' : 'Tautan undangan disalin ke papan klip!');
  }).catch(() => {
    showToast(dummyLink);
  });
};

window.showOnboardingAgain = function() {
  localStorage.removeItem('vitaOnboardingCompleted');
  showToast(state.language === 'en' ? 'Intro tutorial reset! Refresh to see welcome page.' : 'Tutorial onboarding direset! Refresh untuk melihat halaman pembuka.');
};

// 20. Onboarding Completion Actions
window.completeOnboarding = function() {
  const overlay = document.getElementById('onboardingScreen');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      overlay.style.display = 'none';
      localStorage.setItem('vitaOnboardingCompleted', 'true');
    }, 500);
  }
};

function initOnboarding() {
  const isCompleted = localStorage.getItem('vitaOnboardingCompleted');
  const overlay = document.getElementById('onboardingScreen');
  if (overlay) {
    if (isCompleted === 'true') {
      overlay.style.display = 'none';
    } else {
      overlay.style.display = 'flex';
      overlay.classList.add('active');
    }
  }
}

// --- DOM Event bindings ---
document.addEventListener('DOMContentLoaded', () => {
  // Translate on load
  translateApp();
  initOnboarding();

  // Mobile navigation drawer toggle
  const drawerBtn = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');

  // Inject overlay element if not already in DOM
  let sidebarOverlay = document.getElementById('sidebarOverlay');
  if (!sidebarOverlay) {
    sidebarOverlay = document.createElement('div');
    sidebarOverlay.id = 'sidebarOverlay';
    document.body.appendChild(sidebarOverlay);
  }

  function openSidebar() {
    if (sidebar) sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  }

  if (drawerBtn && sidebar) {
    drawerBtn.addEventListener('click', () => {
      sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
    });
  }
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Bind chatbot bubble
  const chatBubble = document.getElementById('chatBubble');
  if (chatBubble) {
    chatBubble.addEventListener('click', toggleChat);
  }

  // Bind Profile edit pencil click listener
  const editProfileBtn = document.getElementById('editProfileBtn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => openModal('profileEditModal'));
  }

  // Render active pages
  renderDashboard();
  renderSchedule();
  renderSupplements();
  renderInteractions();
  renderBiomarkers();
  renderStacks();
  renderReminders();
  renderHydration();
  renderInsights();
  renderProfile();
  renderTweets();

  // Bind Dashboard Add Schedule
  const saveDashBtn = document.getElementById('saveDashScheduleBtn');
  if (saveDashBtn) {
    saveDashBtn.addEventListener('click', () => {
      const name = document.getElementById('dashScheduleNameSelect').value;
      const dose = document.getElementById('dashScheduleDose').value || '1 tablet';
      const time = document.getElementById('dashScheduleTime').value || '08:00 AM';
      const slot = document.getElementById('dashScheduleSlot').value;

      state.schedule.push({ name, time, slot, notes: dose, taken: false });
      setLocal('vitaSchedule', state.schedule);
      renderDashboard();
      closeModal('dashScheduleModal');
      showToast(state.language === 'en' ? `${name} added to schedule` : `${name} ditambahkan ke jadwal`);
    });
  }

  const addDashBtn = document.getElementById('addDashScheduleBtn');
  if (addDashBtn) {
    addDashBtn.addEventListener('click', () => openModal('dashScheduleModal'));
  }

  // Bind Schedule Modal save
  const saveSchedBtn = document.getElementById('saveScheduleBtn');
  if (saveSchedBtn) {
    saveSchedBtn.addEventListener('click', () => {
      const name = document.getElementById('schedAddName').value;
      const time = document.getElementById('schedAddTime').value || '08:00 AM';
      const notes = document.getElementById('schedAddNotes').value || '1 tablet';
      const slot = document.getElementById('schedAddSlot').value;

      if (!name) {
        showToast('Please enter a name', true);
        return;
      }

      state.schedule.push({ name, time, slot, notes, taken: false });
      setLocal('vitaSchedule', state.schedule);
      renderSchedule();
      closeModal('scheduleModal');
      showToast(state.language === 'en' ? 'Item scheduled' : 'Item dijadwal');
    });
  }

  const resetSchedBtn = document.getElementById('resetScheduleBtn');
  if (resetSchedBtn) {
    resetSchedBtn.addEventListener('click', () => {
      pushToUndo('schedule', state.schedule);
      state.schedule.forEach(s => s.taken = false);
      setLocal('vitaSchedule', state.schedule);
      renderSchedule();
      showToast(state.language === 'en' ? 'Schedule Reset' : 'Jadwal direset');
    });
  }

  // Bind Supplements search
  const suppSearch = document.getElementById('suppSearch');
  if (suppSearch) {
    suppSearch.addEventListener('input', renderSupplements);
  }

  const saveSuppBtn = document.getElementById('saveSuppBtn');
  if (saveSuppBtn) {
    saveSuppBtn.addEventListener('click', () => {
      const name = document.getElementById('suppAddName').value;
      const dose = document.getElementById('suppAddDose').value || '500 mg';
      const cat = document.getElementById('suppAddCategory').value;
      const desc = document.getElementById('suppAddDesc').value || 'Supports baseline cellular metrics';

      if (!name) {
        showToast('Please enter a name', true);
        return;
      }

      const newS = {
        id: `supp_${Date.now()}`,
        name,
        dose,
        category: cat,
        description: desc
      };
      
      state.supplements.push(newS);
      setLocal('vitaSupplements', state.supplements);
      renderSupplements();
      closeModal('suppModal');
      showToast('Supplement added');
    });
  }

  // Bind Interactions adding
  const saveCheckSupp = document.getElementById('saveCheckSuppBtn');
  if (saveCheckSupp) {
    saveCheckSupp.addEventListener('click', () => {
      const name = document.getElementById('checkSuppNameSelect').value;
      if (!state.interactions.checkedSupps.includes(name)) {
        state.interactions.checkedSupps.push(name);
        setLocal('vitaInteractions', state.interactions);
        renderInteractions();
      }
      closeModal('checkSuppModal');
    });
  }

  const saveCheckFood = document.getElementById('saveCheckFoodBtn');
  if (saveCheckFood) {
    saveCheckFood.addEventListener('click', () => {
      const name = document.getElementById('checkFoodNameSelect').value;
      if (!state.interactions.checkedFoods.includes(name)) {
        state.interactions.checkedFoods.push(name);
        setLocal('vitaInteractions', state.interactions);
        renderInteractions();
      }
      closeModal('checkFoodModal');
    });
  }

  // Bind Camera Scanner Actions
  const captureBtn = document.getElementById('captureBtn');
  const video = document.getElementById('videoFeed');
  const placeholder = document.getElementById('videoPlaceholder');
  let cameraStream = null;

  if (captureBtn && video) {
    captureBtn.addEventListener('click', () => {
      const mode = document.getElementById('cameraSelect').value;
      
      if (!cameraStream) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } })
          .then(stream => {
            cameraStream = stream;
            video.srcObject = stream;
            video.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
            showToast('Camera Feed On');
          })
          .catch(e => {
            showToast('Camera error: Simulated capture used instead.');
            simulateScannerCapture();
          });
      } else {
        // Stop stream & simulate label result extraction
        cameraStream.getTracks().forEach(t => t.stop());
        cameraStream = null;
        video.style.display = 'none';
        if (placeholder) placeholder.style.display = 'block';
        simulateScannerCapture();
      }
    });
  }

  function simulateScannerCapture() {
    const list = document.getElementById('detectedResultsList');
    if (!list) return;

    list.innerHTML = `
      <div style="background:rgba(0,186,124,0.1); color:var(--success); padding:16px; border-radius:12px; margin-bottom:16px; text-align:center;">
        <i class="fas fa-check-circle" style="font-size:24px; margin-bottom:8px;"></i>
        <strong>Label Extracted Successfully</strong>
      </div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span>Vitamin D3</span>
          <strong>5000 IU</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span>Calcium</span>
          <strong>250 mg</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span>Zinc Picolinate</span>
          <strong>15 mg</strong>
        </div>
      </div>
      <button class="btn-primary" style="margin-top:24px; width:100%;" onclick="saveScannedIngredients()">Add Scanned to Supplements</button>
    `;
  }

  window.saveScannedIngredients = function() {
    state.supplements.push({ id: `supp_${Date.now()}_1`, name: 'Vitamin D3 Extracted', dose: '5000 IU', category: 'Vitamin', description: 'Extracted via optical scan' });
    state.supplements.push({ id: `supp_${Date.now()}_2`, name: 'Calcium Extracted', dose: '250 mg', category: 'Mineral', description: 'Extracted via optical scan' });
    state.supplements.push({ id: `supp_${Date.now()}_3`, name: 'Zinc Extracted', dose: '15 mg', category: 'Mineral', description: 'Extracted via optical scan' });
    
    setLocal('vitaSupplements', state.supplements);
    showToast(state.language === 'en' ? 'Scanned ingredients added to Inventory!' : 'Bahan hasil scan ditambahkan ke Inventaris!');
  };

  const flashBtn = document.getElementById('toggleFlashBtn');
  if (flashBtn) {
    flashBtn.addEventListener('click', () => {
      showToast('Flash light activated');
    });
  }

  const galleryBtn = document.getElementById('galleryBtn');
  const galleryInput = document.getElementById('galleryInput');
  if (galleryBtn && galleryInput) {
    galleryBtn.addEventListener('click', () => {
      galleryInput.click();
    });
    galleryInput.addEventListener('change', () => {
      showToast('Loading image from gallery...');
      setTimeout(() => {
        simulateScannerCapture();
      }, 1000);
    });
  }

  // Bind Biomarker input
  const saveBioBtn = document.getElementById('saveBiomarkerBtn');
  if (saveBioBtn) {
    saveBioBtn.addEventListener('click', () => {
      const name = document.getElementById('bioAddName').value;
      const val = parseFloat(document.getElementById('bioAddVal').value);
      const unit = document.getElementById('bioAddUnit').value;
      const range = document.getElementById('bioAddRange').value;

      if (!name || isNaN(val)) {
        showToast('Please enter valid stats', true);
        return;
      }

      // Check range to determine status
      const split = range.split('-');
      let status = 'Optimal';
      if (split.length === 2) {
        const low = parseFloat(split[0]);
        const high = parseFloat(split[1]);
        if (val < low || val > high) status = 'Low';
      }

      const match = state.biomarkers.find(b => b.name.toLowerCase() === name.toLowerCase());
      if (match) {
        match.value = val;
        match.status = status;
        match.history.push(val);
        if (match.history.length > 3) match.history.shift();
      } else {
        state.biomarkers.push({
          id: `bio_${Date.now()}`,
          name,
          value: val,
          unit,
          status,
          range,
          history: [val]
        });
      }

      setLocal('vitaBiomarkers', state.biomarkers);
      renderBiomarkers();
      closeModal('biomarkerModal');
      showToast('Biomarker updated');
    });
  }

  const fillBioBtn = document.getElementById('autoFillBiomarkersBtn');
  if (fillBioBtn) {
    fillBioBtn.addEventListener('click', () => {
      state.biomarkers = [
        { id: 'bio_1', name: 'Vitamin D', value: 72.5, unit: 'ng/mL', status: 'Optimal', range: '30-100', history: [45.2, 51.0, 72.5] },
        { id: 'bio_2', name: 'Ferritin', value: 110.0, unit: 'ng/mL', status: 'Optimal', range: '30-400', history: [88.5, 95.1, 110.0] },
        { id: 'bio_3', name: 'Vitamin B12', value: 680, unit: 'pg/mL', status: 'Optimal', range: '200-900', history: [390, 420, 680] },
        { id: 'bio_4', name: 'Calcium', value: 9.8, unit: 'mg/dL', status: 'Optimal', range: '8.5-10.2', history: [9.4, 9.5, 9.8] },
        { id: 'bio_5', name: 'Iron', value: 125, unit: 'mcg/dL', status: 'Optimal', range: '60-170', history: [70, 78, 125] },
        { id: 'bio_6', name: 'Zinc', value: 105, unit: 'mcg/dL', status: 'Optimal', range: '60-120', history: [88, 90, 105] },
        { id: 'bio_7', name: 'HbA1c', value: 5.2, unit: '%', status: 'Optimal', range: '< 5.7', history: [5.6, 5.5, 5.2] },
        { id: 'bio_8', name: 'Total Cholesterol', value: 178, unit: 'mg/dL', status: 'Optimal', range: '< 200', history: [195, 190, 178] }
      ];
      setLocal('vitaBiomarkers', state.biomarkers);
      renderBiomarkers();
      showToast('All 8 Biomarkers fully loaded!');
    });
  }

  // Bind Stacks save
  const saveStackBtn = document.getElementById('saveStackBtn');
  if (saveStackBtn) {
    saveStackBtn.addEventListener('click', () => {
      const name = document.getElementById('stackAddName').value;
      const desc = document.getElementById('stackAddDesc').value || 'Synergistic combination';
      const itemsRaw = document.getElementById('stackAddItems').value;

      if (!name || !itemsRaw) {
        showToast('Please enter stack details', true);
        return;
      }

      const items = itemsRaw.split(',').map(item => item.trim());
      state.stacks.push({
        id: `st_${Date.now()}`,
        name,
        description: desc,
        items
      });

      setLocal('vitaStacks', state.stacks);
      renderStacks();
      closeModal('stackModal');
      showToast('Stack created successfully');
    });
  }

  // Bind Reminders save
  const saveRemBtn = document.getElementById('saveReminderBtn');
  if (saveRemBtn) {
    saveRemBtn.addEventListener('click', () => {
      const name = document.getElementById('remAddName').value;
      const time = document.getElementById('remAddTime').value || '08:00 AM';

      if (!name) {
        showToast('Please enter reminder details', true);
        return;
      }

      state.reminders.push({
        id: `rem_${Date.now()}`,
        time,
        name,
        active: true
      });

      setLocal('vitaReminders', state.reminders);
      renderReminders();
      closeModal('reminderModal');
      showToast('Reminder added');
    });
  }

  // Bind Custom Water save
  const saveWaterBtn = document.getElementById('saveWaterBtn');
  if (saveWaterBtn) {
    saveWaterBtn.addEventListener('click', () => {
      const amt = parseInt(document.getElementById('waterAddAmount').value);
      if (isNaN(amt) || amt <= 0) {
        showToast('Please enter a valid amount', true);
        return;
      }
      addWater(amt);
      closeModal('waterModal');
    });
  }

  // Bind Profile actions
  const pImageUpload = document.getElementById('profileImageUpload');
  if (pImageUpload) {
    pImageUpload.addEventListener('change', () => {
      const file = pImageUpload.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          state.profile.photo = e.target.result;
          setLocal('vitaProfile', state.profile);
          renderProfile();
          showToast('Profile photo updated!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const saveProfileBtn = document.getElementById('saveProfileBtn');
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
      const name = document.getElementById('profileAddName').value;
      const title = document.getElementById('profileAddTitle').value;
      const h = parseFloat(document.getElementById('profileAddHeight').value) || 185;
      const w = parseFloat(document.getElementById('profileAddWeight').value) || 82;
      const imgUrl = document.getElementById('profileImageUrl') ? document.getElementById('profileImageUrl').value.trim() : '';

      state.profile.name = name;
      state.profile.title = title;
      state.profile.height = h;
      state.profile.weight = w;
      if (imgUrl) {
        state.profile.photo = imgUrl;
      }

      setLocal('vitaProfile', state.profile);
      renderProfile();
      closeModal('profileEditModal');
      showToast('Profile info updated');
    });
  }

  const saveCondBtn = document.getElementById('saveConditionBtn');
  if (saveCondBtn) {
    saveCondBtn.addEventListener('click', () => {
      const name = document.getElementById('conditionAddName').value;
      if (!name) return;

      if (!state.profile.conditions.includes(name)) {
        state.profile.conditions.push(name);
        setLocal('vitaProfile', state.profile);
        renderProfile();
      }
      closeModal('conditionModal');
      showToast('Condition added');
    });
  }

  // Backup file export/import in Settings
  window.exportDataBackup = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "vitasync_backup.json");
    dl.click();
    showToast('Backup File Generated');
  };

  window.importDataBackup = function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = readerEvent => {
        try {
          const parsed = JSON.parse(readerEvent.target.result);
          if (parsed.schedule && parsed.supplements) {
            state.schedule = parsed.schedule;
            state.supplements = parsed.supplements;
            state.biomarkers = parsed.biomarkers || [];
            state.stacks = parsed.stacks || [];
            state.reminders = parsed.reminders || [];
            state.hydration = parsed.hydration || defaultState.hydration;
            state.profile = parsed.profile || defaultState.profile;
            state.interactions = parsed.interactions || defaultState.interactions;
            state.settings = parsed.settings || defaultState.settings;
            state.language = parsed.language || 'en';

            setLocal('vitaSchedule', state.schedule);
            setLocal('vitaSupplements', state.supplements);
            setLocal('vitaBiomarkers', state.biomarkers);
            setLocal('vitaStacks', state.stacks);
            setLocal('vitaReminders', state.reminders);
            setLocal('vitaHydration', state.hydration);
            setLocal('vitaProfile', state.profile);
            setLocal('vitaInteractions', state.interactions);
            setLocal('vitaSettings', state.settings);
            setLocal('vitaLang', state.language);

            showToast('Backup Restored Successfully!');
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            showToast('Invalid backup file structure.', true);
          }
        } catch(err) {
          showToast('Error reading backup file.', true);
        }
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };

  window.clearDatabase = function() {
    if (confirm('Are you sure you want to completely clear all cached statistics? This reset is permanent.')) {
      localStorage.clear();
      showToast('Database reset.');
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

});
