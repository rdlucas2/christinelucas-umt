/* Ultimate Music Theory Club — progressive enhancement.
   The site is fully usable with JavaScript disabled. */

// ============================================================
// EDIT ME: launch configuration
// ============================================================
// 1. Paste the Google Form URL here when it's ready. Every
//    "Join the Club" button switches from the #signup anchor to
//    the form automatically, and the "coming soon" pill becomes
//    a live "Sign up now" button.
const SIGNUP_FORM_URL = "";

// 2. Replace with the real contact email (also update the two
//    mailto/placeholder spots in index.html flagged with TODO).
const CONTACT_EMAIL = "contact@christinelucaspiano.com?Subject=UMT%20Club%20Request";
// ============================================================

document.documentElement.classList.add("js");

// --- Sign-up wiring -----------------------------------------
const signupLinks = document.querySelectorAll("[data-signup-link]");
const signupFormBtn = document.querySelector("[data-signup-form]");
const signupSoonPill = document.querySelector("[data-signup-soon]");
const signupPendingCopy = document.querySelector("[data-signup-pending]");

if (SIGNUP_FORM_URL) {
  signupLinks.forEach((link) => {
    link.href = SIGNUP_FORM_URL;
    link.target = "_blank";
    link.rel = "noopener";
  });
  if (signupFormBtn) {
    signupFormBtn.href = SIGNUP_FORM_URL;
    signupFormBtn.target = "_blank";
    signupFormBtn.rel = "noopener";
    signupFormBtn.removeAttribute("aria-disabled");
    signupFormBtn.hidden = false;
  }
  if (signupSoonPill) signupSoonPill.hidden = true;
  if (signupPendingCopy) {
    signupPendingCopy.textContent =
      "Registration for the 2026–27 year is open — spots are limited, so grab yours!";
  }
}

// --- Email links --------------------------------------------
document.querySelectorAll("[data-email-link]").forEach((link) => {
  link.href = "mailto:" + CONTACT_EMAIL;
});

// --- Mobile nav ---------------------------------------------
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

if (header && navToggle) {
  navToggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Close the menu after tapping a link
  header.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// --- Header shadow on scroll --------------------------------
const onScroll = () => {
  header && header.classList.toggle("is-scrolled", window.scrollY > 4);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// --- Reveal on scroll ---------------------------------------
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}
