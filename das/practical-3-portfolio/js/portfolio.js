/* ============================
   Practical 3 — Portfolio JS
   Mobile menu, scroll reveal, form validation, back-to-top
   ============================ */

(function () {
  'use strict';

  // ---- Mobile Menu ----
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu on link click
    var navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // ---- Active Nav on Scroll ----
  var sections = document.querySelectorAll('.section, .hero');
  var allNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ---- Scroll Reveal ----
  var revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);

  // ---- Back to Top ----
  var backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Contact Form Validation ----
  var form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = document.getElementById('contactName');
      var email = document.getElementById('contactEmail');
      var message = document.getElementById('contactMessage');

      // Reset
      [name, email, message].forEach(function (field) {
        field.classList.remove('invalid');
      });

      if (!name.value.trim()) {
        name.classList.add('invalid');
        valid = false;
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.classList.add('invalid');
        valid = false;
      }

      if (!message.value.trim()) {
        message.classList.add('invalid');
        valid = false;
      }

      if (valid) {
        alert('Form validated successfully! Note: This form is not connected to a mail service.');
        form.reset();
      }
    });
  }

  // ---- Back to Hub Link Normalizer ----
  document.querySelectorAll('.back-to-hub, .footer-hub-link, a[href*="dashboard/index.html"]').forEach(function (link) {
    if (window.location.protocol.startsWith('http')) {
      link.href = '/index.html';
    } else {
      link.href = '../dashboard/index.html';
    }
  });

})();
