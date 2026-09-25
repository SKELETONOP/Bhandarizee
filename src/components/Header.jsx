import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "topics", label: "Topics" },
  { id: "videos", label: "Videos" },
  { id: "reels", label: "Reels" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  // Pages with a light background need the dark logo/nav until the header
  // picks up its dark scrolled background (or the dark mobile menu opens).
  const isLightPage = location.pathname === "/gallery";

  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 40);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

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

  const PAGE_LINKS = { videos: "/videos", gallery: "/gallery" };

  function sectionHref(id) {
    if (id === "home") return "/";
    if (PAGE_LINKS[id]) return PAGE_LINKS[id];
    return isHome ? `#${id}` : `/#${id}`;
  }

  // "/" is already the current URL when on the home page, so the router
  // won't re-run its scroll handling — scroll to the top ourselves.
  function scrollHomeToTop() {
    if (isHome && !location.hash) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <header
        className={`site-header${scrolled ? " scrolled" : ""}${
          isLightPage && !scrolled && !navOpen ? " on-light" : ""
        }`}
        id="siteHeader"
      >
        <div className="container header-inner">
          <Link to={sectionHref("home")} className="logo" onClick={scrollHomeToTop}>
            <span className="logo-main">
              BHANDARI<span className="accent">ZEE</span>
            </span>
            <span className="logo-sub">M O T I V A T I O N</span>
          </Link>

          <nav className={`main-nav${navOpen ? " open" : ""}`} id="mainNav">
            <ul>
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link
                    to={sectionHref(s.id)}
                    className={`nav-link${
                      isHome && activeId === s.id ? " active" : ""
                    }`}
                    onClick={() => {
                      setNavOpen(false);
                      if (s.id === "home") scrollHomeToTop();
                    }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link to={sectionHref("contact")} className="btn btn-primary header-cta">
            Book Now
          </Link>

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
