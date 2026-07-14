# Ultimate Music Theory Club — website

Conversion-focused static site for UMT Club: live, small-group Ultimate Music
Theory classes for adults and homeschoolers (virtual on Muzie.live, hybrid, and
in person at PYCO School of Music, Wexford, PA).

Plain HTML/CSS with a small amount of vanilla JavaScript (progressive
enhancement only — the site works fully with JS disabled). No frameworks, no
build step. Hosted on GitHub Pages.

## Structure

```
index.html        The whole site (single page, anchor navigation)
css/styles.css    All styles
js/main.js        Sign-up wiring, mobile nav, scroll effects
assets/           Favicon and (eventually) photos
```

## Preview locally

Open `index.html` in a browser, or run any static server:

```
python3 -m http.server 8000
```

## Deploy to GitHub Pages

Settings → Pages → Deploy from branch → `main` / root. The `.nojekyll` file is
already in place.

## 🚀 Launch checklist (placeholders to fill in)

Search `index.html` for `TODO` to find each spot.

- [ ] **Sign-up form URL** — paste the Google Form link into `SIGNUP_FORM_URL`
      at the top of `js/main.js`. All CTAs switch over automatically.
- [ ] **Contact email** — set `CONTACT_EMAIL` in `js/main.js` AND replace the
      `hello@example.com` mailto in the `#signup` section of `index.html`
      (the HTML fallback for no-JS visitors).
- [ ] **Tuition** — replace the `$TBD` pricing placeholder in the `#pricing`
      section with real numbers.
- [ ] **Instructor bio + photo** — replace the placeholder bio text and the
      photo placeholder in the `#teacher` section (drop the photo into
      `assets/`).
- [ ] **Workbook purchase links** — replace the generic UMT shop link in the
      `#materials` section with per-level links if desired.
- [ ] **Schedule details** — confirm the AM/PM assumptions (site currently
      shows Mon 2:00/3:00 PM, Tue 11:00 AM & 1:00/2:00/3:00/5:30 PM), the
      Eastern time zone note, and add the year start date when known.
- [ ] **Trademark/affiliation wording** — confirm the footer disclaimer
      (e.g. mention UMT Certified teacher status if applicable).
- [ ] **Domain** — once the final URL is known (custom domain or
      `*.github.io`), add a `<link rel="canonical">` and `og:url` to
      `index.html`; consider adding a social-share image (`og:image`).
