/**
 * Practical 3: Personal Portfolio Website
 * File: script.js
 * Description: Interactive functionality for navigation, active section tracking,
 *              mobile menu toggling, and interactive UI feedback.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Element Selectors
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const emailBtn = document.getElementById("emailBtn");

  // 2. Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", String(!isExpanded));
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !mobileToggle.contains(event.target)
      ) {
        mobileToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        mobileToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      }
    });
  }

  // 3. Active Link Highlighting with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));

  // 4. Interactive Feedback on "Send Me an Email"
  if (emailBtn) {
    emailBtn.addEventListener("click", (e) => {
      // Allow default mailto action while providing a subtle visual feedback
      emailBtn.style.transform = "scale(0.97)";
      setTimeout(() => {
        emailBtn.style.transform = "";
      }, 200);
    });
  }

  // 5. Interactive Tilt & Card Focus
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("focused");
      }
    });
  });
});

