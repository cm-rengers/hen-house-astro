# The Hen House – Static Site

A high-fidelity static marketing site for **The Hen House**, a boutique countryside retreat in Cumbria. Built with plain HTML, CSS, and vanilla JavaScript, with GSAP + ScrollTrigger for scroll-based animations.

## Structure

- **`index.html`** – Single-page layout with anchored sections:
  - Hero
  - Story / Intro
  - Amenities
  - Featured image strip
  - Gallery
  - Location
  - Testimonial
  - Final booking CTA
- **`assets/css/styles.css`** – Global styles, responsive layout, and typography.
- **`assets/js/includes.js`** – Runtime loader for header and footer partials.
- **`assets/js/main.js`** – Site initialization: sticky header, smooth scrolling, mobile navigation, and animation bootstrap.
- **`assets/js/animations.js`** – GSAP + ScrollTrigger animations:
  - Section scroll reveals
  - Staggered grid reveals
  - Hero parallax
  - Media scale-in
- **`partials/header.html`** – Sticky header with desktop nav and mobile menu.
- **`partials/footer.html`** – Footer with contact details and quick links.
- **`assets/img/`** – Image folder (place your own images here).

All assets are referenced via **relative paths**, and there is **no build step**.

## Local development

Because the site uses `fetch()` to load HTML partials and references GSAP via CDN, you should run it from a simple static file server rather than opening `index.html` directly in the browser.

### Option 1 – Using VS Code / Cursor Live Server

1. Open the project folder in your editor.
2. Use the built-in "Open with Live Server" (or similar) feature to serve the site.
3. Navigate to the URL shown in the browser (typically `http://127.0.0.1:5500/` or similar).

### Option 2 – Using `npx serve` (Node.js)

If you have Node.js installed:

```bash
npx serve .
```

Then open the printed local URL (e.g. `http://localhost:3000`) in your browser.

### Option 3 – Using Python

If you have Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Netlify deployment

This project is ready to deploy directly to **Netlify** as a static site.

### 1. Create a new site

1. Commit or copy this folder into a Git repository (GitHub, GitLab, or Bitbucket), or prepare a local directory.
2. Log in to Netlify and choose **“Add new site” → “Import an existing project”** (for Git) or **“Deploy manually”** (for drag-and-drop).

### 2. Configure build settings

Because this is a purely static site:

- **Build command**: leave empty (or set to `None`)
- **Publish directory**: the project root (e.g. `/`), or if the project is inside a subfolder, point to that subfolder.

Netlify will serve `index.html` at the site root.

### 3. Environment notes

- GSAP and ScrollTrigger are loaded from a CDN and do not require any environment variables or build tooling.
- The header and footer partials are loaded at runtime from `/partials/header.html` and `/partials/footer.html` via `fetch()`, which works on Netlify’s static hosting out of the box.

## Customization

- Replace the placeholder images referenced in `index.html` with your own assets under `assets/img/` (filenames can be updated as needed).
- Adjust the color palette, typography, and spacing in `assets/css/styles.css` to suit your brand while keeping the overall structure.
- Modify copy in `index.html`, `header.html`, and `footer.html` to match the final tone of voice and booking details.

