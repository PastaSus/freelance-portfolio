// const toggleBtn = document.querySelector(".nav-toggle");
// const navLinks = document.querySelector(".nav-links");

// toggleBtn.addEventListener("click", () => {
//   if (navLinks.classList.contains("hidden")) {
//     // Show menu
//     navLinks.classList.remove("hidden");

//     // Allow transition to take effect
//     setTimeout(() => {
//       navLinks.classList.remove("-translate-y-50");
//     }, 50);

//     // Update aria-label
//     toggleBtn.setAttribute("aria-label", "Close Navigation");
//   } else {
//     // Hide menu
//     navLinks.classList.add("-translate-y-50");

//     // Wait for transition to finish, then hide
//     navLinks.addEventListener(
//       "transitionend",
//       function handler() {
//         navLinks.classList.add("hidden");
//         navLinks.removeEventListener("transitionend", handler);
//       },
//       { once: true },
//     );

//     // Update aria-label
//     toggleBtn.setAttribute("aria-label", "Open Navigation");
//   }
// });
// below is code from space tourism nav that i want to integrate here in my portfolio
const openNavBtn = document.querySelector(".nav__open");
const closeNavBtn = document.querySelector(".nav__close");
const nav = document.querySelector(".nav");

openNavBtn.addEventListener("click", animateOpenNav);
closeNavBtn.addEventListener("click", animateCloseNav);

// Show/hide nav depending on screen width
document.addEventListener("DOMContentLoaded", changeNavHeader);
window.addEventListener("resize", changeNavHeader);

function changeNavHeader() {
  const isTabletAbove = window.innerWidth >= 768;
  nav.hidden = !isTabletAbove;
}

// Trap focus for accessibility
let removeTrapFocus;

function animateOpenNav() {
  const isClosed = nav.classList.contains("translate-x-full");
  if (!isClosed) return;

  nav.hidden = false;

  requestAnimationFrame(() => {
    nav.classList.remove("translate-x-full", "opacity-0");
    nav.classList.add("translate-x-0", "opacity-100");
  });

  openNavBtn.setAttribute("aria-expanded", "true");
  removeTrapFocus = trapFocus(nav);
  closeNavBtn.focus();
}

function animateCloseNav() {
  const isOpen = nav.classList.contains("translate-x-0");
  if (!isOpen) return;

  requestAnimationFrame(() => {
    nav.classList.add("translate-x-full", "opacity-0");
  });

  nav.addEventListener(
    "transitionend",
    () => {
      if (nav.classList.contains("translate-x-full")) nav.hidden = true;
    },
    { once: true },
  );

  openNavBtn.setAttribute("aria-expanded", "false");
  openNavBtn.focus();

  if (removeTrapFocus) removeTrapFocus();
}

// Focus trap function
function trapFocus(container) {
  const focusables = container.querySelectorAll(".nav__close, .nav__link");
  const firstEl = focusables[0];
  const lastEl = focusables[focusables.length - 1];

  function handleTrap(e) {
    if (e.key !== "Tab") return;
    if (window.innerWidth >= 768) return;

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  }

  container.addEventListener("keydown", handleTrap);

  return () => container.removeEventListener("keydown", handleTrap);
}
