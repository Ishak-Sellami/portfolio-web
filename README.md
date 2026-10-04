# ISHAK — Cybersecurity Student &amp; Developer

A personal landing page built as a **learning project** with only HTML5, CSS3 and a very
small amount of vanilla JavaScript.

No frameworks. No build step. No `npm install`. Open the file and it works.

The goal of the project is to understand the fundamentals of the web:

```
Browser → HTML (structure) → CSS (presentation) → Rendered page
```

---

## 1. How to run it

**Option A — double-click**

Open `index.html` in any modern browser. That is all.

**Option B — local server (recommended, because it behaves exactly like a real site)**

```bash
# inside the project folder
python -m http.server 8000
```

Then visit <http://localhost:8000>.

**Option C — VS Code**

Install the *Live Server* extension, right-click `index.html` → *Open with Live Server*.

> There is nothing to compile. `index.html` is the entry point, `css/style.css` and
> `js/script.js` are referenced from inside it.

---

## 2. File structure

```
portfolio-web/
│
├── index.html              # The whole page: every section, semantic HTML
├── README.md               # This file
│
├── css/
│   └── style.css           # All styling, organised in 17 numbered chapters
│
├── js/
│   └── script.js           # ~150 lines of progressive enhancement
│
└── images/
    ├── eagle.svg           # Hero visual: geometric eagle as a blueprint
    └── eagle-mark.svg      # Logo mark used in the navbar, footer and favicon
```

Both images are hand-written SVG made only of lines, circles and one polygon path —
they stay sharp on any screen and can be recoloured by editing two hex values.

**Where would a photo and screenshots go?**

```
profile/      → profile.jpg          (a future "About" portrait)
projects/     → rahiq-parfums.png    (a future project cover image)
```

Those folders are not created yet, because the current design needs no bitmap images.
When you add one, create the folder, drop the file in and reference it like this:

```html
<img class="hero__visual-img" src="profile/profile.jpg" width="480" height="480"
     alt="ISHak sitting at a desk with two monitors">
```

Always give an `alt` (or `alt=""` if the image is purely decorative), plus `width` and
`height` so the browser can reserve the right space before the file loads — that is what
prevents the page from jumping around.


---

## 3. What each section does

| # | Section | Purpose |
|---|---------|---------|
| — | **Header / Nav** | Sticky frosted-glass bar. Horizontal links on desktop, collapsible panel below 1024px. |
| 1 | **Hero** | States who this is: name → role → short statement → CTAs → eagle visual. Two columns above 960px, one column below. |
| 2 | **About Me** | Short biography plus a *Key facts* panel (Focus, Current direction, Approach). Teaches a two-column text + sidebar layout. |
| 3 | **Skills** | Five category cards (Programming, Web Development, Cybersecurity, Systems & Networking, Tools) built from `<article>` + `<ul>` tag pills. |
| 4 | **Projects** | Five `<article>` cards. The first one (RAHIQ Parfums) is *featured*: accent border, spans two columns, splits horizontally on wide screens. |
| 5 | **Roadmap** | Six learning stages on a vertical timeline built with CSS Grid and a gradient "track" line drawn by a single pseudo-element. |
| 6 | **Target Roles** | The main path (Programming → … → Security Engineering) and eight roles being worked towards. Clearly labelled as goals, not positions held. |
| 7 | **Philosophy** | Visually distinct statement band: *Build. Break. Understand. Secure.* with a huge, very faint eagle watermark. |
| 8 | **Contact** | Social links (GitHub / LinkedIn / Email) and a real `<form>` with labels, native validation and an `aria-live` status message. |
| — | **Footer** | Brand, tagline, links and auto-updating copyright year. |

---

## 4. HTML concepts demonstrated

* **Semantic landmarks** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<aside>`, `<footer>`. The page can be navigated without seeing a single `<div>`.
* **Heading hierarchy** — one `<h1>`, then `<h2>` per section, `<h3>` per card. No level skipped.
* **Section labelling** — every `<section>` is tied to its heading with
  `aria-labelledby`, so screen readers announce the section name.
* **Accessible images** — the eagle SVGs use `alt` text; decorative repeats
  (footer logo, philosophy watermark) use `alt=""` + `aria-hidden="true"`.
* **Forms** — `<label for>` bound to every control, `type="email"`, `autocomplete`,
  `required`, `novalidate` (so the script controls the messages), `role="status"`
  with `aria-live="polite"` for the confirmation text.
* **Links that open in a new tab** — `target="_blank"` always paired with
  `rel="noopener noreferrer"`.
* **Skip link** — `<a class="skip-link" href="#main">` as the first element in `<body>`.
* **SVG sprite** — one hidden `<svg>` holding eleven `<symbol>` definitions, reused
  with `<use href="#icon-…">` instead of repeating path data.
* **No JavaScript required** — the navbar degrades to a visible stacked list and every
  section stays readable.

---

## 5. CSS concepts demonstrated

| Concept | Where to look |
|---------|---------------|
| **Custom properties** | `01. Design tokens` — every colour, font, radius and spacing value |
| **Box model** | `02. Reset` — `box-sizing: border-box` on `*, *::before, *::after` |
| **Fluid typography** | `--fs-h1: clamp(2.75rem, 1.85rem + 4.4vw, 4.75rem)` |
| **Container query alternative** | `.container { width: min(100% - gutter*2, 1180px); margin-inline: auto }` |
| **Flexbox** | navbar, buttons, tag lists, social links, footer |
| **CSS Grid** | hero, about, skills, projects, contact grid, roadmap timeline |
| **Gap-based spacing** | `gap` instead of margin collapse — no `> * + *` hacks |
| **Positioning** | `sticky` header, `absolute` mobile menu, `fixed` skip link, `absolute` watermark |
| **Pseudo-elements** | `::before` for the roadmap track line, arrows and list squares |
| **Selectors** | class selectors throughout, plus `:hover`, `:focus-visible`, `:user-invalid`, `[aria-expanded="true"]` |
| **Media queries** | `30em / 42em / 45em / 48em / 60em / 62em / 64em` — mobile-first, all `min-width` |
| **Transitions** | one shared `--transition` variable, applied only to `transform`, `color`, `border-color`, `background-color`, `opacity` |
| **Progressive enhancement** | `16. Reveal animation` — hidden state only exists when `.js` is on `<html>` |
| **Reduced motion** | `17. Accessibility` — `@media (prefers-reduced-motion: reduce)` |
| **Logical properties** | `margin-inline`, `padding-block`, `border-block`, `inset` |
| **Background trick** | the hero grid is two `linear-gradient`s + `mask-image`, no extra markup |

The layout is **mobile-first**: the base styles describe the 320px view, and media
queries only ever *add* rules as the screen grows.

Breakpoints covered: **320 · 375 · 425 · 768 · 1024 · 1440+**

---

## 6. JavaScript, in order of usefulness

`js/script.js` is wrapped in an IIFE and every feature is optional:

1. **Footer year** — writes the current year into `[data-current-year]`.
2. **Mobile menu** — toggles `.is-open` and the `aria-expanded` attribute;
   closes on link click, on `Escape`, and when the viewport becomes wide again.
3. **Scroll spy** — an `IntersectionObserver` with `rootMargin: '-35% 0px -60% 0px'`
   marks the nav link of the section crossing the middle of the screen.
4. **Reveal on scroll** — adds `.is-visible` once per element, then stops observing.
5. **Form validation** — `checkValidity()` + `reportValidity()`, then a status message.

Every `IntersectionObserver` block checks `'IntersectionObserver' in window` first, so
an old browser simply gets the plain, fully readable page.

---

## 7. Accessibility checklist

* Semantic landmarks and one `<h1>` per page.
* Visible `:focus-visible` ring on all links, buttons and form fields (48px tap targets).
* Body text contrast ≥ 7:1, muted text ≥ 4.5:1 on `--bg`.
* The mobile menu announces its state through `aria-expanded` / `aria-controls`.
* Form errors are announced through `role="status" aria-live="polite"`.
* Decorative icons are `aria-hidden="true"`; the sprite itself is hidden.
* `prefers-reduced-motion` disables the reveal animation and smooth scrolling.
* Nothing is hidden behind a hover-only interaction.

---

## 8. Placeholders to replace

These are stand-ins — swap them for your real details:

| Where | Placeholder |
|-------|-------------|
| Navbar, contact, footer, project buttons | `https://github.com/ishak` |
| Contact + footer | `https://www.linkedin.com/in/ishak` |
| Contact + footer | `ishak@example.com` |
| RAHIQ Parfums live demo | `https://rahix-parfums.vercel.app` |
| Contact form | `action="#"` — point it at a real endpoint (Formspree, Netlify Forms…) to receive messages |

---

## 9. Ideas to practise next

Each of these is a small, self-contained exercise:

1. Change only `--accent` in `:root` and re-theme the whole site.
2. Add a new skill category to the grid and watch the layout reflow on its own.
3. Replace the reveal animation with `@keyframes` and compare the two approaches.
4. Dark/light mode using `prefers-color-scheme` and a second set of custom properties.
5. Add a 6th roadmap stage — where does the timeline line end up?
6. Filter the projects with a tiny bit of JavaScript using `data-category` attributes.

---

## 10. Constraints respected

* HTML5 + CSS3 + minimal vanilla JavaScript only.
* No React, Vue, Angular, Next.js, Tailwind, Bootstrap or any component library.
* No database, no backend, no API calls, no WebGL, no build tooling.
* Readable, commented, non-minified source.
* Runs by opening `index.html`.
