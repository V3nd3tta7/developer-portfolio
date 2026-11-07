# Independent Web Developer Portfolio

A responsive personal portfolio for an early-career independent web developer. The site presents two independent concept projects, a focused set of web services, an introduction, and a contact section without implying client work or professional experience that has not been provided.

## Technologies

- Semantic HTML5
- CSS3, including responsive layouts and reduced-motion support
- Vanilla JavaScript

The interface uses CSS-drawn project preview placeholders rather than stock photography or missing screenshot files. Google Fonts are loaded from Google Fonts when a network connection is available; local system fallbacks are provided.

## Features

- Responsive navigation with an accessible mobile menu
- Two live concept project links with safe new-tab attributes
- Responsive project, services, about, and contact sections
- Scroll reveal animations that respect `prefers-reduced-motion`
- Visible content if JavaScript is unavailable
- Contact button that remains disabled until a real email is configured
- Automatically updated footer year
- Keyboard skip link, focus styles, semantic landmarks, and basic Open Graph metadata

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or serve this directory with any static file server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalization before publishing

1. Add your preferred display name and update the placeholder `V.` mark in `index.html`.
2. Set `CONTACT_EMAIL` near the top of `script.js` to a real email address. The email button is intentionally unavailable while this value is blank.
3. Optionally add your own portrait in the About section.
4. Replace the CSS-built project previews with genuine project screenshots when available. Do not use unrelated stock images.
5. Review the project descriptions and live links before publishing.

The project content and preview graphics are portfolio concepts, not claims of paid client work.

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
```
