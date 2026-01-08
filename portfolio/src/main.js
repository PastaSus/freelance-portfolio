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
let lastFocusedEl;

function animateOpenNav() {
  // Guard against double-open
  if (!nav.hidden) return;

  lastFocusedEl = document.activeElement;

  nav.hidden = false;
  openNavBtn.setAttribute("aria-expanded", "true");

  requestAnimationFrame(() => {
    nav.classList.remove("translate-x-full", "opacity-0");
    nav.classList.add("translate-x-0", "opacity-100");
  });

  removeTrapFocus = trapFocus(nav);
  closeNavBtn.focus();
}

function animateCloseNav() {
  // Guard against double-close
  if (nav.hidden) return;

  requestAnimationFrame(() => {
    nav.classList.add("translate-x-full", "opacity-0");
  });

  nav.addEventListener(
    "transitionend",
    () => {
      nav.hidden = true;
    },
    { once: true },
  );

  openNavBtn.setAttribute("aria-expanded", "false");

  if (lastFocusedEl) {
    lastFocusedEl.focus({ preventScroll: true });
  }

  if (removeTrapFocus) removeTrapFocus();
}

// Focus trap function
function trapFocus(container) {
  const focusables = container.querySelectorAll(".nav__close, .nav__link");

  // Ensure focusables exist (safety guard)
  if (focusables.length === 0) {
    return () => {};
  }

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
