import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const sectionHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link to={sectionHref("home")} className="logo">
            <span className="logo-main">
              BHANDARI<span className="accent">ZEE</span>
            </span>
            <span className="logo-sub">M O T I V A T I O N</span>
          </Link>
          <p>
            Helping people believe, achieve and transform — one stage at a time.
          </p>
          <div className="contact-social">
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M14 9h3V6h-3c-2 0-3.5 1.6-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.6c0-.4.3-.6.5-.6Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="#" aria-label="Twitter / X" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="m3 3 7.3 9.6L3.4 21H6l5.8-6.7L16.4 21H21l-7.7-10.1L20.3 3H17.7l-5.3 6.1L8.1 3H3Zm3.4 1.6h2l9.2 12.8h-2L6.4 4.6Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M4.5 3.7a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3 9h3v12H3V9Zm6 0h2.9v1.6h.04c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2 3.8 4.6V21h-3v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9V9Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@bsbhandariofficial"
              aria-label="YouTube"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <rect x="2.5" y="6" width="19" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to={sectionHref("home")}>Home</Link>
          <Link to={sectionHref("about")}>About</Link>
          <Link to={sectionHref("topics")}>Topics</Link>
          <Link to={sectionHref("videos")}>Videos</Link>
          <Link to="/videos">All Videos</Link>
          <Link to={sectionHref("reels")}>Reels</Link>
          <Link to={sectionHref("gallery")}>Gallery</Link>
        </div>

        <div className="footer-links">
          <h4>More</h4>
          <Link to={sectionHref("testimonials")}>Testimonials</Link>
          <Link to={sectionHref("faq")}>FAQ</Link>
          <Link to={sectionHref("contact")}>Contact</Link>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p>
            <a href="mailto:hello@bhandarizee.com">hello@bhandarizee.com</a>
          </p>
          <p>
            <a href="tel:+910000000000">+91 00000 00000</a>
          </p>
          <Link to={sectionHref("contact")} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            &copy; <span id="year">{new Date().getFullYear()}</span>{" "}
            Bhandarizee Motivation. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
