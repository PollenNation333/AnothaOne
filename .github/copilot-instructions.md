## Pollen Nation — AI Assistant Instructions

Short guidance to help an AI coding agent be immediately productive in this repository.

1. Big picture
- Purpose: small static marketing site with a custom loader/hero animation and a services listing. The site is a single-page style app where `index.html` contains most CSS and JavaScript inline (no build tooling present).
- Key files: `index.html` (master source: styles, animations, JS logic), `services.html` (secondary page linked from topbar), `readme.md` (notes about the loader/flight), and `assets/` (images used by the UI).
- Deployment: configured as a static site. `netlify.toml` exists and redirects all routes to `index.html` (SPA-style). Netlify build environment uses `NODE_VERSION=18` but there are no build scripts in repo.

2. Major components & data flows
- Loader/hero: implemented in `index.html`. The loader uses a `.stage` overlay, animated `.bee` image and `.final` logo. The flight path is computed in the IIFE that defines `buildPath()` and applied using the CSS `offset-path` property. Key variables: `flightDuration = 4800` (ms) and the early reveal timeout uses `flightDuration - 2000`.
- Hero layout: `.pn-hero`, `.pn-hero-grid`, `.ttp-left-card`, `.ttp-right`, and media accent elements. CSS variables at the top (`:root`) control hero widths and offsets.
- Services list: HTML block under `<!-- === Our Services Section === -->` — container `.services-cards` with repeated `.service-card` elements. Each card has `.service-card-image`, `.service-card-content`, `.service-content-wrapper` and `.service-details` (hidden until hover / revealed via CSS/JS).
- Scroll reveal: JS adds `.revealed` via an `IntersectionObserver` for elements with `.scroll-reveal`. Fallback simply forces `.revealed` when `IntersectionObserver` isn't available.

3. Project-specific conventions & patterns
- Inline-first: Styles and scripts are mostly inlined in `index.html`. Expect edits to that single file for most visual/behavior changes.
- Minimal JS helpers: Many scripts are IIFEs with an `onReady(fn)` helper used repeatedly. Follow that pattern when adding new inline scripts.
- Animation policy: prefer `offset-path` for the flight; respect `prefers-reduced-motion` media query already present (animations are removed when user preference requests reduced motion).
- Image assets: stored under `assets/` and `assets/services/`. Reference images with relative paths like `./assets/services/beekeeping-orig.jpg`.
- Accessibility: there are `.sr-only` helpers and `aria-label` on hero; keep these in new markup.

4. Developer workflows (how to run and test locally)
- There is no build system; to preview locally run a static server from repo root. Example commands:

```bash
# from repo root
python3 -m http.server 8000
# or (if Node available)
npx serve -s . -l 5000
```

- Deploy: Netlify is used; `netlify.toml` redirects `/*` to `/index.html`. Netlify build environment sets `NODE_VERSION=18`, but there are no npm scripts — the repo is treated as a static site (publish root is repo root).

5. Common change tasks & examples (copy/paste friendly)
- Add a new service card: copy one of the existing `.service-card` blocks in `index.html` inside the `.services-cards` container and update the image under `assets/services/`. Keep the same HTML structure to preserve hover/reveal animation.

- Tune loader timing: edit `flightDuration` inside the loader IIFE in `index.html`. The code currently reveals the final logo 2000ms earlier (see `setTimeout(..., flightDuration - 2000)`).

- Adjust hero layout: change `:root` CSS variables near the top of `index.html` (e.g. `--left-w`, `--right-w`, `--peek`) to affect desktop layout.

- Add or modify lazy/deferred images: search for `data-defer="maintenance"` usage and `loadDeferredMaintenance()` in `index.html` to follow existing deferred-loading pattern.

6. Integration points & external dependencies
- Netlify: `netlify.toml` config present; redirects all routes to `index.html`. If adding serverless functions, follow the `functions` section already present in the toml (currently empty).
- No package.json, no CI config, and no test harness detected — treat changes as static HTML/CSS/JS edits.

7. Safety and constraints
- Keep changes compact and localized to `index.html` where possible. Avoid introducing a heavy build step without discussing with the repo owner.
- Maintain `prefers-reduced-motion` behavior and existing ARIA text.

8. Where to look for examples
- Loader and hero animation: top of `index.html` (search for `.stage`, `.bee`, `buildPath`, `flightDuration`).
- Services cards: the block under `<!-- === Our Services Section === -->` in `index.html` and images in `assets/services/`.
- Scroll reveal: script near the bottom with `IntersectionObserver` and the `.scroll-reveal` class.

If anything here is unclear or you want this tailored for a particular task (e.g., adding a new page, introducing a build pipeline, or changing the loader animation), tell me which area you'd like expanded and I'll iterate.
