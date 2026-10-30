/**
 * BLACK PLATE — Luxury Dining Experience
 * Interactive UI Controller: Navigation, Active Sections, Booking Modal, Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Elements
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const modalBackdrop = document.getElementById('reservationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalBtns = [
    document.getElementById('heroReserveBtn'),
    document.getElementById('bookNowBtn')
  ].filter(Boolean);
  const reservationForm = document.getElementById('reservationForm');
  const modalSuccess = document.getElementById('modalSuccess');
  const successSummary = document.getElementById('successSummary');
  const successDoneBtn = document.getElementById('successDoneBtn');
  const toast = document.getElementById('toastMessage');
  const resDateInput = document.getElementById('resDate');

  // Set default reservation date to tomorrow
  if (resDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    resDateInput.value = tomorrow.toISOString().split('T')[0];
    resDateInput.min = new Date().toISOString().split('T')[0];
  }

  // Mobile Navigation Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (targetLink) targetLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // Reservation Modal Logic
  function openModal() {
    if (!modalBackdrop) return;
    modalBackdrop.removeAttribute('hidden');
    // Force reflow
    void modalBackdrop.offsetWidth;
    modalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    
    // Reset form & state if needed
    if (modalSuccess) modalSuccess.hidden = true;
    if (reservationForm) reservationForm.style.display = 'flex';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalBackdrop.setAttribute('hidden', '');
    }, 250);
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If clicking "Book Now" or "Reserve Table", trigger modal popup
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  if (successDoneBtn) {
    successDoneBtn.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Handle Reservation Form Submission
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(reservationForm);
      const name = formData.get('name') || 'Guest';
      const guests = formData.get('guests') || '2';
      const date = formData.get('date') || '';
      const time = formData.get('time') || '';

      // Display formatted confirmation
      if (successSummary) {
        successSummary.textContent = `Thank you, ${name}! Your table for ${guests} guest(s) on ${date} at ${time} is reserved.`;
      }

      reservationForm.style.display = 'none';
      if (modalSuccess) modalSuccess.hidden = false;

      // Show toast notification
      showToast(`Reservation confirmed for ${name}!`);
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.removeAttribute('hidden');
    setTimeout(() => {
      toast.setAttribute('hidden', '');
    }, 3500);
  }
});

