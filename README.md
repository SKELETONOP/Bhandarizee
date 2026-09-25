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
src/main.jsx              React entry point, wraps <App/> in a BrowserRouter
src/index.css              All styling (responsive breakpoints at 1100px / 900px / 640px / 380px)
src/App.jsx                 Router shell: Header + Footer (shared across pages) around <Routes>
src/pages/                Route-level pages:
  Home.jsx                  "/" — the original one-page site (Hero → Contact), owns the
                             video-modal / lightbox state for its own sections
  AllVideos.jsx              "/videos" — full video library grid, its own video-modal state
src/data/
  videos.js                  Shared video catalog (id/title/duration/views) used by both
                              Videos.jsx (home preview) and AllVideos.jsx (full library)
src/components/           One component per page section:
  Header.jsx                 Sticky nav, mobile menu, scroll-spy active link — route-aware,
                              so nav links work whether you're on "/" or "/videos"
  Hero.jsx / HeroParticles.jsx  Hero section + three.js particle background
  About.jsx                About section + feature grid
  Stats.jsx                 Animated stat counters
  Topics.jsx                Topics grid
  Videos.jsx / VideoModal.jsx  Home page's video preview grid (4×2, first 8 of the
                             catalog) + YouTube modal player, "View All Videos" → /videos
  Reels.jsx                  Horizontally scrollable reel strip (shares VideoModal)
  Gallery.jsx / Lightbox.jsx  Gallery grid + image lightbox
  Journey.jsx                Timeline
  Testimonials.jsx          Testimonials + booking card
  FAQ.jsx                    FAQ accordion
  Contact.jsx                Contact form (EmailJS) + inquiry type toggle
  Footer.jsx                 Also route-aware, same reason as Header
  BackToTop.jsx
  Reveal.jsx                 Shared scroll-reveal wrapper (used across sections)
public/images/             Images, served as-is at /images/...
```

### Routing notes

This is a two-route site (`react-router-dom`, `BrowserRouter`): `/` is the
original single-page layout, `/videos` is the full video library. Header and
Footer live outside `<Routes>` in `App.jsx` so they persist across both pages.
Section nav links (Home/About/Topics/…) render as `#id` when already on `/`
(a plain in-page anchor) or `/#id` when on `/videos` (so clicking them
navigates back to `/` and scrolls to that section — handled by the
`ScrollManager` component in `App.jsx`, which watches the route's hash and
scrolls to it, or scrolls to top on a hash-less navigation).

Netlify needs a rewrite so refreshing or deep-linking `/videos` doesn't 404 —
that's already set up in `netlify.toml` (`/* → /index.html`).

## Replacing images

Every image lives in `public/images/` and is labeled with its purpose in the
components that reference it. Keep the same filename and the site keeps
working — just overwrite the file (jpg/png/webp all work fine; if you use a
different extension, update the matching `src=` in the component that uses
it).

| File                                      | Used for                                       | Recommended size | Referenced in                                             |
| ----------------------------------------- | ---------------------------------------------- | ---------------- | --------------------------------------------------------- |
| `hero-bg.png`                             | Full-bleed hero background (Bhandari on stage) | 1600×1000+       | `src/index.css` (`.hero-bg`)                              |
| `about-photo.png`                         | About section portrait                         | 800×900          | `src/components/About.jsx`                                |
| `gallery-1.png` … `gallery-6.svg`         | Gallery grid (event photos)                    | 800×800 (square) | `src/components/Gallery.jsx`, `src/components/Videos.jsx` |
| `testimonial-1.svg` … `testimonial-3.svg` | Client avatars in testimonials                 | 200×200          | `src/components/Testimonials.jsx`                         |
| `favicon.svg`                             | Browser tab icon                               | any, square      | `index.html`                                              |

### A different hero photo for mobile

The hero photo is set in `src/index.css` under `.hero-bg`, not in JSX. There
are two rules: the base one (desktop) and a `@media (max-width: 640px)`
override (mobile). Right now mobile reuses `hero-bg.png` with a repositioned
crop (`background-position: 75% center`). To use a different photo on mobile,
add the file to `public/images/` and point the media-query rule's
`background-image` at it — no component changes needed.

## Videos

`src/data/videos.js`'s `VIDEOS` array is wired to real uploads from
[youtube.com/@bsbhandariofficial](https://www.youtube.com/@bsbhandariofficial)
— real video IDs, titles, durations and view counts for all 30 uploads at
time of writing. Thumbnails aren't stored; `videoThumb(id)` derives
`https://i.ytimg.com/vi/<id>/hqdefault.jpg` from the id, so there's nothing
to keep in sync there. To add/remove/update a video, edit this one array —
both the home page's preview grid (`Videos.jsx`, first 8 entries) and the
full library (`pages/AllVideos.jsx`, all of them) read from it. The
"Subscribe on YouTube" link and the YouTube icons in `Contact.jsx` /
`Footer.jsx` already point at the real channel.

The home page only ever shows the first 8 videos in `VIDEOS` (a 4×2 grid) —
reorder the array if you want a different set featured there. "View All
Videos" links to `/videos`, which lists everything.

## Reels section ("Video Testimonials")

`src/components/Reels.jsx` renders a horizontally-scrollable strip of 5–7
vertical (9:16) reel cards, styled like a shoppable-reel carousel: each card
has a position badge (`2/7`, top-left), and a bottom overlay bar with the
speaker's avatar, a caption + context line, and a play trigger. Pagination
dots below the strip track scroll position and are clickable; arrow buttons
scroll by one card on desktop (hidden below 900px in favor of native touch
swipe on mobile).

Clicking a card plays that Short **inline, in place** — no modal. It
autoplays muted on loop (`ReelPlayer` in the same file), with a mute/unmute
toggle in the top-right corner (initial state always muted, per browser
autoplay-with-sound restrictions anyway). Only one reel plays at a time —
starting another stops and destroys the previous player. This uses the
YouTube IFrame Player API (loaded once, lazily, via
`src/lib/youtubeIframeApi.js`) rather than a static embed URL, since muting
without restarting playback requires JS control, not just a URL param.
Regular long-form videos (the Videos section) still use the shared
`VideoModal` — only Shorts play inline.

Note: YouTube shows a small channel-name/logo watermark on Shorts embeds
that isn't suppressible via player parameters (a platform-level constraint
for Shorts specifically, not a bug here) — it sits alongside our own
badge/mute button/info bar rather than replacing them.

The `REELS` array at the top of the file is wired to real Shorts from
[youtube.com/@bsbhandariofficial/shorts](https://www.youtube.com/@bsbhandariofficial/shorts).
Each entry has an `id` (YouTube video ID), a `thumb`
(`https://i.ytimg.com/vi/<id>/oar2.jpg` — YouTube's vertical-crop thumbnail,
matching the 9:16 cards), a `title` (bold caption in the overlay bar) and a
`context` (the smaller line under it, e.g. "Business Tip"). The avatar is
set once via `SPEAKER_AVATAR` near the top of the file (defaults to the
About section photo) rather than per-reel, since every clip is the same
speaker. Add, remove or reorder entries freely — the badge count, dots and
scroll-snap layout all adapt automatically; 5–7 is a good range to keep the
strip feeling full without being a chore to swipe through.

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
  Email Address" checked (sending _as_ the visitor's address gets flagged as spam by most
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

- Email: `bsbhandari@bhandarizee.com` (in `Contact.jsx` and `Footer.jsx`)
- Phone: `+91 829096 2186` (in `Contact.jsx` and `Footer.jsx`)
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
