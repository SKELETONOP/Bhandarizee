# Bhandarizee Motivation — Website

A static, mobile-friendly frontend for B. S. Bhandari's motivational-speaker portfolio site.
Plain HTML/CSS/JS — no build step, no dependencies to install. Just open `index.html` in a
browser, or deploy the folder as-is to any static host.

## Structure

```
index.html        All page content and sections
css/style.css      All styling (responsive breakpoints at 1100px / 900px / 640px)
js/main.js         Nav, scroll reveal, counters, FAQ, gallery lightbox, video modal, contact form
js/three-bg.js      Three.js particle animation behind the hero section
images/            Placeholder images — replace with real photos (see below)
```

## Replacing images

Every placeholder lives in `images/` and is labeled with its purpose and recommended size.
Keep the same filename and the site keeps working — just overwrite the file (jpg/png/webp
all work fine, you don't have to keep them as `.svg`; if you use a different extension,
update the matching `src=` in `index.html`).

| File | Used for | Recommended size |
|---|---|---|
| `hero-bg.svg` | Full-bleed hero background (Bhandari on stage) | 1600×1000+ |
| `about-photo.svg` | About section portrait | 800×900 |
| `gallery-1.svg` … `gallery-6.svg` | Gallery grid (event photos) | 800×800 (square) |
| `testimonial-1.svg` … `testimonial-3.svg` | Client avatars in testimonials | 200×200 |
| `favicon.svg` | Browser tab icon | any, square |
| `og-image.svg` | Not linked yet — optional social-share image, 1200×630 |

The hero background is intentionally kept subtle (low opacity, dark overlay) so headline text
stays readable — once you drop in a real photo you may want to raise `.hero-bg { opacity }`
in `css/style.css` slightly.

## Adding real videos

In the **Videos** section of `index.html`, each `.video-card` has a
`data-youtube-id="YOUR_VIDEO_ID_..."` attribute — replace it with the real YouTube video ID
(the part after `watch?v=`). Also update the "Subscribe on YouTube" link's `href` near the
end of that section, and the social links in Contact/Footer.

## Contact form

The form in the **Contact** section is frontend-only: it validates input and shows a success
message, but doesn't send data anywhere yet (see the comment in `index.html` right after the
form, and `initContactForm()` in `js/main.js`). To make it functional, the easiest options are:

- **Formspree** (formspree.io) — set the form's `action` to your Formspree endpoint and let it
  submit normally (no JS changes needed beyond removing the `preventDefault` simulation).
- **EmailJS** (emailjs.com) — call their SDK inside the submit handler with the form values.
- Your own backend — `fetch()` the form data to your API from the submit handler.

## Editable details

Search `index.html` for these and update with the real details:
- Email: `hello@bhandarizee.com`
- Phone: `+91 00000 00000`
- WhatsApp number in the floating button's `href` (`wa.me/910000000000`)
- Social links (currently `href="#"` placeholders) in Contact and Footer

## Deploying

No build step required — upload the whole folder to any static host (Netlify, Vercel,
GitHub Pages, cPanel, etc.) and it works as-is.
