/* Theory Made Fun (theorymadefun.com) — progressive enhancement.
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

// 3. Google Ads conversion for sign-up clicks. Paste the value from
//    the conversion action's "send_to" (looks like "AW-123456789/AbC-DEfGhIJk").
//    Requires window.GOOGLE_ADS_ID to be set in index.html too.
//    See docs/google-setup.md.
const GOOGLE_ADS_SEND_TO = "";
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

// --- Analytics ----------------------------------------------
// Events flow to GA4 through the Google tag configured in index.html.
// gtag is always defined there, and calls are harmless no-ops until a
// real Measurement ID is pasted in — so this code is safe to ship early.
function track(eventName, params) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params || {});
  }
}

// Where on the page a click came from (nearest ancestor with an id,
// e.g. "pricing", "signup", "top" for the header nav).
function linkLocation(el) {
  const withId = el.closest("[id]");
  return (withId && withId.id) || "page";
}

// Sign-up CTAs. While the Google Form is still pending, CTAs point at the
// #signup anchor and we record "sign_up_intent" (baseline interest). Once
// SIGNUP_FORM_URL is live they lead to the real form and we record
// "sign_up_click" — the key event / Google Ads conversion.
document.querySelectorAll("[data-signup-link], [data-signup-form]").forEach((link) => {
  link.addEventListener("click", () => {
    if (SIGNUP_FORM_URL) {
      track("sign_up_click", { link_location: linkLocation(link) });
      if (GOOGLE_ADS_SEND_TO && typeof window.gtag === "function") {
        window.gtag("event", "conversion", { send_to: GOOGLE_ADS_SEND_TO });
      }
    } else {
      track("sign_up_intent", { link_location: linkLocation(link) });
    }
  });
});

// Contact email clicks (secondary key event).
document.querySelectorAll("[data-email-link]").forEach((link) => {
  link.addEventListener("click", () => {
    track("email_click", { link_location: linkLocation(link) });
  });
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
