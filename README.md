# Bhandarizee Motivation — Website

A React + Vite frontend for B. S. Bhandari's motivational-speaker portfolio site.
Same look, content and behavior as the original static build — just organized as
components instead of one big HTML file.

## Getting started

```
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Structure

```
index.html               Page shell (fonts, meta tags) + Vite entry point
src/main.jsx              React entry point
src/index.css              All styling (responsive breakpoints at 1100px / 900px / 640px / 380px)
src/App.jsx                 Assembles all sections, holds shared modal/lightbox state
src/components/           One component per page section:
  Header.jsx                 Sticky nav, mobile menu, scroll-spy active link
  Hero.jsx / HeroParticles.jsx  Hero section + three.js particle background
  About.jsx                About section + feature grid
  Stats.jsx                 Animated stat counters
  Topics.jsx                Topics grid
  Videos.jsx / VideoModal.jsx  Video grid + YouTube modal player
  Reels.jsx                  Horizontally scrollable reel strip (shares VideoModal)
  Gallery.jsx / Lightbox.jsx  Gallery grid + image lightbox
  Journey.jsx                Timeline
  Testimonials.jsx          Testimonials + booking card
  FAQ.jsx                    FAQ accordion
  Contact.jsx                Contact form (EmailJS) + inquiry type toggle
  Footer.jsx
  BackToTop.jsx
  Reveal.jsx                 Shared scroll-reveal wrapper (used across sections)
public/images/             Images, served as-is at /images/...
```

## Replacing images

Every image lives in `public/images/` and is labeled with its purpose in the
components that reference it. Keep the same filename and the site keeps
working — just overwrite the file (jpg/png/webp all work fine; if you use a
different extension, update the matching `src=` in the component that uses
it).

| File | Used for | Recommended size | Referenced in |
|---|---|---|---|
| `hero-bg.png` | Full-bleed hero background (Bhandari on stage) | 1600×1000+ | `src/index.css` (`.hero-bg`) |
| `about-photo.png` | About section portrait | 800×900 | `src/components/About.jsx` |
| `gallery-1.png` … `gallery-6.svg` | Gallery grid (event photos) | 800×800 (square) | `src/components/Gallery.jsx`, `src/components/Videos.jsx` |
| `testimonial-1.svg` … `testimonial-3.svg` | Client avatars in testimonials | 200×200 | `src/components/Testimonials.jsx` |
| `favicon.svg` | Browser tab icon | any, square | `index.html` |

### A different hero photo for mobile

The hero photo is set in `src/index.css` under `.hero-bg`, not in JSX. There
are two rules: the base one (desktop) and a `@media (max-width: 640px)`
override (mobile). Right now mobile reuses `hero-bg.png` with a repositioned
crop (`background-position: 75% center`). To use a different photo on mobile,
add the file to `public/images/` and point the media-query rule's
`background-image` at it — no component changes needed.

## Adding real videos

In `src/components/Videos.jsx`, the `VIDEOS` array has an `id` field per
video — replace each with the real YouTube video ID (the part after
`watch?v=`). Also update the "Subscribe on YouTube" link's `href` in the same
file, and the social links in `Contact.jsx` / `Footer.jsx`.

## Reels section ("Video Testimonials")

`src/components/Reels.jsx` renders a horizontally-scrollable strip of 5–7
vertical (9:16) reel cards, styled like a shoppable-reel carousel: each card
has a position badge (`2/7`), and a bottom overlay bar with the speaker's
avatar, a caption + context line, and a play button. Pagination dots below
the strip track scroll position and are clickable; arrow buttons scroll by
one card on desktop (hidden below 900px in favor of native touch swipe on
mobile). Tapping anywhere on a card opens the same shared `VideoModal` used
by the Videos section.

The `REELS` array at the top of the file holds the content — each entry has
an `id` (YouTube video ID, same format as `Videos.jsx`), a `thumb` (image
path), a `title` (bold caption in the overlay bar) and a `context` (the
smaller line under it, e.g. "Corporate Keynote"). The avatar is set once via
`SPEAKER_AVATAR` near the top of the file (defaults to the About section
photo) rather than per-reel, since every clip is the same speaker. Add,
remove or reorder entries freely — the badge count, dots and scroll-snap
layout all adapt automatically; 5–7 is a good range to keep the strip
feeling full without being a chore to swipe through.

## Contact form

The form has a slider at the top so a visitor picks what they're sending: a
**Corporate / Training Enquiry** (shows extra fields — company, event date,
event type) or general **Support / Feedback** (just name, email, phone,
message). Both routes land in your inbox, just tagged and templated
differently so you can tell them apart at a glance.

It sends through **EmailJS** — a service that relays the message from the
visitor's browser straight to a real inbox, with no backend server or code of
your own to run.

**This is already set up and working** — `EMAILJS_CONFIG` in
`src/components/Contact.jsx` has the real Service ID, both Template IDs, and
Public Key filled in, and both message types have been verified end-to-end.
The two email templates (branded to match the site) live directly in the
EmailJS dashboard under Email Templates.

If you ever need to recreate a template from scratch, or add a third one,
here's the shape:

- Variables sent by the form (used in both templates): `{{from_name}}`, `{{from_email}}`,
  `{{phone}}`, `{{message}}`, `{{inquiry_type}}`, `{{time}}`
- Corporate template only: `{{company}}`, `{{event_date}}`, `{{event_type}}`
- Subject line used on both: `New message from {{from_name}} — {{inquiry_type}}`
- In the template's settings panel (right side): **From Name** → `{{from_name}}`, **Reply To**
  → `{{from_email}}` (so replying goes to the visitor), **From Email** → leave "Use Default
  Email Address" checked (sending *as* the visitor's address gets flagged as spam by most
  providers).
- `{{inquiry_type}}`'s value intentionally avoids a `/` character (it's sent as "Corporate or
  Training Enquiry" / "Support or Feedback") — EmailJS HTML-escapes template variables even in
  the plain-text Subject line, which turned `/` into `&#x2F;` when it was tried.

**To point submissions at a different inbox**, change "To Email" on each
template in the EmailJS dashboard — no code change needed. The two templates
can each go to a different address if useful (e.g. enquiries to a sales
inbox, support to a different one).

**Alternative:** if you'd rather not use EmailJS, [Formspree](https://formspree.io)
works too (set the form's `action` to your Formspree endpoint and let it
submit normally instead of the `emailjs.send()` call in
`src/components/Contact.jsx`), though its free tier only supports one
destination/form, so the two-template routing above would need two separate
Formspree forms.

## Editable details

Search the codebase for these and update with the real details:
- Email: `hello@bhandarizee.com` (in `Contact.jsx` and `Footer.jsx`)
- Phone: `+91 00000 00000` (in `Contact.jsx` and `Footer.jsx`)
- Social links (currently `href="#"` placeholders) in `Contact.jsx` and `Footer.jsx`

## Deploying (Netlify)

`netlify.toml` at the repo root already has everything Netlify needs — point
a new Netlify site at this repo and it just works, no manual config required:

- Build command `npm run build`, publish directory `dist` (Netlify will pick
  these up from `netlify.toml` automatically, but they're also there if you
  ever set up the site by hand).
- `NODE_VERSION = "22"`, matching the `engines` field in `package.json` and
  what Vite 8 requires (Node ^20.19 or >=22.12). There's also an `.nvmrc` for
  anyone building locally with `nvm`.
- A catch-all redirect to `index.html` (this site only navigates with
  in-page `#anchors`, so it's a safety net for a stray deep link, not a
  routing requirement).
- Long-lived cache headers for the hashed files under `/assets/` — Vite
  renames those on every content change, so caching them for a year is safe.

The EmailJS keys in `src/components/Contact.jsx` are the public, client-side
kind (see "Contact form" above) — no Netlify environment variables needed for
the form to work.
