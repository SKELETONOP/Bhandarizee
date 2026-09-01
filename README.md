# Bhandarizee Motivation — Website

A static, mobile-friendly frontend for B. S. Bhandari's motivational-speaker portfolio site.
Plain HTML/CSS/JS — no build step, no dependencies to install. Just open `index.html` in a
browser, or deploy the folder as-is to any static host.

## Structure

```
index.html        All page content and sections
css/style.css      All styling (responsive breakpoints at 1100px / 900px / 640px / 380px)
js/main.js         Nav, scroll reveal, counters, FAQ, gallery lightbox, video modal, contact form
js/three-bg.js      Three.js particle animation behind the hero section
images/            Placeholder images — replace with real photos (see below)
```

## Replacing images

Every placeholder lives in `images/` and is labeled with its purpose and recommended size.
Keep the same filename and the site keeps working — just overwrite the file (jpg/png/webp
all work fine, you don't have to keep them as `.svg`; if you use a different extension,
update the matching `src=`/CSS path).

| File | Used for | Recommended size |
|---|---|---|
| `hero-bg.png` | Full-bleed hero background (Bhandari on stage) | 1600×1000+ |
| `about-photo.svg` | About section portrait | 800×900 |
| `gallery-1.svg` … `gallery-6.svg` | Gallery grid (event photos) | 800×800 (square) |
| `testimonial-1.svg` … `testimonial-3.svg` | Client avatars in testimonials | 200×200 |
| `favicon.svg` | Browser tab icon | any, square |
| `og-image.svg` | Not linked yet — optional social-share image, 1200×630 |

### A different hero photo for mobile

The hero photo is set in `css/style.css` under `.hero-bg`, not in the HTML. There are two
rules: the base one (desktop) and a `@media (max-width: 640px)` override (mobile). Right now
mobile reuses `hero-bg.png` with a repositioned crop (`background-position: 75% center`)
because the desktop photo's subject sits off to the right, and a narrow "cover" crop was
centering on the crowd instead.

To use a **different photo on mobile** (e.g. a tighter vertical crop of the same shot, or a
different photo entirely):

1. Add the new file to `images/`, e.g. `hero-bg-mobile.png`.
2. In `css/style.css`, find the `@media (max-width: 640px) { .hero-bg { ... } }` block and
   change `background-image: url("../images/hero-bg.png")` to point at the new file.

No HTML changes needed either way.

## Adding real videos

In the **Videos** section of `index.html`, each `.video-card` has a
`data-youtube-id="YOUR_VIDEO_ID_..."` attribute — replace it with the real YouTube video ID
(the part after `watch?v=`). Also update the "Subscribe on YouTube" link's `href` near the
end of that section, and the social links in Contact/Footer.

## Contact form

The form has a slider at the top so a visitor picks what they're sending: a **Corporate /
Training Enquiry** (shows extra fields — company, event date, event type) or general
**Support / Feedback** (just name, email, phone, message). Both routes land in your inbox,
just tagged and templated differently so you can tell them apart at a glance.

It sends through **EmailJS** — a service that relays the message from the visitor's browser
straight to a real inbox, with no backend server or code of your own to run.

**This is already set up and working** — `EMAILJS_CONFIG` in `js/main.js` has the real
Service ID, both Template IDs, and Public Key filled in, and both message types have been
verified end-to-end. The two email templates (branded to match the site) live directly in the
EmailJS dashboard under Email Templates.

If you ever need to recreate a template from scratch, or add a third one, here's the shape:

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

**To point submissions at a different inbox**, change "To Email" on each template in the
EmailJS dashboard — no code change needed. The two templates can each go to a different address
if useful (e.g. enquiries to a sales inbox, support to a different one).

That's the whole setup — no server, no API keys exposed beyond the public key (which is
designed to be used client-side). Never put an EmailJS **private key** into this codebase —
it's a secret for optional server-side "strict mode" validation and doesn't belong in
publicly-servable frontend code.

**Alternative:** if you'd rather not use EmailJS, [Formspree](https://formspree.io) works too
(set the form's `action` to your Formspree endpoint and let it submit normally instead of the
EmailJS call in `initContactForm()`), though its free tier only supports one destination/form,
so the two-template routing above would need two separate Formspree forms.

## Editable details

Search `index.html` for these and update with the real details:
- Email: `hello@bhandarizee.com`
- Phone: `+91 00000 00000`
- Social links (currently `href="#"` placeholders) in Contact and Footer

## Deploying

No build step required — upload the whole folder to any static host (Netlify, Vercel,
GitHub Pages, cPanel, etc.) and it works as-is.
