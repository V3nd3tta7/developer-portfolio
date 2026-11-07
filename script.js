// Add a real email address here to enable the contact button.
const CONTACT_EMAIL = "";

document.documentElement.classList.add("has-js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) closeMenu();
  });
}

const emailButton = document.querySelector(".contact-email");
const contactNote = document.querySelector(".contact-note");
if (emailButton && contactNote && CONTACT_EMAIL.trim()) {
  const address = CONTACT_EMAIL.trim();
  emailButton.setAttribute("href", `mailto:${encodeURIComponent(address)}`);
  emailButton.removeAttribute("aria-disabled");
  emailButton.textContent = "Get in touch";
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  emailButton.append(" ", arrow);
  contactNote.textContent = address;
  emailButton.classList.remove("contact-email");
  emailButton.classList.add("contact-email-ready");
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        entry.target.classList.remove("is-pending");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => {
    element.classList.add("is-pending");
    observer.observe(element);
  });
}
