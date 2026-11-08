// Update these values before publishing to personalize the portfolio.
const PROFESSIONAL_NAME = "";
const BRAND_NAME = "Independent Web Developer";
const BRAND_MARK = "V.";
const CONTACT_EMAIL = "serhiy.boldetskiy.it@gmail.com";
const CONTACT_TELEGRAM = "https://t.me/serhiy_boldetskiy";
const CONTACT_WHATSAPP = "380937687795";

document.documentElement.classList.add("has-js");

const siteVideo = document.querySelector(".site-video");
if (siteVideo instanceof HTMLVideoElement) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let playbackErrorReported = false;
  const reportPlaybackError = (reason) => {
    if (playbackErrorReported) return;
    playbackErrorReported = true;
    console.error("Background video playback failed; the static background remains active.", {
      source: siteVideo.currentSrc || siteVideo.dataset.src,
      reason,
      mediaError: siteVideo.error
        ? { code: siteVideo.error.code, message: siteVideo.error.message || "Unknown media error." }
        : null,
    });
  };

  siteVideo.addEventListener("error", () => {
    reportPlaybackError("The browser could not load or decode the video.");
  }, { once: true });

  const updateSiteVideo = () => {
    if (reducedMotion.matches) {
      siteVideo.pause();
      return;
    }

    if (!siteVideo.src && siteVideo.dataset.src) siteVideo.src = siteVideo.dataset.src;
    siteVideo.play().catch((error) => {
      if (!reducedMotion.matches) reportPlaybackError(error);
      siteVideo.pause();
    });
  };

  updateSiteVideo();
  reducedMotion.addEventListener("change", updateSiteVideo);
}

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

const terminal = document.querySelector("[data-terminal]");
const terminalLines = terminal?.querySelector("[data-terminal-lines]");
if (terminal && terminalLines) {
  const terminalContent = [
    { type: "command", text: "> whoami" },
    { type: "response", text: "> Independent Web Developer" },
    { type: "command", text: "> mission" },
    { type: "response", text: "> Turning ideas into modern websites." },
    { type: "command", text: "> services --list" },
    { type: "service", text: "> Landing Pages" },
    { type: "service", text: "> Business Websites" },
    { type: "service", text: "> Website Redesign" },
    { type: "command", text: "> tech_stack" },
    { type: "response", text: "> HTML · CSS · JavaScript · AI" },
    { type: "command", text: "> portfolio --status" },
    { type: "response", text: "> 2 Live Concept Projects ✓" },
    { type: "command", text: "> availability" },
    { type: "availability", text: "> Open for new projects" },
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    terminalContent.forEach((line) => {
      const element = document.createElement("span");
      element.className = `terminal-line terminal-${line.type}`;
      element.textContent = line.text;
      terminalLines.append(element);
    });
  } else {
    let active = true;
    let timeoutId;
    let lineIndex = 0;
    let characterIndex = 0;
    let currentLine;
    let pauseUntil = 0;

    const typeNextCharacter = () => {
      if (!active) return;
      if (pauseUntil > Date.now()) {
        timeoutId = window.setTimeout(typeNextCharacter, pauseUntil - Date.now());
        return;
      }

      if (lineIndex >= terminalContent.length) {
        return;
      }

      const line = terminalContent[lineIndex];
      if (!currentLine) {
        currentLine = document.createElement("span");
        currentLine.className = `terminal-line terminal-${line.type}`;
        terminalLines.append(currentLine);
      }

      currentLine.textContent += line.text[characterIndex];
      characterIndex += 1;
      terminal.scrollTop = terminal.scrollHeight;

      if (characterIndex >= line.text.length) {
        currentLine = null;
        lineIndex += 1;
        characterIndex = 0;
        pauseUntil = Date.now() + (line.type === "command" ? 280 : 120);
      }

      timeoutId = window.setTimeout(typeNextCharacter, line.type === "command" ? 48 : 24);
    };

    const showAllLines = () => {
      active = false;
      window.clearTimeout(timeoutId);
      terminalLines.replaceChildren();
      terminalContent.forEach((line) => {
        const element = document.createElement("span");
        element.className = `terminal-line terminal-${line.type}`;
        element.textContent = line.text;
        terminalLines.append(element);
      });
      terminal.scrollTop = 0;
    };

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionPreference.addEventListener("change", (event) => {
      if (event.matches) showAllLines();
    });
    timeoutId = window.setTimeout(typeNextCharacter, 450);
  }
}

const createProjectCarousel = (carousel) => {
  const projectName = carousel.dataset.projectName;
  const projectUrl = carousel.dataset.projectUrl;
  const dataElement = carousel.querySelector(".carousel-data");
  const initialSlide = carousel.querySelector(".carousel-slide");
  const controls = carousel.querySelector(".carousel-controls");
  const previousButton = carousel.querySelector("[data-carousel-previous]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const toggleButton = carousel.querySelector("[data-carousel-toggle]");
  const countElement = carousel.querySelector("[data-carousel-count]");
  const dotsElement = carousel.querySelector("[data-carousel-dots]");

  if (!projectName || !projectUrl || !dataElement || !initialSlide || !controls
    || !previousButton || !nextButton || !toggleButton || !countElement || !dotsElement) {
    console.error("Project carousel markup is incomplete.", carousel);
    return;
  }

  let slideData;
  try {
    slideData = JSON.parse(dataElement.textContent);
  } catch (error) {
    console.error(`Unable to parse ${projectName} carousel image data.`, error);
    return;
  }

  if (!Array.isArray(slideData) || slideData.length < 2
    || slideData.some((slide) => !slide || typeof slide.src !== "string" || typeof slide.alt !== "string")
    || initialSlide.querySelector("img")?.getAttribute("src") !== slideData[0].src) {
    console.error(`Invalid image data for the ${projectName} carousel.`, slideData);
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slides = new Array(slideData.length);
  const available = slideData.map(() => true);
  const preloaded = new Map();
  let currentIndex = 0;
  let transitionId = 0;
  let intervalId;
  let manuallyPaused = false;
  let pointerInside = false;
  let focusedInside = false;

  slides[0] = initialSlide;
  initialSlide.dataset.slideIndex = "0";
  initialSlide.setAttribute("aria-label", `Open the ${projectName} live website`);

  const updateControls = () => {
    countElement.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(slideData.length).padStart(2, "0")}`;
    dotsElement.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === currentIndex));
      dot.disabled = !available[index];
    });

    const paused = manuallyPaused || reducedMotion.matches;
    toggleButton.textContent = paused ? "▶" : "Ⅱ";
    toggleButton.setAttribute("aria-label", reducedMotion.matches
      ? "Automatic slideshow disabled by reduced motion preference"
      : `${manuallyPaused ? "Play" : "Pause"} automatic slideshow`);
    toggleButton.setAttribute("aria-pressed", String(manuallyPaused));
    toggleButton.disabled = reducedMotion.matches;
  };

  const preloadSlide = (index) => {
    if (!available[index]) return Promise.reject(new Error("Slide is unavailable."));
    if (!preloaded.has(index)) {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = "low";
      let resolveRequest;
      let rejectRequest;
      const request = new Promise((resolve, reject) => {
        resolveRequest = resolve;
        rejectRequest = reject;
        image.addEventListener("load", () => resolve(image), { once: true });
        image.addEventListener("error", () => reject(new Error(`Unable to load ${slideData[index].src}`)), { once: true });
      });
      image.src = slideData[index].src;
      if (image.complete) {
        if (image.naturalWidth > 0) resolveRequest(image);
        else rejectRequest(new Error(`Unable to load ${slideData[index].src}`));
      }
      preloaded.set(index, request);
    }

    return preloaded.get(index);
  };

  const getSlideElement = (index) => {
    if (slides[index]) return slides[index];

    const link = document.createElement("a");
    link.className = "carousel-slide";
    link.href = projectUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open the ${projectName} live website`);
    link.dataset.slideIndex = String(index);

    const image = document.createElement("img");
    image.alt = slideData[index].alt;
    image.loading = "lazy";
    image.decoding = "async";
    link.append(image);
    slides[index] = link;
    image.src = slideData[index].src;
    return link;
  };

  const nextAvailableIndex = (startIndex, direction) => {
    for (let offset = 1; offset <= slideData.length; offset += 1) {
      const index = (startIndex + direction * offset + slideData.length * offset) % slideData.length;
      if (available[index]) return index;
    }
    return -1;
  };

  const markUnavailable = (index, error) => {
    available[index] = false;
    console.warn(`Skipping unavailable ${projectName} carousel image: ${slideData[index].src}`, error);
    const frame = slides[index];
    if (frame) frame.remove();
    slides[index] = null;
    updateControls();

    if (!available.some(Boolean)) return;
    if (index === currentIndex) {
      const fallbackIndex = nextAvailableIndex(index, 1);
      if (fallbackIndex !== -1) showSlide(fallbackIndex, false);
    }
  };

  const showSlide = async (index, resetTimer = true) => {
    if (index === currentIndex || !available[index]) {
      if (resetTimer) syncTimer();
      return;
    }

    const requestId = ++transitionId;
    try {
      await preloadSlide(index);
    } catch (error) {
      markUnavailable(index, error);
      if (resetTimer) syncTimer();
      return;
    }

    if (requestId !== transitionId || !available[index]) return;

    const nextFrame = getSlideElement(index);
    const image = nextFrame.querySelector("img");
    if (image.complete && image.naturalWidth === 0) {
      markUnavailable(index, new Error(`Unable to decode ${slideData[index].src}`));
      return;
    }

    const previousFrame = slides[currentIndex];
    carousel.append(nextFrame);
    nextFrame.classList.remove("is-exiting");
    nextFrame.classList.remove("is-active");
    window.requestAnimationFrame(() => {
      if (requestId !== transitionId) return;
      nextFrame.classList.add("is-active");
      if (previousFrame && previousFrame !== nextFrame) {
        previousFrame.classList.remove("is-active");
        previousFrame.classList.add("is-exiting");
        window.setTimeout(() => {
          if (previousFrame !== slides[currentIndex] && previousFrame !== slides[index]) {
            previousFrame.remove();
          }
        }, reducedMotion.matches ? 0 : 550);
      }
    });

    currentIndex = index;
    updateControls();
    if (resetTimer) syncTimer();
    const nextIndex = nextAvailableIndex(currentIndex, 1);
    if (nextIndex !== -1) preloadSlide(nextIndex).catch((error) => markUnavailable(nextIndex, error));
  };

  const syncTimer = () => {
    if (intervalId !== undefined) {
      window.clearInterval(intervalId);
      intervalId = undefined;
    }

    if (!manuallyPaused && !pointerInside && !focusedInside
      && !document.hidden && !reducedMotion.matches) {
      intervalId = window.setInterval(() => {
        const nextIndex = nextAvailableIndex(currentIndex, 1);
        if (nextIndex !== -1) showSlide(nextIndex, false);
      }, 4000);
    }
  };

  const createDot = (index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show ${projectName} screenshot ${String(index + 1).padStart(2, "0")} of ${String(slideData.length).padStart(2, "0")}`);
    dot.setAttribute("aria-current", String(index === currentIndex));
    dot.disabled = !available[index];
    dot.addEventListener("click", () => showSlide(index));
    return dot;
  };

  for (let index = 0; index < slideData.length; index += 1) {
    dotsElement.append(createDot(index));
  }

  previousButton.addEventListener("click", () => {
    const previousIndex = nextAvailableIndex(currentIndex, -1);
    if (previousIndex !== -1) showSlide(previousIndex);
  });
  nextButton.addEventListener("click", () => {
    const nextIndex = nextAvailableIndex(currentIndex, 1);
    if (nextIndex !== -1) showSlide(nextIndex);
  });
  toggleButton.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    updateControls();
    syncTimer();
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const targetIndex = nextAvailableIndex(currentIndex, direction);
      if (targetIndex !== -1) showSlide(targetIndex);
    }
  });
  carousel.addEventListener("pointerenter", () => {
    pointerInside = true;
    syncTimer();
  });
  carousel.addEventListener("pointerleave", () => {
    pointerInside = false;
    syncTimer();
  });
  carousel.addEventListener("focusin", () => {
    focusedInside = true;
    syncTimer();
  });
  carousel.addEventListener("focusout", () => {
    window.setTimeout(() => {
      focusedInside = carousel.contains(document.activeElement);
      if (!focusedInside) syncTimer();
    }, 0);
  });
  document.addEventListener("visibilitychange", syncTimer);
  reducedMotion.addEventListener("change", () => {
    updateControls();
    syncTimer();
  });

  initialSlide.querySelector("img").addEventListener("error", () => {
    markUnavailable(0, new Error(`Unable to load ${slideData[0].src}`));
  }, { once: true });
  if (initialSlide.querySelector("img").complete && initialSlide.querySelector("img").naturalWidth === 0) {
    markUnavailable(0, new Error(`Unable to load ${slideData[0].src}`));
  }

  controls.hidden = false;
  updateControls();
  if (!reducedMotion.matches) {
    const nextIndex = nextAvailableIndex(currentIndex, 1);
    if (nextIndex !== -1) preloadSlide(nextIndex).catch((error) => markUnavailable(nextIndex, error));
  }
  syncTimer();
};

document.querySelectorAll("[data-carousel]").forEach(createProjectCarousel);

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
    emailButton.className = "button button-light contact-email contact-channel-button";
    emailButton.href = `mailto:${address}`;
    emailButton.setAttribute("aria-label", "Send an email");
    emailButton.textContent = "EMAIL";
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    emailButton.append(" ", arrow);
    emailPlaceholder.replaceWith(emailButton);
    contactAction.querySelector(".contact-buttons").prepend(emailButton);
    contactNote.textContent = address;
    contactNote.hidden = false;
  }
}

if (optionalContactLinks && CONTACT_TELEGRAM.trim()) {
  let telegramUrl;
  try {
    const configuredTelegram = CONTACT_TELEGRAM.trim();
    telegramUrl = new URL(configuredTelegram.includes("://")
      ? configuredTelegram
      : `https://t.me/${configuredTelegram.replace(/^@/, "")}`);
  } catch (error) {
    console.error("CONTACT_TELEGRAM must be a valid Telegram username or https://t.me/ URL.", error);
  }

  const username = telegramUrl?.pathname.slice(1);
  if (telegramUrl?.protocol === "https:" && telegramUrl.hostname === "t.me"
    && /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(username)
    && !telegramUrl.search && !telegramUrl.hash) {
    const telegramLink = document.createElement("a");
    telegramLink.className = "contact-telegram contact-channel-button";
    telegramLink.href = `https://t.me/${username}`;
    telegramLink.target = "_blank";
    telegramLink.rel = "noopener noreferrer";
    telegramLink.setAttribute("aria-label", "Open Telegram chat");
    telegramLink.textContent = "TELEGRAM";
    optionalContactLinks.append(telegramLink);
  } else if (telegramUrl) {
    console.error("CONTACT_TELEGRAM must be a valid https://t.me/username URL.");
  }
}

if (optionalContactLinks && CONTACT_WHATSAPP.trim()) {
  const number = CONTACT_WHATSAPP.trim();
  if (/^\d{7,15}$/.test(number)) {
    const whatsappLink = document.createElement("a");
    whatsappLink.className = "contact-whatsapp contact-channel-button";
    whatsappLink.href = `https://wa.me/${number}`;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.setAttribute("aria-label", "Open WhatsApp chat");
    whatsappLink.textContent = "WHATSAPP";
    optionalContactLinks.append(whatsappLink);
  } else {
    console.error("CONTACT_WHATSAPP must contain 7 to 15 international-format digits, without a plus sign or separators.");
  }
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
