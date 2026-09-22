import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#topics", label: "Topics" },
  { href: "#videos", label: "Videos" },
  { href: "#reels", label: "Reels" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 40);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
  }, [navOpen]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setNavOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={`site-header${scrolled ? " scrolled" : ""}`}
        id="siteHeader"
      >
        <div className="container header-inner">
          <a href="#home" className="logo">
            <span className="logo-main">
              BHANDARI<span className="accent">ZEE</span>
            </span>
            <span className="logo-sub">M O T I V A T I O N</span>
          </a>

          <nav className={`main-nav${navOpen ? " open" : ""}`} id="mainNav">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link${
                      activeHref === link.href ? " active" : ""
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className="btn btn-primary header-cta">
            Book Now
          </a>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle navigation menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div
        className={`nav-backdrop${navOpen ? " show" : ""}`}
        id="navBackdrop"
        onClick={() => setNavOpen(false)}
      ></div>
    </>
  );
}
