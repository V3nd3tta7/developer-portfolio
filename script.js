// Update these values before publishing to personalize the portfolio.
const PROFESSIONAL_NAME = "";
const BRAND_NAME = "Independent Web Developer";
const BRAND_MARK = "V.";
const CONTACT_EMAIL = "seregaboldeskiy2525@gmail.com";
const CONTACT_TELEGRAM = "";

document.documentElement.classList.add("has-js");

const displayName = PROFESSIONAL_NAME.trim() || BRAND_NAME;
document.querySelectorAll("[data-brand-name]").forEach((element) => {
  element.textContent = displayName;
});
document.querySelectorAll("[data-brand-mark]").forEach((element) => {
  element.textContent = BRAND_MARK;
});
document.title = `${displayName} — Modern websites, thoughtfully built.`;
const openGraphTitle = document.querySelector('meta[property="og:title"]');
if (openGraphTitle) openGraphTitle.setAttribute("content", document.title);

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

const contactAction = document.querySelector(".contact-action");
const emailPlaceholder = document.querySelector(".contact-email-placeholder");
const contactNote = document.querySelector(".contact-note");
const optionalContactLinks = document.querySelector(".optional-contact-links");

if (contactAction && emailPlaceholder && contactNote && CONTACT_EMAIL.trim()) {
  const address = CONTACT_EMAIL.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
    console.error("CONTACT_EMAIL must be a valid email address; the email contact link was not enabled.");
    emailPlaceholder.textContent = "Email contact is not available yet.";
  } else {
    const emailButton = document.createElement("a");
    emailButton.className = "button button-light contact-email";
    emailButton.href = `mailto:${address}`;
    emailButton.textContent = "Get in touch";
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    emailButton.append(" ", arrow);
    emailPlaceholder.replaceWith(emailButton);
    contactNote.textContent = address;
    contactNote.hidden = false;
  }
}

if (optionalContactLinks && CONTACT_TELEGRAM.trim()) {
  let telegramUrl;
  try {
    telegramUrl = new URL(CONTACT_TELEGRAM.trim());
  } catch (error) {
    console.error("CONTACT_TELEGRAM must be a valid HTTPS Telegram link.", error);
  }

  if (telegramUrl && telegramUrl.protocol === "https:" && ["t.me", "telegram.me"].includes(telegramUrl.hostname)) {
    const telegramLink = document.createElement("a");
    telegramLink.className = "contact-telegram";
    telegramLink.href = telegramUrl.href;
    telegramLink.target = "_blank";
    telegramLink.rel = "noopener noreferrer";
    telegramLink.textContent = "Message me on Telegram ↗";
    optionalContactLinks.append(telegramLink);
  } else if (telegramUrl) {
    console.error("CONTACT_TELEGRAM must use an https://t.me/ or https://telegram.me/ address.");
  }
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll("[data-reveal]");
document.querySelectorAll(".project-preview-image").forEach((image) => {
  const preview = image.closest(".project-visual");
  if (!preview) return;

  const hideBrokenImage = () => {
    image.hidden = true;
  };

  image.addEventListener("error", hideBrokenImage, { once: true });
  if (image.complete && image.naturalWidth === 0) hideBrokenImage();
});

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
