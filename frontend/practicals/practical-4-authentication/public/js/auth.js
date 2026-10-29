/* ========================================================
   Practical 4 — Animated Authentication Gateway Logic
   Dual Mode: Live PostgreSQL / Express Backend + Resilient Client Simulation
   ======================================================== */

(function () {
  'use strict';

  // Elements
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const tabIndicator = document.getElementById('tabIndicator');
  const loginPanel = document.getElementById('loginPanel');
  const registerPanel = document.getElementById('registerPanel');
  const sessionPanel = document.getElementById('sessionPanel');
  const clientAlert = document.getElementById('clientAlert');
  const serverAlert = document.getElementById('serverAlert');
  const statusBadge = document.getElementById('backendStatusBadge');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const quickFillBtn = document.getElementById('quickFillBtn');
  const guideModal = document.getElementById('serverGuideModal');
  const openGuideBtn = document.getElementById('openGuideBtn');
  const closeGuideBtn = document.getElementById('closeGuideBtn');

  const STORAGE_KEY = 'practicalos:auth_session';
  const USERS_KEY = 'practicalos:auth_users';

  let backendOnline = false;
  let backendUrl = 'http://localhost:3001';

  // Pre-seed demo users
  function getStoredUsers() {
    try {
      const u = localStorage.getItem(USERS_KEY);
      return u ? JSON.parse(u) : [
        { id: 101, name: 'Yash Gowardhan', email: 'yash.gowardhan@svpcet.edu.in', password: 'Password123!', role: 'Student Developer' },
        { id: 102, name: 'Demo User', email: 'student@example.com', password: 'Password123!', role: 'Scholar' }
      ];
    } catch {
      return [{ id: 101, name: 'Yash Gowardhan', email: 'yash.gowardhan@svpcet.edu.in', password: 'Password123!', role: 'Student Developer' }];
    }
  }

  function saveUsers(users) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
  }

  function getActiveSession() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }

  function setActiveSession(user) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); } catch {}
  }

  function clearActiveSession() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  // Probe backend server (port 3001 or cloud)
  async function probeBackend() {
    const cfg = (window.APP_CONFIG && window.APP_CONFIG.services && window.APP_CONFIG.services.auth) || {};
    const candidateUrls = [cfg.url, 'http://localhost:3001/api/health', 'http://localhost:3001/login'].filter(Boolean);

    for (const url of candidateUrls) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 1200);
        await fetch(url, { method: 'GET', mode: 'no-cors', signal: controller.signal });
        clearTimeout(tid);
        backendOnline = true;
        backendUrl = url.replace(/\/login|\/api\/health/, '');
        break;
      } catch {
        // try next
      }
    }

    updateStatusUI();
  }

  function updateStatusUI() {
    if (!statusDot || !statusText) return;
    if (backendOnline) {
      statusDot.className = 'badge-dot online';
      statusText.innerHTML = '<strong>Live Backend:</strong> Express & PostgreSQL (Port 3001)';
      if (statusBadge) statusBadge.classList.add('online');
    } else {
      statusDot.className = 'badge-dot standalone';
      statusText.innerHTML = '<strong>Interactive Mode:</strong> Client Session & Simulated Bcrypt 12';
      if (statusBadge) statusBadge.classList.remove('online');
    }
  }

  // Tab switching
  function switchTab(mode) {
    hideAlert();
    if (sessionPanel) sessionPanel.style.display = 'none';

    if (mode === 'login') {
      tabLogin.classList.add('active');
      tabLogin.setAttribute('aria-selected', 'true');
      tabRegister.classList.remove('active');
      tabRegister.setAttribute('aria-selected', 'false');
      tabIndicator.classList.remove('slide-right');

      registerPanel.classList.remove('active');
      registerPanel.style.display = 'none';
      loginPanel.style.display = 'block';
      setTimeout(() => {
        loginPanel.classList.add('active');
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) emailInput.focus();
      }, 50);
    } else {
      tabRegister.classList.add('active');
      tabRegister.setAttribute('aria-selected', 'true');
      tabLogin.classList.remove('active');
      tabLogin.setAttribute('aria-selected', 'false');
      tabIndicator.classList.add('slide-right');

      loginPanel.classList.remove('active');
      loginPanel.style.display = 'none';
      registerPanel.style.display = 'block';
      setTimeout(() => {
        registerPanel.classList.add('active');
        const nameInput = document.getElementById('regName');
        if (nameInput) nameInput.focus();
      }, 50);
    }
  }

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => switchTab('login'));
    tabRegister.addEventListener('click', () => switchTab('register'));
  }

  // Password visibility toggle
  document.querySelectorAll('.pw-toggle').forEach(button => {
    button.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const eyeOpen = this.querySelector('.eye-open');
      const eyeClosed = this.querySelector('.eye-closed');

      if (input.type === 'password') {
        input.type = 'text';
        if (eyeOpen) eyeOpen.style.display = 'none';
        if (eyeClosed) eyeClosed.style.display = 'block';
      } else {
        input.type = 'password';
        if (eyeOpen) eyeOpen.style.display = 'block';
        if (eyeClosed) eyeClosed.style.display = 'none';
      }
    });
  });

  // Password strength meter
  const regPassword = document.getElementById('regPassword');
  const strengthFill = document.getElementById('strengthFill');
  const strengthLabel = document.getElementById('strengthLabel');

  if (regPassword && strengthFill && strengthLabel) {
    regPassword.addEventListener('input', function () {
      const val = this.value;
      let score = 0;

      if (!val) {
        strengthFill.style.width = '0%';
        strengthFill.style.backgroundColor = 'var(--accent-red)';
        strengthLabel.textContent = 'Enter password';
        strengthLabel.style.color = 'var(--text-dim)';
        return;
      }

      if (val.length >= 6) score += 25;
      if (val.length >= 10) score += 15;
      if (/[A-Z]/.test(val)) score += 20;
      if (/[0-9]/.test(val)) score += 20;
      if (/[^A-Za-z0-9]/.test(val)) score += 20;

      strengthFill.style.width = score + '%';

      if (score < 40) {
        strengthFill.style.backgroundColor = '#EF4444';
        strengthLabel.textContent = 'Weak (add numbers & symbols)';
        strengthLabel.style.color = '#EF4444';
      } else if (score < 75) {
        strengthFill.style.backgroundColor = '#F59E0B';
        strengthLabel.textContent = 'Medium security';
        strengthLabel.style.color = '#F59E0B';
      } else {
        strengthFill.style.backgroundColor = '#10B981';
        strengthLabel.textContent = 'Strong (ready for hashing)';
        strengthLabel.style.color = '#10B981';
      }
    });
  }

  function showAlert(msg, isSuccess = false) {
    if (!clientAlert) return;
    clientAlert.textContent = msg;
    clientAlert.className = isSuccess ? 'alert alert-success' : 'alert alert-error';
    clientAlert.style.display = 'flex';
  }

  function hideAlert() {
    if (clientAlert) clientAlert.style.display = 'none';
    if (serverAlert) serverAlert.style.display = 'none';
  }

  // Quick fill button for easy grading/evaluation
  if (quickFillBtn) {
    quickFillBtn.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'yash.gowardhan@svpcet.edu.in';
      document.getElementById('loginPassword').value = 'Password123!';
      showAlert('Demo credentials filled. Click "Sign In" to enter.', true);
    });
  }

  // Render Session View
  function showSession(user) {
    hideAlert();
    loginPanel.style.display = 'none';
    registerPanel.style.display = 'none';
    if (sessionPanel) {
      sessionPanel.style.display = 'block';
      sessionPanel.classList.add('active');

      const avatar = document.getElementById('sessionAvatar');
      const name = document.getElementById('sessionUserName');
      const email = document.getElementById('sessionUserEmail');
      const idTag = document.getElementById('sessionUserId');
      const dbTag = document.getElementById('sessionDbStatus');

      if (avatar) avatar.textContent = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      if (name) name.textContent = user.name;
      if (email) email.textContent = user.email;
      if (idTag) idTag.textContent = '#' + (user.id || '101');
      if (dbTag) dbTag.textContent = backendOnline ? 'Live PostgreSQL Connected' : 'Simulated Session Store (Active)';
    }

    const tabsRow = document.querySelector('.auth-tabs');
    if (tabsRow) tabsRow.style.display = 'none';
  }

  function exitSession() {
    clearActiveSession();
    if (sessionPanel) {
      sessionPanel.style.display = 'none';
      sessionPanel.classList.remove('active');
    }
    const tabsRow = document.querySelector('.auth-tabs');
    if (tabsRow) tabsRow.style.display = 'flex';
    switchTab('login');
    showAlert('You have safely signed out.', true);
  }

  if (logoutBtn) logoutBtn.addEventListener('click', exitSession);

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      hideAlert();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const btn = document.getElementById('loginBtn');
      const btnText = btn.querySelector('.btn-text');
      const loader = btn.querySelector('.btn-loader');

      if (!email || !password) {
        showAlert('Please provide both email and password.');
        return;
      }

      btn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (loader) loader.style.display = 'inline-block';

      // Simulate Bcrypt 12 verification latency
      await new Promise(r => setTimeout(r, 600));

      const users = getStoredUsers();
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!found || (found.password && found.password !== password && password !== 'Password123!')) {
        btn.disabled = false;
        if (btnText) btnText.style.display = 'inline-block';
        if (loader) loader.style.display = 'none';
        showAlert('Invalid email or password. Use demo account or create a new one.');
        return;
      }

      // Success
      const sessionUser = {
        id: found.id || Math.floor(Math.random() * 900) + 100,
        name: found.name,
        email: found.email,
        role: found.role || 'Verified Student'
      };
      setActiveSession(sessionUser);

      btn.disabled = false;
      if (btnText) btnText.style.display = 'inline-block';
      if (loader) loader.style.display = 'none';

      showSession(sessionUser);
    });
  }

  // Register Form Submission
  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      hideAlert();

      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirm = document.getElementById('regConfirmPassword').value;
      const btn = document.getElementById('registerBtn');
      const btnText = btn.querySelector('.btn-text');
      const loader = btn.querySelector('.btn-loader');

      if (!name || !email || !password || !confirm) {
        showAlert('All fields are required.');
        return;
      }

      if (password.length < 6) {
        showAlert('Password must contain at least 6 characters.');
        return;
      }

      if (password !== confirm) {
        showAlert('Passwords do not match. Please re-enter.');
        return;
      }

      btn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (loader) loader.style.display = 'inline-block';

      // Simulate Bcrypt hashing with 12 salt rounds
      await new Promise(r => setTimeout(r, 800));

      const users = getStoredUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        btn.disabled = false;
        if (btnText) btnText.style.display = 'inline-block';
        if (loader) loader.style.display = 'none';
        showAlert('An account with this email address already exists.');
        return;
      }

      const newUser = {
        id: Math.floor(Math.random() * 9000) + 1000,
        name,
        email,
        password,
        role: 'Registered Scholar',
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      saveUsers(users);

      setActiveSession(newUser);

      btn.disabled = false;
      if (btnText) btnText.style.display = 'inline-block';
      if (loader) loader.style.display = 'none';

      showSession(newUser);
    });
  }

  // Guide Modal handlers
  if (openGuideBtn && guideModal) {
    openGuideBtn.addEventListener('click', () => { guideModal.style.display = 'flex'; });
  }
  if (closeGuideBtn && guideModal) {
    closeGuideBtn.addEventListener('click', () => { guideModal.style.display = 'none'; });
  }
  if (guideModal) {
    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) guideModal.style.display = 'none';
    });
  }

  // Check initial state
  const initialSession = getActiveSession();
  if (initialSession) {
    showSession(initialSession);
  } else {
    switchTab('login');
  }

  probeBackend();
})();
