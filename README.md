# ASTER STUDIO

A responsive portfolio for ASTER STUDIO, an independent creative web studio. The site presents independent concept projects, a focused set of web services, the studio's approach, and existing contact options.

## Technologies

- Semantic HTML5
- CSS3, including responsive layouts and reduced-motion support
- Vanilla JavaScript

The Selected Work cards use the supplied screenshots in `public/assets/urban-cut-preview.png` and `public/assets/northline-preview.png`; CSS-built previews remain as graceful fallbacks if an image cannot load. Google Fonts are loaded from Google Fonts when a network connection is available; local system fallbacks are provided.

## Features

- Responsive navigation with an accessible mobile menu
- Independent concept projects with safe new-tab links and lazy-loaded screenshots, plus a MISTO WEAR case study
- Responsive project, services, about, and contact sections
- Studio introduction terminal with a typing animation that respects `prefers-reduced-motion`
- Scroll reveal animations that respect `prefers-reduced-motion`
- Visible content if JavaScript is unavailable
- Email contact link generated from `CONTACT_EMAIL`, with optional Telegram and WhatsApp links shown only when valid contact details are configured
- Centralized ASTER STUDIO name and brand mark
- Automatically updated footer year
- Keyboard skip link, focus styles, semantic landmarks, and basic Open Graph metadata

## Run locally

No build step or package installation is required. Open `public/index.html` in a browser, or serve the `public` directory with any static file server. For example, with Python installed:

```bash
python -m http.server 8000 --directory public
```

Then visit `http://localhost:8000`.

## Deploy to Cloudflare Workers Static Assets

The root `wrangler.jsonc` configures Wrangler to publish the static files in `public`. From the project root, run:

```bash
npx wrangler deploy
```

Wrangler may prompt you to authenticate with Cloudflare. This command deploys the site; it is not run as part of local development.

## Contact settings

The existing email, Telegram, WhatsApp, and GitHub destinations are configured in `public/script.js` and `public/index.html`. Review those destinations before publishing; the site only displays configured contact options.

URBAN CUT and NORTHLINE PROPERTY are live, independent concept projects, not paid client work. Their screenshots are the genuine previews supplied for this portfolio, not stock images.

## AI-assisted development

AI-assisted workflows are part of the studio's process, alongside hands-on HTML, CSS, and JavaScript development.
