/* ========================================================
   Practical 4 — Client-Side Auth Logic
   Tab switching, validation, password toggle, strength meter
   ======================================================== */

(function () {
  'use strict';

  // ---- Tab Switching ----
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const tabIndicator = document.getElementById('tabIndicator');
  const loginPanel = document.getElementById('loginPanel');
  const registerPanel = document.getElementById('registerPanel');
  const clientAlert = document.getElementById('clientAlert');
  const serverAlert = document.getElementById('serverAlert');

  function switchTab(mode) {
    if (clientAlert) clientAlert.style.display = 'none';
    if (serverAlert) serverAlert.style.display = 'none';

    if (mode === 'login') {
      tabLogin.classList.add('active');
      tabLogin.setAttribute('aria-selected', 'true');
      tabRegister.classList.remove('active');
      tabRegister.setAttribute('aria-selected', 'false');
      tabIndicator.classList.remove('slide-right');

      registerPanel.classList.remove('active');
      setTimeout(function () {
        loginPanel.classList.add('active');
        document.getElementById('loginEmail').focus();
      }, 100);

      window.history.replaceState(null, '', '/login');
      document.title = 'Sign In — Secure Auth';
    } else {
      tabRegister.classList.add('active');
      tabRegister.setAttribute('aria-selected', 'true');
      tabLogin.classList.remove('active');
      tabLogin.setAttribute('aria-selected', 'false');
      tabIndicator.classList.add('slide-right');

      loginPanel.classList.remove('active');
      setTimeout(function () {
        registerPanel.classList.add('active');
        document.getElementById('regName').focus();
      }, 100);

      window.history.replaceState(null, '', '/register');
      document.title = 'Register — Secure Auth';
    }
  }

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', function () { switchTab('login'); });
    tabRegister.addEventListener('click', function () { switchTab('register'); });
  }

  // ---- Password Visibility Toggles ----
  document.querySelectorAll('.pw-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var input = document.getElementById(targetId);
      if (!input) return;

      var eyeOpen = this.querySelector('.eye-open');
      var eyeClosed = this.querySelector('.eye-closed');

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

  // ---- Password Strength Meter ----
  var regPassword = document.getElementById('regPassword');
  var strengthFill = document.getElementById('strengthFill');
  var strengthLabel = document.getElementById('strengthLabel');

  if (regPassword && strengthFill && strengthLabel) {
    regPassword.addEventListener('input', function () {
      var val = this.value;
      var score = 0;

      if (!val) {
        strengthFill.style.width = '0%';
        strengthFill.style.backgroundColor = 'var(--accent-red)';
        strengthLabel.textContent = 'Enter password';
        strengthLabel.style.color = 'var(--text-dim)';
        return;
      }

      if (val.length >= 6) score += 25;
      if (val.length >= 10) score += 25;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score += 25;
      if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) score += 25;

      strengthFill.style.width = score + '%';

      if (score <= 25) {
        strengthFill.style.backgroundColor = '#EF4444';
        strengthLabel.textContent = 'Weak password';
        strengthLabel.style.color = '#EF4444';
      } else if (score <= 50) {
        strengthFill.style.backgroundColor = '#F59E0B';
        strengthLabel.textContent = 'Moderate password';
        strengthLabel.style.color = '#F59E0B';
      } else if (score <= 75) {
        strengthFill.style.backgroundColor = '#3B82F6';
        strengthLabel.textContent = 'Good password';
        strengthLabel.style.color = '#3B82F6';
      } else {
        strengthFill.style.backgroundColor = '#10B981';
        strengthLabel.textContent = 'Strong password';
        strengthLabel.style.color = '#10B981';
      }
    });
  }

  // ---- Client Form Validation & Feedback ----
  function showAlert(message) {
    if (clientAlert) {
      clientAlert.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">' +
        '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>' +
        '</svg><span>' + message + '</span>';
      clientAlert.style.display = 'flex';
    }
  }

  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      var email = document.getElementById('loginEmail').value.trim();
      var password = document.getElementById('loginPassword').value;

      if (!email || !password) {
        e.preventDefault();
        showAlert('Please enter both your email address and password.');
        return;
      }

      var btn = document.getElementById('loginBtn');
      if (btn) {
        btn.querySelector('.btn-text').style.opacity = '0.5';
        btn.querySelector('.btn-loader').style.display = 'inline-block';
      }
    });
  }

  var registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      var name = document.getElementById('regName').value.trim();
      var email = document.getElementById('regEmail').value.trim();
      var password = document.getElementById('regPassword').value;
      var confirmPassword = document.getElementById('regConfirmPassword').value;

      if (!name || !email || !password || !confirmPassword) {
        e.preventDefault();
        showAlert('All registration fields are required.');
        return;
      }

      if (password.length < 6) {
        e.preventDefault();
        showAlert('Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        e.preventDefault();
        showAlert('Passwords do not match. Please verify.');
        return;
      }

      var btn = document.getElementById('registerBtn');
      if (btn) {
        btn.querySelector('.btn-text').style.opacity = '0.5';
        btn.querySelector('.btn-loader').style.display = 'inline-block';
      }
    });
  }

  // Update Back to Hub link dynamically if running on another port or domain
  var backToHub = document.getElementById('backToHub');
  if (backToHub) {
    // If opened directly or from port 3000/3001
    if (window.location.protocol === 'file:') {
      backToHub.href = '../../dashboard/index.html';
    } else {
      backToHub.href = 'http://localhost:3000/index.html';
    }
  }
})();
