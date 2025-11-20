const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  if (navLinks.classList.contains("hidden")) {
    // Show menu
    navLinks.classList.remove("hidden");

    // Allow transition to take effect
    setTimeout(() => {
      navLinks.classList.remove("-translate-y-50");
    }, 50);

    // Update aria-label
    toggleBtn.setAttribute("aria-label", "Close Navigation");
  } else {
    // Hide menu
    navLinks.classList.add("-translate-y-50");

    // Wait for transition to finish, then hide
    navLinks.addEventListener(
      "transitionend",
      function handler() {
        navLinks.classList.add("hidden");
        navLinks.removeEventListener("transitionend", handler);
      },
      { once: true },
    );

    // Update aria-label
    toggleBtn.setAttribute("aria-label", "Open Navigation");
  }
});
