/**
 * Practical 4: Animated Login & Registration Page (ONYX Gateway)
 * Technology: Vanilla JavaScript (ES6+), Fetch API, CSS Transitions, Local Demo Fallback
 */

// Intelligently determine API base URL
const API_BASE = (function() {
  if (typeof window !== 'undefined' && window.__API_BASE__ !== undefined && window.__API_BASE__ !== '') {
    return window.__API_BASE__;
  }
  if (typeof window !== 'undefined') {
    if (window.location.port === '3001' || window.location.port === '3000') return '';
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
  }
  return '';
})();

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Containers
  const signInContainer = document.getElementById('signInContainer');
  const registerContainer = document.getElementById('registerContainer');
  const authenticatedContainer = document.getElementById('authenticatedContainer');

  // Switcher Buttons
  const toRegisterBtn = document.getElementById('toRegisterBtn');
  const toSignInBtn = document.getElementById('toSignInBtn');
  const signOutBtn = document.getElementById('signOutBtn');

  // Forms
  const signInForm = document.getElementById('signInForm');
  const registerForm = document.getElementById('registerForm');

  // Submit Buttons
  const signInSubmitBtn = document.getElementById('signInSubmitBtn');
  const registerSubmitBtn = document.getElementById('registerSubmitBtn');

  // Password Toggles
  const toggleSignInPassword = document.getElementById('toggleSignInPassword');
  const signInPasswordInput = document.getElementById('signInPassword');

  const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
  const registerPasswordInput = document.getElementById('registerPassword');
  const passwordRequirement = document.querySelector('.password-requirement');

  // Remember Me
  const rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
  const signInEmailInput = document.getElementById('signInEmail');

  // Status & Toast
  const dbStatusText = document.getElementById('dbStatusText');
  const dbStatusDot = document.querySelector('.db-status-dot');
  const toastContainer = document.getElementById('toastContainer');

  // Profile Elements (Authenticated Dashboard)
  const welcomeUserHeading = document.getElementById('welcomeUserHeading');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileId = document.getElementById('profileId');

  // =========================================================================
  // Demo Mode Local Storage Helper
  // =========================================================================
  function getDemoUsers() {
    try {
      const stored = localStorage.getItem('onyx_demo_accounts');
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return [
      { id: 101, name: 'Yash Gowardhan', email: 'yash@example.com', password: 'password123', created_at: new Date().toISOString() },
      { id: 102, name: 'Demo User', email: 'demo@onyx.local', password: 'password123', created_at: new Date().toISOString() }
    ];
  }

  function saveDemoUsers(users) {
    try {
      localStorage.setItem('onyx_demo_accounts', JSON.stringify(users));
    } catch (_) {}
  }

  // =========================================================================
  // 1. Initial State & Auto-fill Saved Email
  // =========================================================================
  const savedEmail = localStorage.getItem('onyx_saved_email');
  if (savedEmail && signInEmailInput) {
    signInEmailInput.value = savedEmail;
    if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
  }

  // =========================================================================
  // 2. Smooth Form Switching Animations
  // =========================================================================
  function switchForm(target) {
    [signInContainer, registerContainer, authenticatedContainer].forEach(c => {
      if (!c) return;
      c.classList.remove('active');
      c.style.display = 'none';
    });

    let activeContainer;
    if (target === 'register') activeContainer = registerContainer;
    else if (target === 'authenticated') activeContainer = authenticatedContainer;
    else activeContainer = signInContainer;

    if (activeContainer) {
      activeContainer.style.display = 'block';
      void activeContainer.offsetWidth; // Force CSS reflow
      activeContainer.classList.add('active');
    }
  }

  if (toRegisterBtn) {
    toRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchForm('register');
    });
  }

  if (toSignInBtn) {
    toSignInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchForm('signIn');
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      showToast('You have been signed out safely.', 'success');
      switchForm('signIn');
      if (signInPasswordInput) signInPasswordInput.value = '';
    });
  }

  // =========================================================================
  // 3. Password Reveal Toggles
  // =========================================================================
  function setupPasswordToggle(btn, input) {
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      const eyeOpen = btn.querySelector('.eye-open');
      const eyeClosed = btn.querySelector('.eye-closed');
      if (eyeOpen) eyeOpen.classList.toggle('hidden', isPassword);
      if (eyeClosed) eyeClosed.classList.toggle('hidden', !isPassword);
    });
  }

  setupPasswordToggle(toggleSignInPassword, signInPasswordInput);
  setupPasswordToggle(toggleRegisterPassword, registerPasswordInput);

  if (registerPasswordInput && passwordRequirement) {
    registerPasswordInput.addEventListener('input', () => {
      passwordRequirement.classList.toggle('valid', registerPasswordInput.value.length >= 8);
    });
  }

  // =========================================================================
  // 4. Live Connection & Status Check
  // =========================================================================
  async function checkDatabaseConnection() {
    try {
      const response = await fetch(`${API_BASE}/api/status`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        if (data.connected) {
          if (dbStatusDot) {
            dbStatusDot.className = 'db-status-dot connected';
          }
          if (dbStatusText) {
            dbStatusText.textContent = `${data.database} (${data.registeredUsers} users)`;
          }
          return;
        }
      }
      throw new Error('Disconnected');
    } catch (_) {
      if (dbStatusDot) {
        dbStatusDot.className = 'db-status-dot demo';
      }
      if (dbStatusText) {
        const count = getDemoUsers().length;
        dbStatusText.textContent = `Demo Mode (Server Offline • ${count} accounts active)`;
      }
    }
  }

  checkDatabaseConnection();
  setInterval(checkDatabaseConnection, 12000);

  // =========================================================================
  // 5. Toast Notification System
  // =========================================================================
  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconSvg = type === 'success'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `<span class="toast-icon">${iconSvg}</span><span class="toast-message">${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-16px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function handleLoginSuccess(user, message) {
    if (rememberMeCheckbox && rememberMeCheckbox.checked && signInEmailInput) {
      localStorage.setItem('onyx_saved_email', signInEmailInput.value.trim());
    } else {
      localStorage.removeItem('onyx_saved_email');
    }

    showToast(message || `Welcome back, ${user.name}!`, 'success');

    if (user) {
      if (welcomeUserHeading) welcomeUserHeading.textContent = `Welcome, ${user.name}!`;
      if (profileName) profileName.textContent = user.name;
      if (profileEmail) profileEmail.textContent = user.email;
      if (profileId) profileId.textContent = `#${user.id}`;
    }
    switchForm('authenticated');
  }

  // =========================================================================
  // 6. Sign In Form — Live Server with Resilient Demo Fallback
  // =========================================================================
  if (signInForm) {
    signInForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = signInEmailInput ? signInEmailInput.value.trim() : '';
      const password = signInPasswordInput ? signInPasswordInput.value : '';

      if (!email) { showToast('Please enter your email address.', 'error'); return; }
      if (!password) { showToast('Please enter your password.', 'error'); return; }

      setButtonLoading(signInSubmitBtn, true);

      // Attempt live server first
      try {
        const response = await fetch(`${API_BASE}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const result = await response.json();

        if (response.ok && result.success) {
          handleLoginSuccess(result.user, result.message);
          return;
        } else {
          showToast(result.message || 'Invalid credentials. Please verify your email and password.', 'error');
          return;
        }
      } catch (err) {
        console.warn('[Authentication] Live server unreachable, falling back to local demo mode:', err.message);
        
        // Demo fallback verification
        const demoUsers = getDemoUsers();
        const normalized = email.toLowerCase();
        const matched = demoUsers.find(u => u.email.toLowerCase() === normalized);

        if (matched) {
          if (matched.password === password) {
            handleLoginSuccess(matched, `Signed in as ${matched.name} (Demo Mode)`);
          } else {
            showToast('Incorrect password for demo account.', 'error');
          }
        } else {
          showToast('No account found. Sign up or try demo: yash@example.com / password123', 'error');
        }
      } finally {
        setButtonLoading(signInSubmitBtn, false);
      }
    });
  }

  // =========================================================================
  // 7. Register Form — Live Server with Resilient Demo Fallback
  // =========================================================================
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('registerName');
      const emailInput = document.getElementById('registerEmail');
      const termsInput = document.getElementById('termsCheckbox');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const password = registerPasswordInput ? registerPasswordInput.value : '';
      const termsChecked = termsInput ? termsInput.checked : true;

      if (!name) { showToast('Please enter your full name.', 'error'); return; }
      if (!email) { showToast('Please enter your email address.', 'error'); return; }
      if (password.length < 8) { showToast('Password must be at least 8 characters.', 'error'); return; }
      if (!termsChecked) { showToast('Please agree to the Terms of Service & Privacy Policy.', 'error'); return; }

      setButtonLoading(registerSubmitBtn, true);

      // Attempt live server first
      try {
        const response = await fetch(`${API_BASE}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const result = await response.json();

        if (response.ok && result.success) {
          showToast(result.message || 'Account created successfully! Welcome to ONYX.', 'success');
          switchForm('signIn');
          if (signInEmailInput) signInEmailInput.value = email;
          if (signInPasswordInput) {
            signInPasswordInput.value = '';
            signInPasswordInput.focus();
          }
          registerForm.reset();
          if (passwordRequirement) passwordRequirement.classList.remove('valid');
          return;
        } else {
          showToast(result.message || 'Registration failed. Please check your inputs.', 'error');
          return;
        }
      } catch (err) {
        console.warn('[Registration] Live server unreachable, saving to local demo storage:', err.message);

        // Demo fallback registration
        const demoUsers = getDemoUsers();
        const normalized = email.toLowerCase();

        if (demoUsers.some(u => u.email.toLowerCase() === normalized)) {
          showToast('An account with this email already exists. Please sign in.', 'error');
        } else {
          const newUser = {
            id: demoUsers.length + 101,
            name,
            email: normalized,
            password,
            created_at: new Date().toISOString()
          };
          demoUsers.push(newUser);
          saveDemoUsers(demoUsers);

          showToast('Account created in Demo Mode! You can now sign in.', 'success');
          switchForm('signIn');
          if (signInEmailInput) signInEmailInput.value = email;
          if (signInPasswordInput) {
            signInPasswordInput.value = '';
            signInPasswordInput.focus();
          }
          registerForm.reset();
          if (passwordRequirement) passwordRequirement.classList.remove('valid');
          checkDatabaseConnection();
        }
      } finally {
        setButtonLoading(registerSubmitBtn, false);
      }
    });
  }

  // =========================================================================
  // 8. Helpers
  // =========================================================================
  function setButtonLoading(btn, isLoading) {
    if (!btn) return;
    const spinner = btn.querySelector('.btn-spinner');
    const textSpan = btn.querySelector('.btn-text');
    btn.disabled = isLoading;
    if (spinner) spinner.classList.toggle('hidden', !isLoading);
    if (textSpan) textSpan.style.opacity = isLoading ? '0.4' : '1';
  }
});
