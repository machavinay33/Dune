# Dune — Bar & Kitchen · Website

A premium one‑page site for Dune Bar & Kitchen (Jubilee Hills, Hyderabad) — Egyptian‑gold theme,
scroll animations, a filterable photo gallery, and a reservation form that hands off straight to WhatsApp.

## 1. Before you deploy — set your WhatsApp number

Open `js/script.js` and edit the very first line of real code:

```js
const DUNE_WHATSAPP_NUMBER = "919999999999"; // <-- REPLACE with Dune's real WhatsApp number
```

Use the full number with country code, digits only (no `+`, spaces or dashes).
Example: for `+91 98765 43210`, enter `"919876543210"`.

That's the only thing you must change before going live — everything else works out of the box.

## 2. File structure

```
dune/
├── index.html          → all page content/sections
├── css/style.css        → theme, layout, animations
├── js/script.js          → nav, scroll reveal, gallery filter, WhatsApp reservation
├── images/               → your uploaded photos (logo, interior, rooftop, food & drinks)
└── README.md
```

No build step, no dependencies — it's plain HTML/CSS/JS.

## 3. Deploy to Netlify (drag‑and‑drop, easiest)

1. Go to https://app.netlify.com and log in (or create a free account).
2. On your dashboard, find **"Add new site" → "Deploy manually"** (or the drag‑and‑drop box on the
   Sites screen).
3. Drag the whole `dune` folder (or a zip of it) into the drop zone.
4. Netlify uploads it and gives you a live URL like `random-name-123.netlify.app` within seconds.
5. Optional: **Site settings → Change site name** to get a nicer subdomain, or **Domain settings →
   Add a custom domain** if you own one (e.g. dunebarandkitchen.com).

## 4. Deploy to Netlify via Git (if you prefer version control)

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Build command: leave blank. Publish directory: `/` (root).
4. Deploy.

## 5. Things you may want to personalize later

- **Map**: the embedded map in the "Visit" section uses a text‑based Google Maps query, so it
  works without an API key. If you'd like the exact pin, replace the `src` in the `<iframe>`
  inside `index.html` (Visit section) with an embed link from Google Maps' own "Share → Embed a map" option.
- **Instagram feed**: currently links out to `@dunebarandkitchen`. If you want live posts embedded,
  that requires the Instagram Graph API and a Meta developer app — happy to help wire that up later.
- **Offers**: the Swiggy Dinout / EazyDiner terms in the Offers section are copy — update the text
  directly in `index.html` whenever the partner terms change.
- **Colors/fonts**: all design tokens are declared as CSS variables at the top of `css/style.css`
  (`:root { ... }`) so the whole palette can be restyled from one place.

## 6. Browser support

Built with modern CSS (Grid, custom properties, `gap`) — works in all current versions of Chrome,
Safari, Firefox and Edge. Animations respect `prefers-reduced-motion` for accessibility.
