# Independent Web Developer Portfolio

A responsive personal portfolio for an early-career independent web developer. The site presents two independent concept projects, a focused set of web services, an introduction, and a contact section without implying client work or professional experience that has not been provided.

## Technologies

- Semantic HTML5
- CSS3, including responsive layouts and reduced-motion support
- Vanilla JavaScript

The Selected Work cards use the supplied screenshots in `assets/urban-cut-preview.png` and `assets/northline-preview.png`; CSS-built previews remain as graceful fallbacks if an image cannot load. Google Fonts are loaded from Google Fonts when a network connection is available; local system fallbacks are provided.

## Features

- Responsive navigation with an accessible mobile menu
- Two real, live independent concept projects with safe new-tab links and lazy-loaded screenshots
- Responsive project, services, about, and contact sections
- Scroll reveal animations that respect `prefers-reduced-motion`
- Visible content if JavaScript is unavailable
- Email contact link generated from `CONTACT_EMAIL`, with an optional Telegram link generated only from a configured Telegram URL
- Centralized professional name and brand settings, with honest early-career positioning
- Automatically updated footer year
- Keyboard skip link, focus styles, semantic landmarks, and basic Open Graph metadata

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or serve this directory with any static file server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalization before publishing

1. Set `PROFESSIONAL_NAME` and `BRAND_MARK` near the top of `script.js`. The defaults preserve the generic portfolio name and `V.` placeholder. `BRAND_NAME` is the fallback when no professional name is set.
2. Verify or replace `CONTACT_EMAIL` near the top of `script.js` with an email address you control. The email link is not shown when the setting is blank or invalid.
3. Optionally set `CONTACT_TELEGRAM` to your real `https://t.me/...` or `https://telegram.me/...` link. No Telegram link is shown by default.
4. Optionally add your own portrait in the About section.
5. Review the project descriptions and live links before publishing.

URBAN CUT and NORTHLINE PROPERTY are live, independent concept projects, not paid client work. Their screenshots are the genuine previews supplied for this portfolio, not stock images.

## AI-assisted development

AI-assisted development is described as part of the developer's workflow, alongside hands-on HTML, CSS, and JavaScript. AI is a tool in the process; the portfolio does not claim that it replaces review, testing, or responsibility for the delivered work.

## Project structure

```text
developer-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── urban-cut-preview.png
    └── northline-preview.png
```
