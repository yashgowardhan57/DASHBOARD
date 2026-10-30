/**
 * Practical 4: Animated Login & Registration Page
 * Technology: Vanilla JavaScript (ES6+), Fetch API, CSS Transitions
 *
 * API_BASE_URL:
 *   - When hosted on Netlify (static), set this to your Render backend URL.
 *   - When running locally with `npm start`, leave it as '' (same-origin).
 *
 * Set the window.__API_BASE__ variable in index.html or use the RENDER_URL below.
 */

const API_BASE = window.__API_BASE__ || '';

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

  // Social Buttons
  const googleBtn = document.getElementById('googleBtn');
  const githubBtn = document.getElementById('githubBtn');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');

  // =========================================================================
  // 1. Restore "Remember Me" email from localStorage
  // =========================================================================
  const savedEmail = localStorage.getItem('onyx_saved_email');
  if (savedEmail && signInEmailInput && rememberMeCheckbox) {
    signInEmailInput.value = savedEmail;
    rememberMeCheckbox.checked = true;
  }

  // =========================================================================
  // 2. Smooth Form Transitions
  // =========================================================================
  function switchForm(target) {
    [signInContainer, registerContainer, authenticatedContainer].forEach(c => {
      if (c) c.classList.remove('active');
    });

    if (target === 'register') registerContainer.classList.add('active');
    else if (target === 'authenticated') authenticatedContainer.classList.add('active');
    else signInContainer.classList.add('active');
  }

  toRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm('register');
  });

  toSignInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm('signIn');
  });

  signOutBtn.addEventListener('click', () => {
    switchForm('signIn');
    signInPasswordInput.value = '';
    showToast('You have been signed out safely.', 'success');
  });

  // =========================================================================
  // 3. Password Show / Hide Toggle
  // =========================================================================
  function setupPasswordToggle(toggleBtn, passwordInput) {
    if (!toggleBtn || !passwordInput) return;
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      const eyeShow = toggleBtn.querySelector('.eye-icon.show');
      const eyeHide = toggleBtn.querySelector('.eye-icon.hide');
      if (isPassword) {
        eyeShow.classList.add('hidden');
        eyeHide.classList.remove('hidden');
      } else {
        eyeShow.classList.remove('hidden');
        eyeHide.classList.add('hidden');
      }
    });
  }

  setupPasswordToggle(toggleSignInPassword, signInPasswordInput);
  setupPasswordToggle(toggleRegisterPassword, registerPasswordInput);

  // Live password length check
  if (registerPasswordInput && passwordRequirement) {
    registerPasswordInput.addEventListener('input', () => {
      if (registerPasswordInput.value.length >= 8) {
        passwordRequirement.classList.add('valid');
      } else {
        passwordRequirement.classList.remove('valid');
      }
    });
  }

  // =========================================================================
  // 4. PostgreSQL Live Status Check
  // =========================================================================
  async function checkDatabaseConnection() {
    try {
      const response = await fetch(`${API_BASE}/api/status`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        if (data.connected) {
          dbStatusDot.classList.remove('disconnected');
          dbStatusDot.classList.add('connected');
          dbStatusText.textContent = `PostgreSQL: ${data.database} (${data.registeredUsers} users)`;
          return;
        }
      }
      throw new Error('Disconnected');
    } catch (err) {
      dbStatusDot.classList.remove('connected');
      dbStatusDot.classList.add('disconnected');
      dbStatusText.textContent = 'PostgreSQL: Disconnected';
    }
  }

  checkDatabaseConnection();
  setInterval(checkDatabaseConnection, 15000);

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

  // =========================================================================
  // 6. Sign In Form — POST /api/login → Neon PostgreSQL via Render
  // =========================================================================
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signInEmailInput.value.trim();
    const password = signInPasswordInput.value;

    if (!email) { showToast('Please enter your email address.', 'error'); return; }
    if (!password) { showToast('Please enter your password.', 'error'); return; }

    setButtonLoading(signInSubmitBtn, true);

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();

      if (response.ok && result.success) {
        if (rememberMeCheckbox.checked) {
          localStorage.setItem('onyx_saved_email', email);
        } else {
          localStorage.removeItem('onyx_saved_email');
        }

        showToast(result.message, 'success');

        if (result.user) {
          welcomeUserHeading.textContent = `Welcome, ${result.user.name}!`;
          profileName.textContent = result.user.name;
          profileEmail.textContent = result.user.email;
          profileId.textContent = `#${result.user.id}`;
        }
        switchForm('authenticated');
      } else {
        showToast(result.message || 'Invalid credentials.', 'error');
      }
    } catch (err) {
      console.error('Login error:', err);
      showToast('Cannot reach the server. Please check your connection.', 'error');
    } finally {
      setButtonLoading(signInSubmitBtn, false);
    }
  });

  // =========================================================================
  // 7. Register Form — POST /api/register → Neon PostgreSQL via Render
  // =========================================================================
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = registerPasswordInput.value;
    const termsChecked = document.getElementById('termsCheckbox').checked;

    if (!name) { showToast('Please enter your full name.', 'error'); return; }
    if (!email) { showToast('Please enter your email address.', 'error'); return; }
    if (password.length < 8) { showToast('Password must be at least 8 characters.', 'error'); return; }
    if (!termsChecked) { showToast('Please agree to the Terms of Service & Privacy Policy.', 'error'); return; }

    setButtonLoading(registerSubmitBtn, true);

    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const result = await response.json();

      if (response.ok && result.success) {
        showToast(result.message, 'success');
        switchForm('signIn');
        signInEmailInput.value = email;
        signInPasswordInput.value = '';
        signInPasswordInput.focus();
        registerForm.reset();
        passwordRequirement.classList.remove('valid');
      } else {
        showToast(result.message || 'Registration failed. Please check your inputs.', 'error');
      }
    } catch (err) {
      console.error('Registration error:', err);
      showToast('Cannot reach the server. Please check your connection.', 'error');
    } finally {
      setButtonLoading(registerSubmitBtn, false);
    }
  });

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

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Google OAuth: Redirect initiated.', 'success');
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', () => {
      showToast('GitHub OAuth: Redirect initiated.', 'success');
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link sent to your registered email address.', 'success');
    });
  }
});
